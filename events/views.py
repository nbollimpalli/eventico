from django.shortcuts import render_to_response
from rest_framework.decorators import *
from django.core import serializers
from ecore.json_response import JsonResponse
import copy
import datetime
from django.contrib.contenttypes.models import ContentType;
from .models import EventType, EventVenue, EventPrice, Layout
# Create your views here.
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from events.serializers import EventTypeSerializer, EventPriceSerializer, EventVenueSerializer, LayoutSerializer
from rest_framework_jwt.settings import api_settings
from events.services.layout_service import LayoutService
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
from ecore.metadata_service import *
import os
from ecore.models import Location
from django.db import transaction
from ecore.serializers import LocationSerializer
def index(request):
    js_path = "eventico/static/js"  # insert the path to your directory
    css_path = "eventico/static/css"  # insert the path to your directory
    js_list = os.listdir(js_path)
    css_list = os.listdir(css_path)
    user_agent = request.META['HTTP_USER_AGENT']
    queries = request.GET
    mid = queries.get('mid')
    print(queries)
    if(mid):
        mid = mid[0]
    metadata_details = MetadataService(mid, {}, user_agent)
    metadata_details = metadata_details.fetch_metadata_details()

    return render_to_response('index.html', {'js_list': js_list, 'css_list' : css_list, 'title' : metadata_details['title'], 'image_url':metadata_details['image_url'], 'desc':metadata_details['desc']})

#-----------------event types api -------------------#

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_types(request):
    resp = JsonResponse()
    try:
        event_type_objects = EventType.objects.all();
        event_type_objects = EventTypeSerializer(instance=event_type_objects, many=True).data
        resp.add_data('event_types', event_type_objects)
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upsert_event_type(request):
    resp = JsonResponse()
    try:
        event_type = request.data
        id = event_type.get('id')
        if(id):
            message = 'Event Type Successfully updated'
            event_type_instance = EventType.objects.get(id=id)
            serializer = EventTypeSerializer(instance=event_type_instance, data=event_type)
        else:
            message = 'Event Type Successfully created'
            serializer = EventTypeSerializer(data=event_type)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        resp.add_json_messages([message])
    except Exception as e:
        resp.mark_failed(['Unable to process this request, please contact your developer'])
    return resp.export()


#-----------------event venues api -------------------#

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_venue(request):
    resp = JsonResponse()
    try:
        evId = request.GET['id'];
        event_venue_object = EventVenue.objects.get(id=evId)
        layouts = event_venue_object.layouts.all()
        layout = {}
        if(layouts):
            layout = layouts[0]
            layoutSerializer = LayoutSerializer(instance=layout)
            layout = layoutSerializer.data

        eventVenueSerializer = EventVenueSerializer(instance=event_venue_object)
        resp.add_data('event_venue', eventVenueSerializer.data)
        resp.add_data('layout', layout)
    except Exception as e:
        resp.mark_failed(['Unable to process this request, Please contact your developer'])
    return resp.export()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_venues(request):
    resp = JsonResponse()
    try:
        event_venue_objects = EventVenue.objects.all();
        event_venue_objects = EventVenueSerializer(instance=event_venue_objects, many=True).data
        resp.add_data('event_venues', event_venue_objects)
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upsert_event_venue(request):
    resp = JsonResponse()
    try:
        with transaction.atomic():
            message = 'Event Venue Updated Successfully'
            data = request.data
            venue = data['venue']
            location = data['location']

            try:
                venue_id = venue['id']
                venue_instance = EventVenue.objects.get(id=venue_id)
            except Exception as e:
                message = 'Event Venue Created Successfully'
                venue_instance = None
            try:
                location_id = location['id']
                location_instance = Location.objects.get(id=location_id)
            except Exception as e:
                location_instance = None
            if(location_instance):
                lserializer = LocationSerializer(instance=location_instance, data=location)
            else:
                lserializer = LocationSerializer(data=location)
            lserializer.is_valid(raise_exception=True)
            lserializer.save()
            print(lserializer.instance.id)
            if (venue_instance):
                vserializer = EventVenueSerializer(instance=venue_instance, data=venue)
            else:
                vserializer = EventVenueSerializer(data=venue)
            vserializer.is_valid(raise_exception=True)
            vserializer.save()
            vserializer.instance.location = lserializer.instance
            vserializer.instance.save()
            resp.add_data('venue', vserializer.data)
            resp.add_data('location', lserializer.data)
            resp.add_json_messages([message])
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
        print(str(e))
    return resp.export()

#-----------------events api -------------------#

@api_view(['GET'])
@permission_classes([AllowAny])
def get_event(request):
    resp = JsonResponse()
    try:
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

    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()

@api_view(['GET'])
@permission_classes([AllowAny])
def get_events(request):
    resp = JsonResponse()
    try:
        events = Event.objects.all();
        events = EventSerializer(events, many=True).data
        resp.add_data('events', events)
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upsert_event(request):
    resp = JsonResponse()
    try:
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
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()

#-----------------pricelists api-------------------#
@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_pricelists(request):
    resp = JsonResponse()
    try:
        eventPriceLists = EventPrice.objects.all();
        eventPriceLists = serializers.serialize("json", eventPriceLists)
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upsert_event_price(request):
    resp = JsonResponse()
    try:
        event_price = request.data
        serializer = EventPriceSerializer(data=event_price)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()

#-----------------layout api-------------------#
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upsert_layout(request):
    resp = JsonResponse()
    try:
        with transaction.atomic():
            message = 'Layout Updated Successfully';
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
                message = "Layout Got created successfully"
                layout_serializer = LayoutSerializer(data=layout_input)

            if layout_serializer.is_valid():
                layout_serializer.save()
                resp.add_data('layout', layout_serializer.data)
                resp.add_json_messages([message])
            else:
                raise EventException('Unable to process this request, Please contact your developer')
    except EventException as e:
        resp.mark_failed([str(e)])
    except Exception as e:
        resp.mark_failed(['Unable to process this request'])
    return resp.export()


class EventException(Exception):
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors