from django.shortcuts import render, redirect, get_object_or_404
from .models import Camiseta
from .forms import CamisetaForm

# Create your views here.
def inicio(request):
    return render(request, "aplicacion/inicio.html")
def iniciosesion(request):
    return render(request, "aplicacion/inicioSesion.html")
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
def Registro(request):
    return render(request, "aplicacion/Registro.html")
def TiendaOnline(request):
    camisetas = Camiseta.objects.all()
    return render(request, "aplicacion/TiendaOnline.html", {'camisetas': camisetas})
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
