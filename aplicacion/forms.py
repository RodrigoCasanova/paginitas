# En aplicacion/forms.py

from django import forms
from .models import Camiseta

class CamisetaForm(forms.ModelForm):
    class Meta:
        model = Camiseta
        fields = ['nombre', 'imagen', 'precio', 'tallas']
