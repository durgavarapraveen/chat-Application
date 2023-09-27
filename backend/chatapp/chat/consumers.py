import json
from urllib import request
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from django.contrib.auth.models import User
from django.dispatch import receiver

from datetime import datetime

from .models import Room, Chat

# from entry.models import usrinfo

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_text = text_data_json['message']
        # overall_message=text_data_json['overall_message']
        # receiver_txt=text_data_json['receiver']
        # user_role=text_data_json['user_role']
        room_name=text_data_json['room_name']
        usr=self.scope['user']
        usr=User.objects.get(username=(usr.username))
        # receiver=User.objects.get(username=receiver_txt)
        rm = Room.objects.get(room_name=room_name)
        mssg= Chat.objects.create(message=message_text,user = usr, room= rm, time_send= datetime.now())
        sent_time=str(mssg.time_send)
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message_text,
                'msg':message_text,
                # 'user_role':user_role,
                'sent_time':sent_time,
                # 'receiver':receiver_txt,
                'room_name':room_name,

            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message_text=str(event['message'])
        sent_time=str(event['sent_time'])
        # receiver_txt=str(event['receiver'])
        # user_role=str(event['user_role'])
        room_name=str(event['room_name'])
        user=self.scope['user']
        user=User.objects.get(username=(user.username))
        # receiver=User.objects.get(username=receiver_txt)
        room=Room.objects.get(room_name=room_name)
        chat=Chat.objects.get(message=message_text,user=user, room=room, time_sent = sent_time)
        
        print(chat)
        
        # for mssg in msgs:
        #     print(str(mssg.time_send),"  ",sent_time)
        #     if str(mssg.time_send)==sent_time:
        #         print(user_role=="guidee")
        #         if user_role =="guide":
        #             mssg.status="gd1"
        #         elif user_role =="guidee":
        #             mssg.status="gde1"
        #         mssg.save()
        #         print(mssg.status)
        #         break  
        
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message_text,
            'user_id': user.id
        }))