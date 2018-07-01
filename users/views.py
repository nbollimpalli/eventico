from django.contrib.auth import user_logged_in
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from random import randint
from ecore.rest_manager import RestManager
from ecore.service_urls import FACEBOOK_VALIDATE_URL, GOOGLE_VALIDATE_URL
from rest_framework.decorators import *
import copy
from eventico import settings
from .models import User
# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from users.serializers import UserSerializer
import jwt
from django.http import JsonResponse
from rest_framework_jwt.settings import api_settings
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
from ecore.models import Role, Permission, RolePermission
from ecore.serializers import RoleSerializer, PermissionSerializer, RolePermissionSerializer
from ecore.json_response import JsonResponse
from ecore.rm_service import RmService
from ecore.constants import *
from ecore.mail_service import MailService,send_async_mail
from django.db import transaction
from ecore.urls_service import ecore_reverse
import datetime
import uuid
import pytz

@api_view(['GET'])
@permission_classes([AllowAny])
def getUserNames(request):
    names = ["naveen", "algovent", "devops"];
    return JsonResponse(names, status=status.HTTP_200_OK, safe=False);


class CreateUserAPIView(APIView):
    # Allow any user (authenticated or not) to access this url
    permission_classes = (AllowAny,)

    def post(self, request):
        resp = JsonResponse()
        try:
            with transaction.atomic():
                user = request.data
                email = user['email']
                try:
                    user_instance = User.objects.get(email=email)
                    if(user_instance != None):
                        raise UserException('User already exists, please try logging in or Signon via social login', None)
                except UserException as e:
                    raise e
                except Exception as e:
                    print('new user')

                serializer = UserSerializer(data=user)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                user_instance = serializer.instance
                user_instance.set_password(user['password'])
                msInput = {'template_key' : 'SIGNUP', 'to_email' : [user_instance.email], 'subject' : 'Your account has been successfully created.', 'context' : {'name' : user_instance.name, 'verify_url' : ecore_reverse('users:verify_user', params={'token' : user_instance.verification_token}, reverse_complete_url=True, request=request) } }
                send_async_mail(msInput)
                user_instance.save()
                user_details = fetchUserProfile(user_instance)
                resp.add_data('user', user_details)
                resp.add_json_messages(['Registration successful, please verify your account through the confirmation mail sent to your email'])
        except UserException as e:
            resp.mark_failed([str(e)])
        except Exception as e:
            print(e)
            resp.mark_failed([JsonResponse.GENRIC_MESSAGE])
        return resp.export()


@api_view(['POST'])
@permission_classes([AllowAny])
def authenticate_user(request):
    resp = JsonResponse()
    try:
        email = request.data['email']
        password = request.data['password']
        try:
            user = User.objects.get(email=email)
        except:
            raise UserException('Please signup or login via your social accounts.',None)

        if(user.status == 'pending'):
            raise UserException('Please Verify your account through the welcome mail, Welcome mail lost? click on resend welcome mail to get it one more time.',None)
        elif(user.status == 'blocked'):
            raise UserException('This account has been temporarily suspended due to suspicious activity, Please contact support center',None)
        elif(user.status == 'invited'):
            raise UserException('Please signup with us or continue with our social login',None)

        if user and user.check_password(password):
            payload = jwt_payload_handler(user)
            token = jwt.encode(payload, settings.SECRET_KEY)
            user_logged_in.send(sender=user.__class__,
                                request=request, user=user)
            user_details = fetchUserProfile(user)
            user_details['token'] = token
            resp.add_data('user', user_details)
            resp.add_json_messages(['Successfully Logged In'])

        else:
            raise UserException('can not authenticate with the given credentials or the account has been deactivated', None)
    except KeyError:
        resp.mark_failed(['Invalid email or  password'])
    except UserException as ue:
        resp.mark_failed([str(ue)])
    except Exception as e:
        resp.mark_failed(['Unable to login, Please try again later'])

    return resp.export()

@api_view(['POST'])
@permission_classes([AllowAny])
def social_signon(request):
    resp = JsonResponse()
    try:
        social_info = request.data
        valid_info = verify_social_info(social_info)
        email = social_info.get('email')
        if(valid_info):
            user = None
            if(User.objects.filter(email=email).exists()):
                print('user already exists')
                user = User.objects.get(email=email)
            else:
                print('user doesnt exists , creating new user')
                user = User()
                user.name = social_info['name']
                user.email = social_info['email']
                user.set_unusable_password()

            user.status = 'active'
            if (social_info['provider'] == 'facebook'):
                user.fb_verified = True
                user.fb_pic = social_info['image']
            elif (social_info['provider'] == 'google'):
                user.google_verified = True
                user.google_pic = social_info['image']
            user.save()
            payload = jwt_payload_handler(user)
            token = jwt.encode(payload, settings.SECRET_KEY)
            user_details = fetchUserProfile(user)
            user_details['token'] = token

            user_logged_in.send(sender=user.__class__,
                                request=request, user=user)
            resp.add_data('user', user_details)
            resp.add_json_messages(['user successfully logged in'])
        else:
            raise UserException('Invalid Token, Please try again later')
    except Exception as e:
        resp.mark_failed([str(e)])

    return resp.export()


def verify_social_info(social_info):
    rm = RestManager()
    valid = False
    email = social_info['email'];
    url = None
    fields = {}
    if (social_info['provider'] == 'facebook'):
        url = FACEBOOK_VALIDATE_URL
        fields['fields'] = 'email'
        fields['access_token'] = social_info['token']
    elif (social_info['provider'] == 'google'):
        url = GOOGLE_VALIDATE_URL
        fields['id_token'] = social_info['idToken']

    res = rm.get(fields, url)
    if(email == res['email']):
        valid = True

    return valid

@api_view(['GET'])
@permission_classes([AllowAny])
def fetchProfile(request):
    resp = JsonResponse()
    try:
        if(request.user.is_anonymous):
            resp.add_data('user', fetchAnonymousUserProfile())
        else:
            resp.add_data('user', fetchUserProfile(request.user))
    except Exception as e:
        resp.mark_failed([DEFAULT_ERROR_MSG])
    return  resp.export()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetchUsers(request):
    users = User.objects.all()
    roles = Role.objects.all()
    users = UserSerializer(users, many=True).data
    roles = RoleSerializer(roles, many=True).data
    roles = RmService().fetchRolePermessions(roles)
    res = {'users' : users, 'roles' : roles}
    return  Response(res)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateManageUsers(request):
    manage_user_info = request.data
    user_id = manage_user_info.get('id')
    role_id = manage_user_info.get('role')
    user = User.objects.get(id=user_id)
    role = Role.objects.get(id = role_id)
    user.role = role
    user.save()
    return  Response({'success' : True})

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_user_via_email_otp():
    resp = JsonResponse()
    return resp

@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    resp = JsonResponse()
    try:
        data = request.data
        email = data['email']
        try:
            user = User.objects.get(email=email)
        except Exception as e:
            raise UserException('The email Id you provided is not registered with, please register.')
        if(user):
            otp = randint(111111, 999999)
            user.otp = otp
            now = datetime.datetime.now()
            user.otp_created_at = now
            user.otp_expires_at = now + datetime.timedelta(minutes = 15)
            user.save()
            msInput = {'template_key': 'FORGOT_PWD_OTP', 'to_email': [user.email],
                       'subject': 'OTP to reset your password, This will be valid for next 15 minutes.', 'context': {'otp':otp, 'name' : user.name}}
            send_async_mail(msInput)
            resp.add_json_messages(['OTP has been successfully sent your Email Id.'])
        else:
            raise UserException('The email Id you provided is not registered with, please register.')
    except KeyError:
        resp.mark_failed(['Invalid email'])
    except UserException as ue:
        resp.mark_failed([str(ue)])
    except Exception as e:
        resp.mark_failed(['Unable to process this request, Please try again later'])
    return resp.export()

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    resp = JsonResponse()
    try:
        data = request.data
        email = data['email']
        otp = data['otp']
        try:
            user = User.objects.get(email=email)
        except Exception as e:
            raise UserException('The email Id you provided is not registered with, please register.')

        if(user):
            user_otp = user.otp
            utc = pytz.UTC
            now = utc.localize(datetime.datetime.now())
            expires_at = user.otp_expires_at
            if(now > expires_at):
                raise UserException('OTP has expired, please try again')
            if (otp == user_otp):
                user.verification_token = uuid.uuid4()
            else:
                raise UserException('Please Enter a valid OTP')
            user.save()
            resp.add_data('token', user.verification_token)
            resp.add_json_messages(['OTP verified successfully.'])
        else:
            raise UserException('The email Id you provided is not registered with, please register.')
    except KeyError:
        resp.mark_failed(['Invalid email or OTP'])
    except UserException as ue:
        resp.mark_failed([str(ue)])
    except Exception as e:
        resp.mark_failed(['Unable to process this request, Please try again later'])
    return resp.export()

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    resp = JsonResponse()
    try:
        data = request.data
        token = data['token']
        password = data['password']
        try:
            user = User.objects.get(verification_token=token)
        except Exception as e:
            user = None

        if(user):
            user.set_password(password)
            utc = pytz.UTC
            now = utc.localize(datetime.datetime.now())
            expires_at = user.otp_expires_at
            if(now > expires_at):
                raise UserException('TOKEN has expired, please try again')
            user.save()
            resp.add_json_messages(['Password reset successfully.'])
        else:
            raise UserException('Invalid Token, Please try again.')
    except KeyError:
        resp.mark_failed(['Invalid Password'])
    except UserException as ue:
        resp.mark_failed([str(ue)])
    except Exception as e:
        resp.mark_failed(['Unable to process this request, Please try again later'])
    return resp.export()


@api_view(['GET'])
@permission_classes([AllowAny])
def verifyUser(request):
    verification_token = request.GET.get('token')
    print(verification_token)
    try:
        user = User.objects.get(verification_token=verification_token)
    except:
        user = None
    login_url = request.build_absolute_uri('/') + '#/login'
    print(user)
    if(user):
        if(user.status == 'active'):
            return render_to_response('user_verify_success.html', { 'message' : 'This account has been already verified' , 'login_url' : login_url})
        elif(user.status == 'pending'):
            try:
                user.status = 'active'
                user.save()
            except:
                return render_to_response('user_verify_failure.html', {'message' : 'We are not able to verify your account at this point of time, please contact our customer service for further information'})
            return render_to_response('user_verify_success.html', { 'message' : 'Your account has been successfully verified.' , 'login_url' : login_url})
        else:
            return render_to_response('user_verify_failure.html', {'message': 'Due to suspicious activity, we are holding on the process  of verification for this account, Please contact our support centre.'})
    else:
        return render_to_response('user_verify_failure.html', {'message': 'This verification link has been expired, click on rensend verification link from login page'})


@api_view(['GET'])
@permission_classes([AllowAny])
def terms_and_conditions(request):
    return render_to_response('terms_and_conditions.html')

def fetchAnonymousUserProfile():
    permissions = Permission.objects.all()
    pemDict = {}
    for pem in permissions:
        pemDict[pem.name] = pem.allowed_any
    return {'anonymous': True, 'permissions':  pemDict, 'logged_in': False, 'name': '', 'email': '', 'mobile': ''}

def fetchUserProfile(user):
    permissions = Permission.objects.all()
    pemDict = {}
    role_permissions = RolePermission.objects.filter(role=user.role)
    rp_ids = []
    for rp in role_permissions:
        rp_ids.append(rp.permission_id)

    for pem in permissions:
        pemDict[pem.name] = (user.role.access_everything or pem.allowed_any == True or (pem.id in rp_ids) )
    user_json = UserSerializer(instance=user).data
    user_json['anonymous'] = False
    user_json['permissions'] = pemDict
    if(user.status == 'active'):
        user_json['logged_in'] = True
    else:
        user_json['logged_in'] = False
    return user_json


class UserException(Exception):
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors