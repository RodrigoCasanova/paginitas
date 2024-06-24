from django.http import HttpResponse
from django.shortcuts import render
from .models import CarritoItem
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import CrearCuentaForm
# Create your views here.
def inicio(request):
    return render(request, "aplicacion/inicio.html")
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
def crearcuenta(request):
    form=CrearCuentaForm()
    datos={
        "form":form
    }
    if request.method=="POST":
        form=CrearCuentaForm(data=request.POST)
        usr=request.POST["username"]
        existe=User.objects.filter(username=usr).exists()
        if existe:
            alerta="El usuario ya existe"
            datos={
                "form":form,
                "alerta":alerta
            }
        else:
            if form.is_valid():
                form.save()
                return redirect(to="login")
            datos={
                "form":form
            }
    return render(request, "registration/crearcuenta.html", datos)

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



    