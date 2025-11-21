from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout
from django.db.models import Count
from allauth.account.views import LoginView, SignupView
from allauth.account.forms import LoginForm

from .forms import CustomSignupForm, RoomCreateForm, RoomJoinForm
from .models import Room


def home(request):
    return render(request, 'home/home.html')


class CustomLoginView(LoginView):
    template_name = 'auth/login.html'
    form_class = LoginForm

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        # Add CSS classes to form fields
        if 'login' in form.fields:
            form.fields['login'].widget.attrs.update({
                'class': 'form-input',
                'placeholder': 'Enter your username or email',
                'autocomplete': 'username'
            })
        if 'password' in form.fields:
            form.fields['password'].widget.attrs.update({
                'class': 'form-input',
                'placeholder': 'Enter your password',
                'autocomplete': 'current-password'
            })
        if 'remember' in form.fields:
            form.fields['remember'].widget.attrs.update({
                'class': 'form-checkbox'
            })
        return form

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add flag to check if remember field exists
        form = context.get('form')
        context['has_remember_field'] = form and 'remember' in form.fields
        return context


class CustomSignupView(SignupView):
    template_name = 'auth/register.html'
    form_class = CustomSignupForm

    def get_form(self, form_class=None):
        form = super().get_form(form_class)
        # Add CSS classes to form fields
        if 'username' in form.fields:
            form.fields['username'].widget.attrs.update({
                'class': 'form-input',
                'placeholder': 'johndoe',
                'autocomplete': 'username'
            })
        if 'email' in form.fields:
            form.fields['email'].widget.attrs.update({
                'class': 'form-input',
                'placeholder': 'john@example.com',
                'autocomplete': 'email'
            })
        if 'password1' in form.fields:
            form.fields['password1'].widget.attrs.update({
                'class': 'form-input',
                'placeholder': 'Enter a strong password',
                'autocomplete': 'new-password'
            })
        if 'password2' in form.fields:
            form.fields['password2'].widget.attrs.update({
                'class': 'form-input',
                'placeholder': 'Re-enter your password',
                'autocomplete': 'new-password'
            })
        return form

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


@login_required
def dashboard(request):
    rooms = (
        Room.objects.filter(participants=request.user)
        .annotate(participant_total=Count('participants', distinct=True))
        .prefetch_related('participants')
    )
    create_form = RoomCreateForm(prefix='create')
    join_form = RoomJoinForm(prefix='join')

    if request.method == 'POST':
        if 'create-submit' in request.POST:
            create_form = RoomCreateForm(request.POST, prefix='create')
            if create_form.is_valid():
                room = create_form.save(request.user)
                messages.success(
                    request,
                    f'Room "{room.name}" created! Share ID {room.code} and the password you set.'
                )
                return redirect('room_detail', room_code=room.code)
        elif 'join-submit' in request.POST:
            join_form = RoomJoinForm(request.POST, prefix='join')
            if join_form.is_valid():
                room = join_form.add_user(request.user)
                messages.success(request, f'Joined room "{room.name}".')
                return redirect('room_detail', room_code=room.code)

    for room in rooms:
        room.absolute_url = request.build_absolute_uri(room.get_absolute_url())

    context = {
        'rooms': rooms,
        'create_form': create_form,
        'join_form': join_form,
    }
    return render(request, 'dashboard/rooms.html', context)


@login_required
def room_detail(request, room_code):
    room = get_object_or_404(Room.objects.prefetch_related('participants'), code=room_code.upper())
    if not room.participants.filter(id=request.user.id).exists():
        messages.error(request, 'You need to join the room before chatting.')
        return redirect('dashboard')
    room_messages = room.messages.select_related('sender')
    context = {
        'room': room,
        'room_messages': room_messages,
        'participants': room.participants.all(),
        'room_url': request.build_absolute_uri(room.get_absolute_url()),
    }
    return render(request, 'dashboard/dashboard.html', context)


def logout_view(request):
    logout(request)
    return redirect('home')