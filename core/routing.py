from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/chat/<slug:room_code>/', consumers.ChatConsumer.as_asgi(), name='ws_chat'),
]

