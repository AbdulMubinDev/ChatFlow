from django.contrib import admin

from .models import Room, RoomMembership, Message


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'owner', 'created_at')
    search_fields = ('name', 'code', 'owner__username')
    readonly_fields = ('code', 'created_at', 'updated_at')


@admin.register(RoomMembership)
class RoomMembershipAdmin(admin.ModelAdmin):
    list_display = ('room', 'user', 'joined_at')
    search_fields = ('room__name', 'room__code', 'user__username')
    list_filter = ('room',)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('room', 'sender', 'short_content', 'created_at')
    search_fields = ('room__name', 'room__code', 'sender__username', 'content')
    list_filter = ('room',)

    def short_content(self, obj):
        return obj.content[:40]
    short_content.short_description = 'Content'
