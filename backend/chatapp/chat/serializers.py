from rest_framework import serializers

from users.models import ChatUser

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
    dp_url = serializers.SerializerMethodField('get_dp')
    other_users = serializers.SerializerMethodField('get_other_users')
    class Meta:
        model = Room
        fields = ['id', 'users', 'room_type', 'room_name', 'display_name', 'other_users', 'dp_url']
        
    def create(self, validated_data):
        # usernames = validated_data.pop('users', None)
        # users=[]
        # for username in usernames:
        #     user = ChatUser.objects.get(username=username)
        #     users.append(user)
        # validated_data['users'] = users
        
        room = super().create(validated_data)

        # data.pop('display_photo', None)
        return room

    def get_other_users(self, instance):
        usernames = []
        for user in instance.users.all():
            if user.id!=self.context.get("user_id"):
                usernames.append(user.username)
        return usernames
    
    def get_dp(self, instance):
        if instance.room_type == 1:
            for user in instance.users.all():
                if user.id!=self.context.get("user_id"):
                    if user.profile_photo:
                        return user.profile_photo.url
                    else:
                        return None
                
        elif instance.room_type == 2:
            if instance.display_photo:
                return instance.display_photo.url
            else:
                return None
    