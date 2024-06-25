# Generated by Django 5.0.6 on 2024-06-25 03:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aplicacion', '0011_carrito_itemcarrito_delete_carritoitem'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
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
        migrations.CreateModel(
            name='CarritoItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField(default=1)),
                ('talla', models.CharField(max_length=10)),
                ('camiseta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='aplicacion.camiseta')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Carrito',
        ),
        migrations.DeleteModel(
            name='ItemCarrito',
        ),
    ]
