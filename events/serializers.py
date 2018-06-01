# users/serializers.py
from rest_framework import serializers
from .models import Event, EventType


class EventTypeSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventType
        fields = ('id', 'name', 'desc')

class EventSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Event
        fields = ('id', 'name', 'desc', 'event_type_id', 'is_layout_based');