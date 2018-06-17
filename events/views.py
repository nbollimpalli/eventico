from django.shortcuts import render_to_response
from rest_framework.decorators import *
from django.core import serializers
import copy
import datetime
from django.contrib.contenttypes.models import ContentType;
from eventico import settings
from .models import Event, EventType, EventVenue, EventPrice, Layout
# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from events.serializers import EventSerializer, EventTypeSerializer, EventPriceSerializer, EventVenueSerializer, LayoutSerializer
from django.http import JsonResponse
from rest_framework_jwt.settings import api_settings
from events.services.layout_service import LayoutService
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

def index(request):
    return render_to_response('index.html')

@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_types(request):
    event_type_objects = EventType.objects.all();
    event_type_objects = serializers.serialize("json", event_type_objects)
    return JsonResponse(event_type_objects, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_events(request):
    events = Event.objects.all();
    events = EventSerializer(events, many=True).data
    return JsonResponse(events, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_venues(request):
    event_venue_objects = EventVenue.objects.all();
    event_venue_objects = serializers.serialize("json", event_venue_objects)
    return JsonResponse(event_venue_objects, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_event(request):
    eId = request.GET['id'];
    event_object = Event.objects.get(id=eId)
    layouts = event_object.layouts.all()
    layout = None
    if(layouts.count() > 0):
        layout = layouts[0]
    layoutSerializer = LayoutSerializer(instance=layout)
    eventSerializer = EventSerializer(instance=event_object)
    response = { 'event' : eventSerializer.data, 'layout' : {}}
    if (layout):
        response['layout'] = layoutSerializer.data
    return  JsonResponse(response, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_venue(request):
    evId = request.GET['id'];
    event_venue_object = EventVenue.objects.get(id=evId)
    layout = event_venue_object.layouts.all()[0]
    layoutSerializer = LayoutSerializer(instance=layout)
    eventVenueSerializer = EventVenueSerializer(instance=event_venue_object)
    response = { 'event_venue' : eventVenueSerializer.data, 'layout' : layoutSerializer.data }
    return  JsonResponse(response, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_pricelists(request):
    eventPriceLists = EventPrice.objects.all();
    eventPriceLists = serializers.serialize("json", eventPriceLists)
    return JsonResponse(eventPriceLists, status=status.HTTP_200_OK, safe=False)


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
    times = event.get('times')
    start_datetime = times.get('start')
    end_datetime = times.get('end')
    start_datetime = start_datetime.get('date').split('T')[0] + ' ' + str(start_datetime.get('hh'))+':'+str(start_datetime.get('mm'))+start_datetime.get('period')
    end_datetime = end_datetime.get('date').split('T')[0] + ' ' + str(end_datetime.get('hh'))+':'+str(end_datetime.get('mm'))+end_datetime.get('period')
    event['start_datetime'] = datetime.datetime.strptime(start_datetime ,'%Y-%m-%d %I:%M%p')
    event['end_datetime'] = datetime.datetime.strptime(end_datetime,'%Y-%m-%d %I:%M%p')
    serializer = EventSerializer(data=event)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_event_venue(request):
    event_venue = request.data
    serializer = EventVenueSerializer(data=event_venue)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_event_price(request):
    event_price = request.data
    serializer = EventPriceSerializer(data=event_price)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def update_event_type(request):
    event_type = request.data
    serializer = EventTypeSerializer(data=event_type)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def upsert_event(request):
    event = request.data
    default_price = event.get('default_price')
    times = event.get('times')
    start_datetime = times.get('start')
    end_datetime = times.get('end')
    start_datetime = start_datetime.get('date').split('T')[0] + ' ' + str(start_datetime.get('hh')) + ':' + str(
        start_datetime.get('mm')) + start_datetime.get('period')
    end_datetime = end_datetime.get('date').split('T')[0] + ' ' + str(end_datetime.get('hh')) + ':' + str(
        end_datetime.get('mm')) + end_datetime.get('period')
    event['start_datetime'] = datetime.datetime.strptime(start_datetime, '%Y-%m-%d %I:%M%p')
    event['end_datetime'] = datetime.datetime.strptime(end_datetime, '%Y-%m-%d %I:%M%p')
    layout = LayoutService.get_layout({'model' : 'eventvenue', 'object_id' : event['event_venue']})
    if(layout):
        mode = 'new'
        if ("id" in request.data):
            eId = request.data['id'];
            event_object = Event.objects.get(id=eId)
            serializer = EventSerializer(instance=event_object, data=event)
            mode = 'edit'
        else:
            serializer = EventSerializer(data=event)

        if serializer.is_valid():
            serializer.save()
            if(mode == 'new'):
                LayoutService.copy_layout(layout, serializer.instance)
            layout = LayoutService.get_layout({'model': 'event', 'object_id': serializer.instance.id})
            LayoutService.update_default_price(layout, default_price)
            layout_serializer = LayoutSerializer(instance=layout)
            return Response({'event' : serializer.data, 'layout' : layout_serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'messages' : 'No layout found for the event venue'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def update_event_venue(request):
    event_venue_json = copy.deepcopy(request.data)
    event_venue_json.pop('id', None)
    evId = request.data['id'];
    event_venue = EventVenue.objects.get(id=evId)
    serializer = EventVenueSerializer(instance=event_venue, data=event_venue_json)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
@permission_classes([AllowAny])
def update_event_price(request):
    event_price = request.data
    serializer = EventPriceSerializer(data=event_price)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def upsert_layout(request):
    objId = request.data['object_id']
    model = request.data['model']
    app_label = request.data['app_label']
    contentType = ContentType.objects.get(app_label=app_label, model=model)
    kclass = contentType.model_class()
    kclass_instance = kclass.objects.get(id=objId)
    layout_input = request.data
    layout_input = {'layout': layout_input['layout'], 'layout_type' : layout_input['layout_type'], 'content_object' : kclass_instance, 'content_type': contentType.id, 'object_id': int(objId) }
    if("id" in request.data):
        lId = request.data['id'];
        layout_object = Layout.objects.get(id=lId)
        layout_serializer = LayoutSerializer(instance=layout_object, data=layout_input)
    else:
        layout_serializer = LayoutSerializer(data=layout_input)

    if layout_serializer.is_valid():
        layout_serializer.save()
        return Response(layout_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(layout_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


