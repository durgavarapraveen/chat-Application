from dataclasses import field
from turtle import fd
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse_lazy


# from entry.models import Question, fields


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from users.models import ChatUser

from .models import Room, Chat
from .serializers import ChatsSerializer, RoomsSerializer


class ChatsApiView(APIView):
    permission_classes = (IsAuthenticated, )
    
    def get(self, request):
        room_name = request.data['room_name']
        access_token = request.data['access']
        access_token = AccessToken(access_token)
        user = ChatUser.objects.get(id=int(access_token['user_id']))
        room =  Room.objects.get(room_name=room_name)
        if user in room.users.all():
            chats = Chat.objects.filter(room = room)
            sending_data =  ChatsSerializer(chats, many=True)
            return Response({'room_name': room.room_name, 'chats':sending_data.data})
        else:
            return Response({'detail':'user not part of room', 'code':400})
        

class RoomsApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        access_token = str(request.headers['Authorization']).split(' ')[1]
        access_token = AccessToken(access_token)
        user = ChatUser.objects.get(id=int(access_token['user_id']))
        rooms = user.rooms.all()
        rooms_data = RoomsSerializer(rooms, many=True, context={'user_id':user.id})
        return Response(rooms_data.data)



    













# def rm(request, other_usr):
#     print(other_usr)
#     ques_id=request.GET.get('ques_id')
#     print(str(ques_id))
#     ques_id=int(str(ques_id))
#     ques=Question.objects.get(id=ques_id)
#     fd_no=request.GET.get('fd_no')
#     print(fd_no)
#     fd_no=int(str(fd_no))
#     fd=fields.objects.get(no=int(fd_no))
#     if request.GET.get('requestfrom')=="guide":
#         gd=User.objects.get(username=str(request.user))
#         gde=User.objects.get(username=str(other_usr))
#     elif request.GET.get('requestfrom')=="guidee":
#         gde=User.objects.get(username=str(request.user))
#         gd=User.objects.get(username=str(other_usr))
    

#     try:
#         rm=room.objects.get(guide=gd,guidee=gde,ques=ques, fd= fd)
#     except:
#         room_name=str(gd.username)+"_"+str(gde.username)+"_"+str(fd_no)+"_"+str(ques_id)
#         rm=room.objects.create(guide=gd,guidee=gde,room_name=room_name, fd=fd, ques=ques)
#         gd.guideinfo.guide_rooms.add(rm)
#         gd.save()
#         gde.guideeinfo.guidee_rooms.add(rm)
#         gde.save()
    
#     for mssg in rm.message_set.all():
#         print(mssg)
#         if mssg.status == "gd1":
#             mssg.status="gd2"
#             mssg.save()
#     if request.method == 'POST':
#         print("came post")
#         rp=request.POST
#         if 'chat-closeroom' in rp:
#             return render(request, 'chat/ans.html', {
#                 'room': rm,
#                 'other_usr': other_usr,
#                 'ques': ques,
#                 'fd': fd,
#                 'user_role': request.GET.get('requestfrom'),
#             })
#         elif 'ans-submit' in rp:
#             ans=rp['ans']
#             ques.ans= ans
#             ques.status= 4
#             ques.save()
#             rm.status="c"
#             rm.save()
#             return HttpResponseRedirect(reverse_lazy('home'))
#     return render(request, 'chat/room.html', {
#         'room': rm,
#         'other_usr': other_usr,
#         'ques': ques,
#         'fd': fd,
#         'user_role': request.GET.get('requestfrom'),
#     })