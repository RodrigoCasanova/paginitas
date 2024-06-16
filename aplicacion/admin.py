from django.contrib import admin
from .models import Carrito, CarritoItem, Item, Usuario,TiendaOnline,perfilusuario,detalleCompra,Envio,admin1,adUsuarios,adTienda,adPedidos,adVentas
# Register your models here.
admin.site.register(Usuario)
admin.site.register(TiendaOnline)
admin.site.register(perfilusuario)
admin.site.register(detalleCompra)
admin.site.register(Envio)
admin.site.register(admin1)
admin.site.register(adUsuarios)
admin.site.register(adTienda)
admin.site.register(adPedidos)
admin.site.register(adVentas)
admin.site.register(Item)
admin.site.register(Carrito)
admin.site.register(CarritoItem)



