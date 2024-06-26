from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from .forms import CrearCuentaForm, CamisetaForm
from .models import Camiseta, UserProfile, Carrito, CarritoItem, OrdenCompra, DetalleOrdenCompra
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_POST
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login

# Create your views here.
def inicio(request):
    return render(request, "aplicacion/inicio.html")
def admin1(request):
    return render(request, "aplicacion/admin.html")
def adPedidos(request):
    pedidos = OrdenCompra.objects.all()
    return render(request, 'aplicacion/adPedidos.html', {'pedidos': pedidos})
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
@login_required
def Envio(request):
    carrito = Carrito.objects.get(usuario=request.user)
    carrito_items = CarritoItem.objects.filter(carrito=carrito)
    
    total_price = 0
    for item in carrito_items:
        total_price += item.producto.precio * item.cantidad
    
    context = {
        'carrito_items': carrito_items,
        'total_price': total_price,
    }
    
    return render(request, 'aplicacion/Envio.html', context)
@login_required
def ver_factura(request, pedido_id):
    pedido = get_object_or_404(OrdenCompra, id=pedido_id, usuario=request.user)
    
    # Calcular el total de la orden sumando los subtotales de cada detalle
    total = sum(detalle.cantidad * detalle.precio_unitario for detalle in pedido.detalles.all())
    
    return render(request, 'aplicacion/ver_factura.html', {'pedido': pedido, 'total': total})
def mispedidos(request):
    pedidos = OrdenCompra.objects.filter(usuario=request.user).prefetch_related('detalles')
    return render(request, "aplicacion/mispedidos.html", {'pedidos': pedidos})
def pago(request):
    return render(request, "aplicacion/pago.html")
@login_required
@csrf_exempt
def crear_orden_compra(request):
    if request.method == 'POST':
        try:
            # Obtener el carrito del usuario actual
            carrito = Carrito.objects.get(usuario=request.user)
            # Obtener los items del carrito
            carrito_items = CarritoItem.objects.filter(carrito=carrito)

            # Validar los campos del formulario
            nombre = request.POST.get('nombre')
            email = request.POST.get('email')
            telefono = request.POST.get('telefono')
            region = request.POST.get('region')
            ciudad = request.POST.get('ciudad')
            direccion = request.POST.get('direccion')

            # Imprimir los valores recibidos para depuración
            print(f"Valores recibidos - Nombre: {nombre}, Email: {email}, Teléfono: {telefono}, Región: {region}, Ciudad: {ciudad}, Dirección: {direccion}")

            # Verificar que todos los campos necesarios no sean None
            if not all([nombre, email, telefono, region, ciudad, direccion]):
                return JsonResponse({'error': 'Todos los campos son obligatorios.'}, status=400)

            # Crear la orden de compra
            orden = OrdenCompra.objects.create(
                usuario=request.user,
                nombre=nombre,
                email=email,
                telefono=telefono,
                region=region,
                ciudad=ciudad,
                direccion=direccion,
            )
            # Crear los detalles de la orden de compra basados en los elementos del carrito
            for item in carrito_items:
                DetalleOrdenCompra.objects.create(
                    orden_compra=orden,
                    producto=item.producto,
                    cantidad=item.cantidad,
                    precio_unitario=item.producto.precio  # Asegúrate de obtener el precio del producto correctamente
                )
            
            # Limpiar el carrito después de crear la orden de compra
            carrito_items.delete()

            # Respuesta JSON indicando que la orden de compra se creó correctamente
            return redirect('pago')


        except Carrito.DoesNotExist:
            return JsonResponse({'error': 'No se encontró el carrito para este usuario.'}, status=404)

        except Exception as e:
            print(f"Error: {e}")  # Imprimir el error para depuración
            return JsonResponse({'error': str(e)}, status=500)
        

    return JsonResponse({'error': 'Método no permitido.'}, status=405)
def pago1(request):
    return render(request, "aplicacion/pago1.html")
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
    camiseta = Camiseta.objects.all()
    context = {'productos': camiseta}
    return render(request, 'aplicacion/TiendaOnline.html', context)
@login_required
def agregar_al_carrito(request, camiseta_id):
    if request.method == 'POST':
        camiseta = get_object_or_404(Camiseta, id=camiseta_id)
        carrito, created = Carrito.objects.get_or_create(usuario=request.user)
        carrito_item, created = CarritoItem.objects.get_or_create(carrito=carrito, producto=camiseta)

        if not created:
            carrito_item.cantidad += 1
        else:
            carrito_item.cantidad = 1

        carrito_item.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)

@login_required
def detalleCompra(request):
    carrito, created = Carrito.objects.get_or_create(usuario=request.user)
    carrito_items = CarritoItem.objects.filter(carrito=carrito)
    context = {'carrito_items': carrito_items}
    return render(request, "aplicacion/detalleCompra.html", context)
@require_POST
def eliminar_del_carrito(request, item_id):
    item = get_object_or_404(CarritoItem, id=item_id)
    item.delete()
    return JsonResponse({'status': 'success'})

@require_POST
def actualizar_cantidad(request, item_id):
    item = get_object_or_404(CarritoItem, id=item_id)
    data = json.loads(request.body)
    nueva_cantidad = data.get('cantidad')
    if nueva_cantidad is not None:
        item.cantidad = nueva_cantidad
        item.save()
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Cantidad no proporcionada'}, status=400)
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
def admin_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_superuser:
            login(request, user)
            return redirect('admin1')  # Asegúrate de tener esta URL definida correctamente en urls.py
        else:
            messages.error(request, 'Credenciales inválidas para administrador.')
    
    return render(request, 'aplicacion/admin_login.html')

def admin(request):
    # Lógica para la página admin1
    return render(request, 'admin.html')


def eliminar_pedido(request, pedido_id):
    try:
        pedido = OrdenCompra.objects.get(id=pedido_id)
        pedido.delete()
        return HttpResponse(status=204)
    except OrdenCompra.DoesNotExist:
        return HttpResponse(status=404)

def obtener_pedido(request, pedido_id):
    try:
        pedido = OrdenCompra.objects.get(id=pedido_id)
        detalles = ", ".join([detalle.producto.nombre for detalle in pedido.detalles.all()])
        data = {
            'id': pedido.id,
            'usuario': pedido.usuario.username,
            'productos': detalles,
            'direccion': pedido.direccion,
            'estado': 'en_camino'  # Cambia esto según tu lógica de estados
        }
        return JsonResponse(data)
    except OrdenCompra.DoesNotExist:
        return HttpResponse(status=404)

def editar_pedido(request, pedido_id):
    if request.method == 'POST' and request.is_ajax():
        pedido = get_object_or_404(OrdenCompra, pk=pedido_id)
        nuevo_estado = request.POST.get('estado', None)
        if nuevo_estado:
            pedido.estado = nuevo_estado
            pedido.save()
            return JsonResponse({'message': 'Pedido actualizado correctamente.'})
        else:
            return JsonResponse({'error': 'El campo de estado no puede estar vacío.'}, status=400)
    else:
        return JsonResponse({'error': 'No se permite esta solicitud.'}, status=403)
