from rest_framework.decorators import *
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import FileSerializer
from django.apps import apps
from django.contrib.contenttypes.models import ContentType;
from ecore.json_response import JsonResponse
from django.db import transaction
from .models import File
EVENT_BANNER = 'event_banner'

class FileView(APIView):
  parser_classes = (MultiPartParser, FormParser)
  permission_classes = (IsAuthenticated,)

  def post(self, request):
    resp = JsonResponse()
    try:
      with transaction.atomic():
        objId = request.data['objectId']
        model = request.data['model']
        app_label = request.data['app_label']
        file_type = request.data['file_type']
        upload = request.data['upload']

        try:
            file_serializer = globals()['upload_' + file_type](file_type, objId, model, app_label, upload)
        except KeyError as ke:
            raise FileManagerException('Invalid File Type selected')

        if file_serializer.is_valid():
          file_serializer.save()
          resp.add_data('file', file_serializer.data)
        else:
          raise FileManagerException(file_serializer.errors.join(', '))
        resp.add_json_messages(['Successfully uploaded'])
    except KeyError as ke:
      print(str(ke))
      resp.mark_failed(['Unable to Upload due to invalid file options provided, please contact your developer'])
    except FileManagerException as fme:
      resp.mark_failed([str(fme)])
    except Exception as e:
      print(str(e))
      resp.mark_failed(['Unable to Upload file to some technical reasons, please contact your developer'])
    return resp.export()


def upload_event_banner(file_type, objId, model, app_label, upload):
    return  upload_one_instance_image(file_type, objId, model, app_label, upload)

def upload_event_list_banner(file_type, objId, model, app_label, upload):
    return  upload_one_instance_image(file_type, objId, model, app_label, upload)

def cleanup_files(files):
    if(files):
        for file in files:
            file.upload.delete()
            file.delete()

def upload_one_instance_image(file_type, objId, model, app_label, upload):
    contentType = ContentType.objects.get(app_label=app_label, model=model)
    kclass = contentType.model_class()
    kclass_instance = kclass.objects.get(id=objId)
    files = File.objects.all().filter(content_type=contentType, object_id=objId, file_type=file_type)
    if (files):
        cleanup_files(files)
    file_serializer_input = {'upload': upload, 'file_type': file_type,
                             'content_type': contentType.id, 'object_id': int(objId)}
    file_serializer = FileSerializer(data=file_serializer_input)
    return file_serializer

class FileManagerException(Exception):
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors