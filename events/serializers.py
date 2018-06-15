# users/serializers.py
from rest_framework import serializers
from .models import Event, EventType, EventVenue, EventPrice, Layout


class EventTypeSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventType
        fields = ('id', 'name', 'desc', 'status')

class EventSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Event
        fields = ('id', 'name', 'desc', 'event_type', 'status', 'start_datetime', 'end_datetime', 'event_venue')

class EventVenueSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventVenue
        fields = ('id', 'name', 'desc', 'status')

class EventPriceSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventPrice
        fields = ('id', 'name', 'desc', 'price', 'status', 'event_id')


class LayoutSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Layout
        fields = ('layout', 'layout_type', 'content_object')