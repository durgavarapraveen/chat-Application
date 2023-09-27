from django.urls import path, include

from .views import ChatsApiView, RoomsApiView

app_name='chat'

urlpatterns=[
    path('get_rooms/', RoomsApiView.as_view(), name='get_rooms'),
    path('get_chats/', ChatsApiView.as_view(), name='get_chats'),
]