from rest_framework import serializers
from .models import Chat, Room

class ChatsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField('get_username')
    # roomname = serializers.SerializerMethodField('get_roomname')
    class Meta:
        model = Chat
        fields = ['user','room','message','time_send','username']
    
    def get_username(self, instance):
        return instance.user.username

    # def get_roomname(self, instance):
    #     return instance.room.room_name    

class RoomsSerializer(serializers.ModelSerializer):
    room_members = serializers.SerializerMethodField('get_room_members')
    class Meta:
        model = Room
        fields = ['users', 'room_type', 'room_name', 'display_name', 'room_members']

    def get_room_members(self, instance):
        usernames = []
        for user in instance.users.all():
            usernames.append(user.username)
        return usernames
    