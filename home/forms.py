from allauth.account.forms import SignupForm
from django import forms

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

