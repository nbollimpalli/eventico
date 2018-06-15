from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation

class Layout(models.Model):
    layout_type = models.CharField(max_length=255, default='none')
    layout = JSONField(default={})
    content_type = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')

class EventType(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)

class EventVenue(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)
    layouts = GenericRelation(Layout)

class Event(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    event_type = models.ForeignKey(EventType,models.SET_NULL,blank=True,null=True)
    event_venue = models.ForeignKey(EventVenue,models.SET_NULL,blank=True,null=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)
    layouts = GenericRelation(Layout)

class EventPrice(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    event = models.ForeignKey(Event, models.SET_NULL, blank=True, null=True)
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)

