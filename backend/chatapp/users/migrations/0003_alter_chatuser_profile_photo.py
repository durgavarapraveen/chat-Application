# Generated by Django 3.2.21 on 2023-09-27 16:17

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_chatuser_profile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatuser',
            name='profile_photo',
            field=models.ImageField(blank=True, null=True, upload_to=users.models.chatUser_profile_photo_path),
        ),
    ]