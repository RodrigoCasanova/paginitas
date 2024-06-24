from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from .forms import CrearCuentaForm, CamisetaForm
from .models import Camiseta

# Create your views here.
def inicio(request):
    return render(request, "aplicacion/inicio.html")
def admin(request):
    return render(request, "aplicacion/admin.html")
def adPedidos(request):
    return render(request, "aplicacion/adPedidos.html")
def adTienda(request):
    camisetas = Camiseta.objects.all()
    return render(request, "aplicacion/adTienda.html", {'camisetas': camisetas})
def adUsuarios(request):
    return render(request, "aplicacion/adUsuarios.html")
def adVentas(request):
    return render(request, "aplicacion/adVentas.html")
def detalleCompra(request):
    return render(request, "aplicacion/detalleCompra.html")
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
def TiendaOnline(request):
    camisetas = Camiseta.objects.all()
    return render(request, "aplicacion/TiendaOnline.html", {'camisetas': camisetas})

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
def agregarcamiseta(request):
    if request.method == 'POST':    
        form = CamisetaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # Redirige a la página adTienda.html después de agregar la camiseta
            return redirect('adTienda')
    else:
        form = CamisetaForm()
    
    return render(request, "aplicacion/agregarcamiseta.html", {'form': form})   
def eliminarcamiseta(request, id):
    camiseta = get_object_or_404(Camiseta, id=id)

    if request.method == 'POST':
        # Si se confirma la eliminación, se elimina la camiseta
        camiseta.delete()
        return redirect('adTienda')  # Redirige a la página principal de administración

    return render(request, 'aplicacion/eliminarcamiseta.html', {'camiseta': camiseta}) 
def editarcamiseta(request, id):
    camiseta = get_object_or_404(Camiseta, id=id)
    
    if request.method == 'POST':
        form = CamisetaForm(request.POST, request.FILES, instance=camiseta)
        if form.is_valid():
            form.save()
            return redirect('adTienda')  # Redirige a la página principal de administración
    else:
        form = CamisetaForm(instance=camiseta)
    
    return render(request, 'aplicacion/editarcamiseta.html', {'form': form, 'camiseta': camiseta})
