from django.db import models
from events.models import Event
import uuid
from users.models import User
from ecore.models import Payment
from django.contrib.contenttypes.fields import GenericRelation

class Booking(models.Model):
    status = models.CharField(max_length=255, default='pending')
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    event = models.ForeignKey(Event, models.SET_NULL, blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, models.SET_NULL, blank=True, null=True)
    total = models.DecimalField(default=0, decimal_places=2, max_digits=20)
    send_to_email = models.CharField(max_length=255, blank=True)
    send_to_mobile  = models.CharField(max_length=255, blank=True)
    payments = GenericRelation(Payment)
    REQUIRED_FIELDS = ['user', 'send_to_email', 'send_to_mobile', 'event', 'total']

class BookingItem(models.Model):
    status = models.CharField(max_length=255, default='pending')
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    event = models.ForeignKey(Event, models.SET_NULL, blank=True, null=True)
    lid = models.CharField(max_length=255, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)