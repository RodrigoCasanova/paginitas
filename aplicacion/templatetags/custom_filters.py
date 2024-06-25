# custom_filters.py

from django import template

register = template.Library()

@register.filter(name='multiply')
def multiply(value, arg):
    """
    Custom filter to multiply two numbers.
    Usage: {{ value|multiply:arg }}
    """
    try:
        return float(value) * float(arg)
    except (ValueError, TypeError):
        return 0  # or handle errors as needed

@register.filter
def total_precio(carrito_items):
    """
    Custom filter to calculate the total price of items in the cart.
    """
    return sum(item.producto.precio * item.cantidad for item in carrito_items)
