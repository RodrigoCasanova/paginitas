from django.contrib import admin
from .models import TiendaOnline,perfilusuario,detalleCompra,Envio,admin1,adUsuarios,adTienda,adPedidos,adVentas, Camiseta, CarritoItem
# Register your models here.
admin.site.register(TiendaOnline)
admin.site.register(perfilusuario)
admin.site.register(detalleCompra)
admin.site.register(Envio)
admin.site.register(admin1)
admin.site.register(adUsuarios)
admin.site.register(adTienda)
admin.site.register(adPedidos)
admin.site.register(adVentas)
admin.site.register(Camiseta)
admin.site.register(CarritoItem)

