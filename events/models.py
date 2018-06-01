from django.db import models

class EventType(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

class Event(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    event_type = models.ForeignKey(EventType,models.SET_NULL,blank=True,null=True)
    is_layout_based = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)