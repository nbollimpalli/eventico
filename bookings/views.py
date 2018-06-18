from rest_framework.decorators import *
import copy
import datetime
from django.contrib.contenttypes.models import ContentType;
from eventico import settings
from .models import Booking, BookingItem
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookingSerializer, BookingItemSerializer
from events.models import Event
from events.serializers import LayoutSerializer
from events.services.layout_service import LayoutService
from django.db import transaction


@api_view(['POST'])
@permission_classes([AllowAny])
def skip_and_book(request):

    booking_info = request.data
    event_id = booking_info['event_id']
    selection_info = booking_info['selection_info']
    selected_seats = selection_info['selected_seats']
    lids = selected_seats.keys()
    existing_booking_items_count = BookingItem.objects.filter(lid__in=lids, event=event_id).count()
    # try:
    with transaction.atomic():
        if(existing_booking_items_count > 0):
            success = False;
        else:
            #create booking
            bookingSerializer = BookingSerializer(data={'event': event_id})
            #create booking items
            bookingItemSerializers = []
            for lid in lids:
                bookingItemSerializer = BookingItemSerializer(data={'event': event_id, 'lid': lid})
                if bookingItemSerializer.is_valid():
                    bookingItemSerializer.save()


            event_object = Event.objects.get(id=event_id)
            layouts = event_object.layouts.all()
            layout = None
            if (layouts.count() > 0):
                layout = layouts[0]
                success = LayoutService.block_seats(layout, lids)
            success = bookingSerializer.is_valid()
            if success:
                bookingSerializer.save()
    # except Exception:
    #     success = False
    # import code;
    # code.interact(local=dict(globals(), **locals()))

    if success:
        return Response({}, status=status.HTTP_201_CREATED)
    else:
        return Response({}, status=status.HTTP_400_BAD_REQUEST)