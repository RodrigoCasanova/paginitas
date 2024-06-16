from django.db import IntegrityError
from django.http import HttpResponse
from django.shortcuts import render
from .models import CarritoItem, Usuario
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
# Create your views here.
def inicio(request):
    return render(request, "aplicacion/inicio.html")
def iniciosesion(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('pswd')
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            # Redireccionar al usuario a alguna página de éxito
            return redirect('TiendaOnline')
        else:
            messages.error(request, 'Correo o clave incorrecto. Intente nuevamente.')

    return render(request, 'aplicacion/inicioSesion.html')
def admin(request):
    return render(request, "aplicacion/admin.html")
def adPedidos(request):
    return render(request, "aplicacion/adPedidos.html")
def adTienda(request):
    return render(request, "aplicacion/adTienda.html")
def adUsuarios(request):
    return render(request, "aplicacion/adUsuarios.html")
def adVentas(request):
    return render(request, "aplicacion/adVentas.html")

def Envio(request):
    return render(request, "aplicacion/Envio.html")
def factura(request):
    return render(request, "aplicacion/factura.html")
def mispedidos(request):
    return render(request, "aplicacion/mispedidos.html")
def pago(request):
    return render(request, "aplicacion/pago.html")
def perfilusuario(request):
    return render(request, "aplicacion/perfilusuario.html")
def Registro(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        apellido = request.POST.get('apellido')
        email = request.POST.get('email')
        contrasena = request.POST.get('contrasena')
        
        # Cifrar la contraseña antes de guardarla
        contrasena_cifrada = make_password(contrasena)
        
        # Verificar si el correo electrónico ya está registrado
        if Usuario.objects.filter(email=email).exists():
            return render(request, 'aplicacion/registro.html', {
                'error': 'El correo electrónico ya está registrado.'
            })
        
        try:
            # Crear un nuevo usuario
            usuario = Usuario(nombre=nombre, apellido=apellido, email=email)
            usuario.set_password(contrasena)  # Ciframos la contraseña
            usuario.save()
        except IntegrityError:
            return render(request, 'aplicacion/registro.html', {
                'error': 'Ha ocurrido un error al registrar el usuario.'
            })
        
        return redirect('inicioSesion')  # Redirigir al usuario a la página de inicio de sesión

    return render(request, 'aplicacion/registro.html')
from django.contrib.auth.decorators import login_required

@login_required
def TiendaOnline(request):
    return render(request, "aplicacion/TiendaOnline.html")


from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError


from django.http import HttpResponse
from django.shortcuts import render
from django.core.exceptions import ValidationError
from decimal import Decimal
import json


from django.shortcuts import render


def detalleCompra(request):
    try:
        # Obtener todos los elementos del carrito
        elementos_carrito = CarritoItem.objects.all()

        # Pasar los elementos del carrito al contexto
        context = {
            'elementos_carrito': elementos_carrito,
        }

        return render(request, 'aplicacion/detalleCompra.html', context)
    except Exception as e:
        print("Error en la vista detalleCompra:", e)
        return HttpResponse("Ocurrió un error al procesar tu solicitud", status=500)



    