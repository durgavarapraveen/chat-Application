from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
# Create your views here.

from .serialisers import ChatUserSerializer


class UserCreationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        serializer = ChatUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):

        try:
            # access_token = request.data['access']
            # access_token = AccessToken(access_token)
            # print(access_token)
            # access_token.blacklist()
            refresh_token = request.data['refresh']
            refresh_token = RefreshToken(refresh_token)
            refresh_token.blacklist()

            return Response({'status': 'refresh_token blacklisted', 'code': 205})
        
        except:
            return Response({'status':'bad request','code':400 })

        


        