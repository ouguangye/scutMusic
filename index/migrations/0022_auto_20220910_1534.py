# Generated by Django 3.2.15 on 2022-09-10 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0021_alter_album_uploadstate'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='isGetInfoForTracks',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='track',
            name='musicUrl',
            field=models.CharField(max_length=100, null=True, verbose_name='歌曲链接'),
        ),
    ]
