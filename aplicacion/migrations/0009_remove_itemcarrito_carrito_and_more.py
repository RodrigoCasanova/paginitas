# Generated by Django 5.0.6 on 2024-06-25 00:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aplicacion', '0008_carrito_itemcarrito_carrito_productos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemcarrito',
            name='carrito',
        ),
        migrations.RemoveField(
            model_name='itemcarrito',
            name='camiseta',
        ),
        migrations.DeleteModel(
            name='Carrito',
        ),
        migrations.DeleteModel(
            name='ItemCarrito',
        ),
    ]
