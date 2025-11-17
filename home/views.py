from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import logout
from allauth.account.views import LoginView, SignupView
from allauth.account.forms import LoginForm
from .forms import CustomSignupForm

# Create your views here.
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
        # Add any additional context if needed
        return context

@login_required
def dashboard(request):
    return render(request, 'dashboard/dashboard.html')

def logout_view(request):
    logout(request)
    return redirect('home')