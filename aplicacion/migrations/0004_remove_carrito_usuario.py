# Generated by Django 5.0.6 on 2024-06-14 23:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aplicacion', '0003_item_remove_envio_email_remove_envio_nombre_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carrito',
            name='usuario',
        ),
    ]