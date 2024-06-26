from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
    
class adUsuarios(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50, null=False)
    email = models.EmailField(error_messages='Ingrese nuevamente', null=False)
    contraseña = models.CharField(max_length=20, null=False)    

class adTienda(models.Model):
    nombreCamiseta = models.CharField(max_length=100, null=False)  
    imagen = models.ImageField()
    precio = models.IntegerField()
    cantidad = models.IntegerField()
    tallas = models.CharField(max_length=2)

class adVentas(models.Model):
    ventas = models.IntegerField()
    mes = models.CharField(max_length=20)   
class Camiseta(models.Model):
    id = models.IntegerField(primary_key=True, null=False)
    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='adTienda')
    precio = models.DecimalField(max_digits=8, decimal_places=0)
    tallas = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre        
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    edad = models.IntegerField()
    ubicacion = models.CharField(max_length=100)

    # Puedes añadir más campos según tus necesidades

    def __str__(self):
        return self.user.username 
    
class Carrito(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

class CarritoItem(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    producto = models.ForeignKey(Camiseta, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

class OrdenCompra(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    region = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    direccion = models.TextField()
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Orden de compra {self.id} de {self.usuario.username}"

class DetalleOrdenCompra(models.Model):
    orden_compra = models.ForeignKey(OrdenCompra, related_name='detalles', on_delete=models.CASCADE)
    producto = models.ForeignKey(Camiseta, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Detalle de compra para {self.orden_compra.id}: Producto {self.producto.nombre}"