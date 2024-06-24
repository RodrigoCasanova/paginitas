from .views import inicio,admin,adPedidos,adTienda,adUsuarios,adVentas,detalleCompra,Envio,factura,mispedidos,pago,perfilusuario,TiendaOnline, crearcuenta, agregarcamiseta, editarcamiseta, eliminarcamiseta
from django.urls import include, path

urlpatterns = [
    path('',inicio,name='inicio'),
    path('admin1/',admin,name='admin'),
    path('adPedidos/',adPedidos,name='adPedidos'),
    path('adTienda/',adTienda,name='adTienda'),
    path('adUsuarios/',adUsuarios,name='adUsuarios'),
    path('adVentas/',adVentas,name='adVentas'),
    path('detalleCompra/',detalleCompra,name='detalleCompra'),
    path('Envio/',Envio,name='Envio'),
    path('factura/',factura,name='factura'),
    path('mispedidos/',mispedidos,name='mispedidos'),
    path('pago/',pago,name='pago'),
    path('perfilusuario/',perfilusuario,name='perfilusuario'),
    path('TiendaOnline/',TiendaOnline,name='TiendaOnline'),
    path('crearcuenta/', crearcuenta, name= 'crearcuenta'),
    path('agregarcamiseta/',agregarcamiseta,name='agregarcamiseta'),
    path('editarcamiseta/<int:id>/', editarcamiseta, name='editarcamiseta'),
    path('eliminarcamiseta/<int:id>/', eliminarcamiseta, name='eliminarcamiseta'),
]
