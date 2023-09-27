from django.db import models
from django.contrib.auth.models import AbstractUser

def chatUser_profile_photo_path(instance,filename):
    # ext= filename.split('.')[-1]
    # filename='{}.{}'.format(str(instance.usr.id)+str('_dp'),ext)
    return '{0}/{1}/{2}/{3}'.format('chatusers',instance.id,'profile_photo',filename)

class ChatUser(AbstractUser):
    profile_photo = models.ImageField(null=True, blank=True, upload_to=chatUser_profile_photo_path)
    pass
# Create your models here.
