# Generated by Django 3.2.21 on 2023-09-28 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_room_display_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='room_name',
            field=models.CharField(blank=True, max_length=600, null=True),
        ),
    ]
