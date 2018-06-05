# users/serializers.py
from rest_framework import serializers
from .models import Event, EventType, EventVenue, EventPrice


class EventTypeSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventType
        fields = ('id', 'name', 'desc', 'status')

class EventSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Event
        fields = ('id', 'name', 'desc', 'event_type_id', 'layout_type', 'status', 'layout')

class EventVenueSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventVenue
        fields = ('id', 'name', 'desc', 'status', 'layout_type', 'layout')

class EventPriceSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventPrice
        fields = ('id', 'name', 'desc', 'price', 'status', 'event_id')