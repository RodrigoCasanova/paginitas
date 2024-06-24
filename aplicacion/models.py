from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class TiendaOnline(models.Model):
    precio = models.IntegerField()
    cantidad = models.IntegerField()


class perfilusuario(models.Model):
    edad = models.IntegerField()
    ubicacion = models.CharField(max_length=50)

class detalleCompra(models.Model):
    cod_pedido = models.IntegerField()
    
class Envio(models.Model):
    nombre = models.CharField(max_length=50, null=False)  
    email = models.EmailField(error_messages='Ingrese nuevamente', null=False)
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
class Camiseta(models.Model):
    id = models.IntegerField(primary_key=True, null=False)
    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='adTienda')
    precio = models.DecimalField(max_digits=8, decimal_places=0)
    tallas = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre        
 

           

