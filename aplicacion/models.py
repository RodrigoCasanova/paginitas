from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class TiendaOnline(models.Model):
    cantidad = models.IntegerField()


class perfilusuario(models.Model):
    edad = models.IntegerField()
    ubicacion = models.CharField(max_length=50)

class detalleCompra(models.Model):
    cod_pedido = models.IntegerField()
    
class Envio(models.Model):
    telefono = models.IntegerField()
    
class admin1(models.Model):
    usuario = models.CharField(max_length=50, null=False)
    fecha = models.DateField(auto_now=True, auto_now_add=False)

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

class adPedidos(models.Model):
    estado = models.CharField(max_length=20, null=False)    

class adVentas(models.Model):
    ventas = models.IntegerField()
    mes = models.CharField(max_length=20)   
 # models.


class Item(models.Model):
    titulo = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.titulo

class Carrito(models.Model):
    # No necesitamos definir una relación ManyToManyField aquí
    pass

class CarritoItem(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()


           

