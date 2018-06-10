from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class File(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_type = models.CharField(max_length=255)
    upload = models.FileField(null=False, default='')
    content_type = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING, default=0)
    object_id = models.PositiveIntegerField(default=0)
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return self.upload