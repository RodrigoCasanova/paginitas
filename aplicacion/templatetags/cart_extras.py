# Ejemplo de definición de total_carrito en cart_extras.py
from django import template

register = template.Library()

@register.filter
def total_carrito(carrito):
    total = sum(item.subtotal for item in carrito)
    return total
