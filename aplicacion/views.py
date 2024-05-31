from django.shortcuts import render

# Create your views here.
def inicio(request):
    return render(request, "aplicacion/inicio.html")
def InicioSesion(request):
    return render(request, "aplicacion/inicioSesion.html")
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
    return render(request, "aplicacion/TiendaOnline.html")
