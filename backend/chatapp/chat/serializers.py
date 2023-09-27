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
    # room_members = serializers.SerializerMethodField('get_room_members')
    dp = serializers.SerializerMethodField('get_dp')
    other_users = serializers.SerializerMethodField('get_other_users')
    class Meta:
        model = Room
        fields = ['users', 'room_type', 'room_name', 'display_name', 'other_users', 'dp']

    def get_other_users(self, instance):
        usernames = []
        for user in instance.users.all():
            if user.id!=self.context.get("user_id"):
                usernames.append(user.username)
        return 
    
    def get_dp(self, instance):
        if instance.room_type == 1:
            for user in instance.users.all():
                if user.id!=self.context.get("user_id"):
                    return user.profile_photo
        elif instance.room_type == 2:
            return instance.display_photo
    