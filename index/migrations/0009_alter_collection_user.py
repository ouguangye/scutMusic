# Generated by Django 3.2.15 on 2022-09-04 07:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0008_auto_20220904_0042'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='index.userinfo'),
        ),
    ]
