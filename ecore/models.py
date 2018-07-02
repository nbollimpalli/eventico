from django.db import models
import uuid
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

#Default
class Role(models.Model):
    display_name = models.CharField(max_length=255, null=True, blank=True)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    name = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)
    access_everything = models.BooleanField(default=False)

class Permission(models.Model):
    display_name = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    parent_permission = models.ForeignKey('Permission', on_delete=models.CASCADE, null=True, blank=True, related_name='permission_parent')
    root_permission = models.ForeignKey('Permission', on_delete=models.CASCADE, null=True, blank=True, related_name='permission_root')
    allowed_any = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, null=True, blank=True)

class Config(models.Model):
    name = models.CharField(max_length=255, unique=True)
    value = models.TextField(blank=True)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    #charge, refund
    type = models.CharField(max_length=40)
    #paisapay, cash
    mode = models.CharField(max_length=40)
    amount = models.DecimalField(default=0, decimal_places=2, max_digits=20)
    txn_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')

class Location(models.Model):
    name = models.CharField(max_length=255, unique=True)
    place_id = models.CharField(max_length=255, unique=True)
    location_url = models.CharField(max_length=255, unique=True)
    address = models.TextField(blank=True)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)