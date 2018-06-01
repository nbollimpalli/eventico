from django.shortcuts import render_to_response
from rest_framework.decorators import *
from django.core import serializers

from eventico import settings
from .models import EventType
from .models import Event
# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from events.serializers import EventSerializer, EventTypeSerializer
from django.http import JsonResponse
from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
def index(request):
    return render_to_response('index.html')

@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_types(request):
    event_type_objects = EventType.objects.all();
    event_type_objects = serializers.serialize("json", event_type_objects)
    return JsonResponse(event_type_objects, status=status.HTTP_200_OK, safe=False);

@api_view(['GET'])
@permission_classes([AllowAny])
def get_events(request):
    events = Event.objects.all();
    events = serializers.serialize("json", events)
    return JsonResponse(events, status=status.HTTP_200_OK, safe=False);

@api_view(['POST'])
@permission_classes([AllowAny])
def create_event_type(request):
    event_type = request.data
    serializer = EventTypeSerializer(data=event_type)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_event(request):
    event = request.data
    serializer = EventSerializer(data=event)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)