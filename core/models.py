from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
from django.utils.crypto import get_random_string
from django.urls import reverse


User = get_user_model()


def generate_room_code():
    return get_random_string(length=8, allowed_chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789')


class Room(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_rooms')
    name = models.CharField(max_length=80)
    code = models.CharField(max_length=8, unique=True, editable=False)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    participants = models.ManyToManyField(User, through='RoomMembership', related_name='chat_rooms')

    class Meta:
        ordering = ['-updated_at']

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self._generate_unique_code()
        super().save(*args, **kwargs)

    @classmethod
    def _generate_unique_code(cls):
        code = generate_room_code()
        while cls.objects.filter(code=code).exists():
            code = generate_room_code()
        return code

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def get_absolute_url(self):
        return reverse('room_detail', args=[self.code])

    def __str__(self):
        return f'{self.name} ({self.code})'


class RoomMembership(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='memberships')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='room_memberships')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('room', 'user')
        ordering = ['joined_at']

    def __str__(self):
        return f'{self.user} -> {self.room}'


class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.sender} @ {self.room}: {self.content[:20]}'
