from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Camiseta

class CrearCuentaForm(UserCreationForm):
    pass



class CamisetaForm(forms.ModelForm):
    class Meta:
        model = Camiseta
        fields = ['nombre', 'imagen', 'precio', 'tallas']
