from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from .forms import CrearCuentaForm, CamisetaForm
from .models import Camiseta, UserProfile
from django.contrib.auth.decorators import login_required
from django.contrib import messages
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
    usuarios = User.objects.all()
    return render(request, "aplicacion/adUsuarios.html", {"usuarios": usuarios})

def agregar_usuario(request):
    if request.method == "POST":
        username = request.POST.get("nombre")
        email = request.POST.get("email")
        password = request.POST.get("contrasena")
        
        # Crear un nuevo usuario en la base de datos
        User.objects.create_user(username=username, email=email, password=password)
        
        # Redirigir al panel de administración de usuarios
        return redirect("adUsuarios")
    
    return render(request, "aplicacion/agregar_usuario.html")

def editar_usuario(request, user_id):
    usuario = get_object_or_404(User, id=user_id)
    if request.method == "POST":
        usuario.username = request.POST.get("nombre")
        usuario.email = request.POST.get("email")
        usuario.save()
        return redirect("adUsuarios")
    return render(request, "aplicacion/editar_usuario.html", {"usuario": usuario})

def eliminar_usuario(request, user_id):
    usuario = get_object_or_404(User, id=user_id)
    usuario.delete()
    return redirect("adUsuarios")
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
@login_required
def perfilusuario(request):
    user = request.user
    try:
        perfil = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        perfil = UserProfile(user=user)

    if request.method == 'POST':
        # Obtener los datos del formulario
        nombre = request.POST.get('nombre')
        edad = request.POST.get('edad')
        ubicacion = request.POST.get('ubicacion')
        email = request.POST.get('email')
        contraseña_nueva = request.POST.get('contraseña-nueva')

        # Actualizar los atributos del usuario y del perfil
        user.username = nombre  # Actualizar el nombre de usuario

        perfil.edad = edad
        perfil.ubicacion = ubicacion

        # Si el email es diferente al actual y no está en uso por otro usuario
        if email != user.email and not User.objects.filter(email=email).exists():
            user.email = email

        # Cambiar la contraseña si se proporcionó una nueva
        if contraseña_nueva:
            user.set_password(contraseña_nueva)

        user.save()
        perfil.save()
        messages.success(request, 'Perfil actualizado correctamente.')

        return redirect('perfilusuario')

    return render(request, 'aplicacion/perfilusuario.html', {'user': user, 'perfil': perfil})
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
