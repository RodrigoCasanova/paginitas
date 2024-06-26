from django.contrib import admin
from .models import Carrito, CarritoItem, DetalleOrdenCompra, OrdenCompra, Camiseta
# Register your models here.

admin.site.register(Camiseta)
admin.site.register(Carrito)
admin.site.register(CarritoItem)
admin.site.register(OrdenCompra)
admin.site.register(DetalleOrdenCompra)




