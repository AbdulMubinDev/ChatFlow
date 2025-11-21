import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from django.contrib.auth import get_user_model
from django.utils import timezone

from .models import Room, Message
from .utils.mongo import log_chat_message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope['url_route']['kwargs']['room_code']
        self.group_name = f'room_{self.room_code}'

        user = self.scope['user']
        if user.is_anonymous or not await self.user_in_room(user.id, self.room_code):
            await self.close()
            return

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        if text_data is None:
            return

        data = json.loads(text_data)
        message = data.get('message', '').strip()
        user = self.scope['user']

        if not message:
            return

        saved_message = await self.save_message(user.id, self.room_code, message)

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat.message',
                'message': saved_message['content'],
                'sender': saved_message['sender'],
                'timestamp': saved_message['timestamp'],
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp'],
        }))

    @database_sync_to_async
    def user_in_room(self, user_id, room_code):
        try:
            room = Room.objects.get(code=room_code.upper())
        except Room.DoesNotExist:
            return False
        return room.participants.filter(id=user_id).exists()

    @database_sync_to_async
    def save_message(self, user_id, room_code, content):
        User = get_user_model()
        user = User.objects.get(id=user_id)
        room = Room.objects.get(code=room_code.upper())
        message = Message.objects.create(room=room, sender=user, content=content)
        payload = {
            'content': message.content,
            'sender': user.get_full_name() or user.username,
            'timestamp': message.created_at.strftime('%H:%M'),
        }
        self._archive_message(room, user, message)
        return payload

    def _archive_message(self, room, user, message):
        log_chat_message({
            'room_id': room.id,
            'room_code': room.code,
            'room_name': room.name,
            'sender_id': user.id,
            'sender_username': user.username,
            'sender_name': user.get_full_name() or user.username,
            'content': message.content,
            'created_at': message.created_at or timezone.now(),
        })

