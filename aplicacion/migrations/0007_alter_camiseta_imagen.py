# Generated by Django 5.0.6 on 2024-06-15 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aplicacion', '0006_camiseta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camiseta',
            name='imagen',
            field=models.ImageField(upload_to='adTienda'),
        ),
    ]
