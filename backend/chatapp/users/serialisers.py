from rest_framework import serializers
from .models import ChatUser
# ...
class ChatUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    
    # email = serializers.EmailField(
    #     required=True
    # )
    # username = serializers.CharField()
    # password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = ChatUser
        fields = ('email', 'username', 'password', 'profile_photo')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class ChatUsersSerializer(serializers.ModelSerializer):
    dp_url = serializers.SerializerMethodField('get_dp_url')
    class Meta:
        model = ChatUser
        fields = ('username', 'id', 'dp_url')
    def get_dp_url(self, instance):
        if (instance.profile_photo):
            return instance.profile_photo.url
        else:
            return None