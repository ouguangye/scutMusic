# Generated by Django 3.2.15 on 2022-09-06 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0012_auto_20220906_1942'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reply',
            name='replyId',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
