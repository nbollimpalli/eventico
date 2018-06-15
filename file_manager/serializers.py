from rest_framework import serializers
from .models import File
class FileSerializer(serializers.ModelSerializer):
  class Meta():
    model = File
    content_object = serializers.RelatedField(source='content_object', read_only=True)
    fields = ('upload', 'file_type','content_object')