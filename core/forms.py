from allauth.account.forms import SignupForm
from django import forms

from .models import Room, RoomMembership


class CustomSignupForm(SignupForm):
    first_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'John',
            'autocomplete': 'given-name'
        }),
        label='First Name'
    )
    last_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Doe',
            'autocomplete': 'family-name'
        }),
        label='Last Name'
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Set field order to match template
        self.field_order = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']

    def save(self, request):
        user = super(CustomSignupForm, self).save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.save()
        return user


class RoomCreateForm(forms.Form):
    name = forms.CharField(
        max_length=80,
        widget=forms.TextInput(attrs={'placeholder': 'Team Sync Room'}),
        label='Room Name'
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Set a secure password'}),
        label='Room Password'
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Repeat the password'}),
        label='Confirm Password'
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            existing_class = field.widget.attrs.get('class', '')
            field.widget.attrs['class'] = f'{existing_class} form-input'.strip()

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm = cleaned_data.get('confirm_password')

        if password and confirm and password != confirm:
            self.add_error('confirm_password', 'Passwords do not match.')
        return cleaned_data

    def save(self, owner):
        room = Room(owner=owner, name=self.cleaned_data['name'])
        room.set_password(self.cleaned_data['password'])
        room.save()
        RoomMembership.objects.create(room=room, user=owner)
        return room


class RoomJoinForm(forms.Form):
    room_code = forms.CharField(
        max_length=8,
        widget=forms.TextInput(attrs={'placeholder': 'Enter room ID (e.g. ABCD1234)'}),
        label='Room ID'
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Room password'}),
        label='Room Password'
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room = None
        for field in self.fields.values():
            existing_class = field.widget.attrs.get('class', '')
            field.widget.attrs['class'] = f'{existing_class} form-input'.strip()

    def clean_room_code(self):
        code = self.cleaned_data['room_code'].upper()
        return code

    def clean(self):
        cleaned_data = super().clean()
        code = cleaned_data.get('room_code')
        password = cleaned_data.get('password')

        if code and password:
            try:
                room = Room.objects.get(code=code)
            except Room.DoesNotExist:
                self.add_error('room_code', 'No room found with this ID.')
                return cleaned_data

            if not room.check_password(password):
                self.add_error('password', 'Incorrect room password.')
            else:
                self.room = room
        return cleaned_data

    def add_user(self, user):
        RoomMembership.objects.get_or_create(room=self.room, user=user)
        return self.room