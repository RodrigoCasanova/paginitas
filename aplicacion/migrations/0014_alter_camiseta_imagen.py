# Generated by Django 5.0.6 on 2024-06-25 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aplicacion', '0013_alter_camiseta_imagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camiseta',
            name='imagen',
            field=models.ImageField(upload_to='adTienda'),
        ),
    ]
