from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver

from users.models import ChatUser



# class PersonalRoom(models.Model):
#     user1 = models.ForeignKey(ChatUser, on_delete= models.SET_NULL)
#     user2 = models.ForeignKey(ChatUser, on_delete= models.SET_NULL)
#     room_name = models.CharField(unique =True)
#     def __str__(self):
#         return str(self.room_name)

room_types = [(1,"personal"),(2,"group")]

def room_display_photo_path(instance,filename):
    # ext= filename.split('.')[-1]
    # filename='{}.{}'.format(str(instance.usr.id)+str('_dp'),ext)
    return '{0}/{1}/{2}/{3}'.format('rooms',instance.id,'display_photo',filename)

class Room(models.Model):
    users = models.ManyToManyField(ChatUser, related_name='rooms' ,blank=True)
    room_type = models.IntegerField(room_types, default=2)
    room_name = models.CharField(max_length=600,unique=True)
    display_name = models.CharField(max_length=1000, blank=True, null=True)
    display_photo = models.ImageField(null=True, blank=True, upload_to=room_display_photo_path)

    def __str__(self):
        return str(self.room_name)

class Chat(models.Model):
    user = models.ForeignKey(ChatUser, on_delete=models.SET_NULL, null=True)
    room=models.ForeignKey(Room, on_delete=models.CASCADE)
    message = models.TextField()
    time_send=models.DateTimeField(blank=True, null=True)
    time_received=models.DateTimeField(blank=True, null=True)