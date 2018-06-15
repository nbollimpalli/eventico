from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import FileSerializer
from django.apps import apps
from django.contrib.contenttypes.models import ContentType;

class FileView(APIView):
  parser_classes = (MultiPartParser, FormParser)

  #@api_view(['POST'])
  #@permission_classes([AllowAny])
  def post(self, request, *args, **kwargs):
    objId = request.data['objectId']
    model = request.data['model']
    app_label = request.data['app_label']
    contentType = ContentType.objects.get(app_label=app_label, model=model)
    kclass = contentType.model_class()
    kclass_instance = kclass.objects.get(id=objId)
    file_serializer_input = { 'upload' : request.data['upload'],'file_type' : request.data['file_type'], 'content_object' : kclass_instance }
    file_serializer = FileSerializer(data=file_serializer_input)
    import code;
    # code.interact(local=dict(globals(), **locals()))
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)