from .views import agregar_al_carrito, agregar_usuario, editar_usuario, eliminar_del_carrito, eliminar_usuario, inicio,admin1,adPedidos,adTienda,adUsuarios,adVentas,detalleCompra,Envio,factura,mispedidos,pago,perfilusuario,TiendaOnline, crearcuenta, agregarcamiseta, editarcamiseta, eliminarcamiseta,actualizar_cantidad
from .views import agregar_al_carrito, agregar_usuario, crear_orden_compra, editar_usuario, eliminar_del_carrito, eliminar_usuario, inicio,admin,adPedidos,adTienda,adUsuarios,adVentas,detalleCompra,Envio,factura,mispedidos,pago, pago1,perfilusuario,TiendaOnline, crearcuenta, agregarcamiseta, editarcamiseta, eliminarcamiseta,actualizar_cantidad
from django.urls import include, path
from . import views

urlpatterns = [
    path('',inicio,name='inicio'),
    path('admin1/',admin1,name='admin1'),
    path('adPedidos/',adPedidos,name='adPedidos'),
    path('adTienda/',adTienda,name='adTienda'),
    path('adUsuarios/',adUsuarios,name='adUsuarios'),
    path('adVentas/',adVentas,name='adVentas'),
    path('detalleCompra/',detalleCompra,name='detalleCompra'),
    path('Envio/',Envio,name='Envio'),
    path('factura/',factura,name='factura'),
    path('mispedidos/',mispedidos,name='mispedidos'),
    path('pago/',pago,name='pago'),
    path('pago1/',pago1,name='pago1'),
    path('perfilusuario/',perfilusuario,name='perfilusuario'),
    path('TiendaOnline/',TiendaOnline,name='TiendaOnline'),
    path('crearcuenta/', crearcuenta, name= 'crearcuenta'),
    path('agregarcamiseta/',agregarcamiseta,name='agregarcamiseta'),
    path('editarcamiseta/<int:id>/', editarcamiseta, name='editarcamiseta'),
    path('eliminarcamiseta/<int:id>/', eliminarcamiseta, name='eliminarcamiseta'),
    path('adUsuarios/', adUsuarios, name='adUsuarios'),
    path('agregar_usuario/', agregar_usuario, name='agregar_usuario'),
    path('editar_usuario/<int:user_id>/', editar_usuario, name='editar_usuario'),
    path('eliminar_usuario/<int:user_id>/', eliminar_usuario, name='eliminar_usuario'),
    path('agregar_al_carrito/<int:camiseta_id>/', agregar_al_carrito, name='agregar_al_carrito'),
    path('eliminar_del_carrito/<int:item_id>/', eliminar_del_carrito, name='eliminar_del_carrito'),
    path('actualizar_cantidad/<int:item_id>/', actualizar_cantidad, name='actualizar_cantidad'),
    path('admin1/login/', views.admin_login, name='admin_login'),
    path('crear_orden/', crear_orden_compra, name='crear_orden_compra'),
]