from rest_framework import serializers
from .models import Booking, BookingItem


class BookingSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Booking
        fields = ('status', 'uuid', 'event')

class BookingItemSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = BookingItem
        fields = ('status', 'uuid', 'event', 'lid')
