from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid

class File(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_type = models.CharField(max_length=255, default='image')
    upload = models.FileField(null=True, blank=True)
    uuid = models.UUIDField(max_length=100, unique=True, default=uuid.uuid4, null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')