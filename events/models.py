from django.db import models
from django.contrib.postgres.fields import JSONField

class EventType(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)

class EventVenue(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    layout_type = models.CharField(max_length=255, default='none')
    layout = JSONField(default={})
    created_on = models.DateTimeField(auto_now_add=True)

class Event(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    event_type = models.ForeignKey(EventType,models.SET_NULL,blank=True,null=True)
    event_venue = models.ForeignKey(EventVenue,models.SET_NULL,blank=True,null=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    layout_type = models.CharField(max_length=255, default='none')
    layout = JSONField(default={})
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)

class EventPrice(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    event = models.ForeignKey(Event, models.SET_NULL, blank=True, null=True)
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)

class Layout(models.Model):
    layout_type = models.CharField(max_length=255, default='none')
    layout = JSONField(default={})
    created_on = models.DateTimeField(auto_now_add=True)