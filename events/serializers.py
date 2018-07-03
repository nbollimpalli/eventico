# users/serializers.py
from rest_framework import serializers
from django.contrib.postgres.fields import JSONField

from django.db import models
from .models import Event, EventType, EventVenue, EventPrice, Layout
from file_manager.serializers import FileSerializer


class EventTypeSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventType
        fields = ('id', 'name', 'desc', 'status')

class EventSerializer(serializers.ModelSerializer):
    # times =  JSONField(source='times')
    images = FileSerializer(many=True, read_only=True)
    class Meta(object):
        model = Event
        fields = ('id', 'name', 'desc', 'event_type', 'status', 'start_datetime', 'end_datetime', 'event_venue', 'times', 'images')

class EventVenueSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventVenue
        depth = 2
        fields = ('id', 'desc', 'status', 'location', 'location_id')

class EventPriceSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = EventPrice
        fields = ('id', 'name', 'desc', 'price', 'status', 'event_id')


class LayoutSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Layout
        fields = ('id', 'layout', 'layout_type', 'content_type', 'object_id', 'status')