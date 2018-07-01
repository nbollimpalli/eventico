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
import hashlib
from django.template import Context, Template,RequestContext
from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from ecore.config import *
from ecore.constants import *
from users.models import User
from ecore.json_response import JsonResponse
from ecore.payment_service import PaymentService
@api_view(['POST'])
@permission_classes([AllowAny])
def book(request):
    resp = JsonResponse()
    payment_service = PaymentService()
    try:

        booking_info = request.data['booking']
        user_info = request.data['user']
        event_id = booking_info['event_id']
        selection_info = booking_info['selection_info']
        selected_seats = selection_info['selected_seats']
        lids = selected_seats.keys()
        existing_booking_items_count = BookingItem.objects.filter(lid__in=lids, event=event_id).count()
        email = user_info['send_to_email']
        mobile = user_info['send_to_mobile']
        user = User.objects.get(email=email)
        skip_and_book = False;
        with transaction.atomic():
            if (user == None):
                user = User()
                user.name = email.split('@')[0]
                user.email = email
                user.set_unusable_password()
                user.save()


            if(existing_booking_items_count > 0):
                success = False;
                resp.mark_failed(['one or more seats present in the booking are already taken, please try again with the updated booking status'])
            else:
                event_object = Event.objects.get(id=event_id)
                layouts = event_object.layouts.all()
                layout = None
                if (layouts.count() > 0):
                    layout = layouts[0]
                    success = LayoutService.block_seats(layout, lids)

                total = LayoutService.fetch_total(layout, lids)
                bookingSerializer = BookingSerializer(data={'event': event_id, 'user': user.id, 'send_to_email': email, 'send_to_mobile': mobile, 'total': total})
                for lid in lids:
                    bookingItemSerializer = BookingItemSerializer(data={'event': event_id, 'lid': lid})
                    if bookingItemSerializer.is_valid():
                        bookingItemSerializer.save()

                success = bookingSerializer.is_valid()
                if success:
                    bookingSerializer.save()
                    booking = bookingSerializer.instance
                    mode = 'cash' if skip_and_book else 'payu'
                    input_info = {'type' : 'charge', 'mode' : mode, 'productinfo' : event_object.name, 'name' : user.name.split(' ')[0], 'email' : booking.send_to_email, 'phone': booking.send_to_mobile}
                    payment_info = payment_service.create_new_payment(bookingSerializer.instance, input_info)
                    resp.add_data('payment_gateway_info', payment_info)
                    if skip_and_book:
                        resp.add_json_messages(['Your booking has been successfully created, will be redirecting you to the payment'])
                    else:
                        resp.add_json_messages(['Your booking has been successfully created'])

    except Exception as e:
        resp.mark_failed(['Sorry, Cannot process your booking at this point of time, please try again later.'])
        print(str(e))
    print(resp.json_data)
    return resp.export()

@csrf_protect
@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def pay(request):
    payment_info = request.data
    objId = payment_info['objectId']
    model = payment_info['model']
    app_label = payment_info['app_label']
    contentType = ContentType.objects.get(app_label=app_label, model=model)
    kclass = contentType.model_class()
    kclass_instance = kclass.objects.get(id=objId)

    #make mobile number as mandatory
    #get total amount from the object
    #create a payment transaction
    #check if its successful or failure
    #if success show a pop up , and on click of ok redirect to mail page
    #product_info from the booking table
    #source url should be payment success or failure location and based on that we should display error or success popup and there should be a param with success or failure to know if its successful or failure
    #
    posted = {}
    posted['amount'] = float(10)
    posted['productinfo'] = 'p1'
    posted['firstname'] = 'naveen'
    posted['email'] = 'naveenbollimpalli@gmail.com'
    posted['phone'] = '9663663836'
    posted['surl'] = 'http://127.0.0.1:8000/bookings/success/'
    posted['furl'] = 'http://127.0.0.1:8000/bookings/failure/'
    hash_object = hashlib.sha256(b'randint(0,30)')
    txnid = hash_object.hexdigest()[0:30]
    hashh = ''
    posted['txnid'] = txnid
    hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10"
    posted['key'] = KEY
    hash_string = ''
    hashVarsSeq = hashSequence.split('|')
    for i in hashVarsSeq:
        print(i)
        try:
            hash_string += str(posted[i])
        except Exception:
            hash_string += ''
        hash_string += '|'
    hash_string += SALT
    print(hash_string)
    hash_string = hash_string.encode('utf-8')
    hashh = hashlib.sha512(hash_string).hexdigest().lower()
    if (posted.get("key") != None and posted.get("txnid") != None and posted.get("productinfo") != None and posted.get(
            "firstname") != None and posted.get("email") != None):
        return render_to_response('current_datetime.html', {"posted": posted, "hashh": hashh,
                                                                                    "MERCHANT_KEY": KEY,
                                                                                    "txnid": txnid,
                                                                                    "hash_string": hash_string,
                                                                                    "action": PAYMENT_URL_LIVE})
    else:
        return render_to_response('current_datetime.html', {"posted": posted, "hashh": hashh,
                                                                                    "MERCHANT_KEY": KEY,
                                                                                    "txnid": txnid,
                                                                                    "hash_string": hash_string,
                                                                                    "action": PAYMENT_URL_LIVE})


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def success(request):
    return render_to_response('success.html')

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def failure(request):
    return render_to_response('failure.html')