from sys import implementation
import django
from django.contrib import admin

from .models import  Room, Chat

admin.site.register(Room)
admin.site.register(Chat)