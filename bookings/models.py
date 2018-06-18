from django.db import models
from events.models import Event
import uuid

class Booking(models.Model):
    status = models.CharField(max_length=255, default='pending')
    uuid = models.CharField(max_length=100, blank=True, unique=True, default=uuid.uuid4)
    event = models.ForeignKey(Event, models.SET_NULL, blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)


class BookingItem(models.Model):
    status = models.CharField(max_length=255, default='pending')
    uuid = models.CharField(max_length=100, blank=True, unique=True, default=uuid.uuid4)
    event = models.ForeignKey(Event, models.SET_NULL, blank=True, null=True)
    lid = models.CharField(max_length=255, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)