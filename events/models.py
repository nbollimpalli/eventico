from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from file_manager.models import File
import uuid
from ecore.models import Location

class Layout(models.Model):
    layout_type = models.CharField(max_length=255, default='none')
    layout = JSONField(default={})
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')

class EventType(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4)
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)

class EventVenue(models.Model):
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)
    location = models.ForeignKey(Location, models.SET_NULL, blank=True, null=True)
    layouts = GenericRelation(Layout)

class Event(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    event_type = models.ForeignKey(EventType,models.SET_NULL,blank=True,null=True)
    event_venue = models.ForeignKey(EventVenue,models.SET_NULL,blank=True,null=True)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)
    layouts = GenericRelation(Layout)
    images = GenericRelation(File)

    @property
    def times(self):
        start = { 'date' : self.start_datetime.isoformat(), 'hh' : int(self.start_datetime.strftime('%I')), 'mm' : int(self.start_datetime.strftime('%M')), 'period' : self.start_datetime.strftime('%p'), 'month': self.start_datetime.strftime('%b'), 'day': self.start_datetime.strftime('%a'), 'day_num': self.start_datetime.strftime('%d') }
        end = {'date': self.end_datetime.isoformat(), 'hh': int(self.end_datetime.strftime('%I')), 'mm': int(self.end_datetime.strftime('%M')), 'period': self.end_datetime.strftime('%p'), 'month': self.end_datetime.strftime('%b'), 'day': self.end_datetime.strftime('%a'), 'day_num': self.end_datetime.strftime('%d')}
        return { 'start' : start, 'end' : end }

class EventPrice(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    event = models.ForeignKey(Event, models.SET_NULL, blank=True, null=True)
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)

