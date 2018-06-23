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
            #send otp
            otp = randint(111111, 999999)
            user = request.data
            serializer = UserSerializer(data=user)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            serializer.instance.set_password(user['password'])
            serializer.instance.otp = otp
            # serializer.instance.otp_created_at = ''
            # serializer.instance.otp_expires_At = ''
            # serializer.instance.otp_limit_start_time = ''
            # serializer.instance.otp_limit_end_time = ''
            # otp_sent = 1
            serializer.instance.save()
        except UserException as e:
            resp.mark_failed([str(e)])
        except Exception as e:
            resp.mark_failed([JsonResponse.GENRIC_MESSAGE])
        return resp.export()


@api_view(['POST'])
@permission_classes([AllowAny])
def authenticate_user(request):
    resp = JsonResponse()
    try:
        email = request.data['email']
        password = request.data['password']

        user = User.objects.get(email=email, password=password)
        if user:
            try:
                payload = jwt_payload_handler(user)
                token = jwt.encode(payload, settings.SECRET_KEY)
                user_details = {}
                user_details['name'] = user.name
                user_details['token'] = token
                user_logged_in.send(sender=user.__class__,
                                    request=request, user=user)
                resp.add_data('user', user_details)
                resp.add_json_messages(['user successfully logged in'])
                return Response(resp.export(), status=status.HTTP_200_OK)

            except Exception as e:
                raise e
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
    except KeyError:
        res = {'error': 'please provide a email and a password'}
        return Response(res)

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
            user_details = {}
            user_details['name'] = user.name
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
        fields['token'] = social_info['token']
    elif (social_info['provider'] == 'google'):
        url = GOOGLE_VALIDATE_URL
        fields['id_token'] = social_info['idToken']

    res = rm.get(fields, url)
    if(email == res['email']):
        valid = True

    return valid

@api_view(['GET'])
@permission_classes([AllowAny])
def fetchDefaultProfile(request):
    res = {'FirstName':'Guest','LastName':'User','Email':'', 'AdminToolBar' : {'allowed': False}, 'EventCard' : {'allowed' : True, 'edit': False, 'share' : True, 'book' : True}};
    return  Response(res)

@api_view(['GET'])
@permission_classes([AllowAny])
def fetchProfile(request):
    res = {'AdminToolBar' : False}
    return  Response(res)

@api_view(['GET'])
@permission_classes([AllowAny])
def fetchUsers(request):
    users = User.objects.all()
    roles = Role.objects.all()
    users = UserSerializer(users, many=True).data
    roles = RoleSerializer(roles, many=True).data
    permissions = Permission.objects.all()
    role_permissions = RolePermission.objects.all()
    permissions = PermissionSerializer(permissions, many=True).data
    role_permissions = RolePermissionSerializer(role_permissions, many=True).data
    # root => parent => leaf
    rps = {}
    for rp in role_permissions:
        rps[str(str(rp['role'])+'_'+str(rp['permission']))] = True
    for role in roles:
        role['permissions'] = []
        for permission in permissions:
            pem_clone = copy.copy(permission)
            if( str(role['id']) + '_' + str(permission['id'])):
                pem_clone['enabled'] = True
            else:
                pem_clone['enabled'] = False
            role['permissions'].append(pem_clone)
        role['permissions'] = populate_hpems(role['permissions'])
    res = {'users' : users, 'roles' : roles}
    return  Response(res)

@api_view(['POST'])
@permission_classes([AllowAny])
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
def verify_user_via_email_otp():
    resp = JsonResponse()
    return resp

def populate_hpems(permissions):
    pem_map = {}
    #assign id to pem map
    for pem in permissions:
        pem_map[pem['id']] = pem

    for pem in permissions:
        if(pem['parent_permission']):
            childs = []
            if(' childs' in pem_map[pem['parent_permission']]):
                childs = pem_map[pem['parent_permission']]['childs']
            else:
                pem_map[pem['parent_permission']]['childs'] = childs
            childs.append(pem)
    root_pems = []
    for pem in permissions:
        if(pem['parent_permission'] == None and pem['root_permission'] == None):
            root_pems.append(pem)
    return root_pems

class UserException(Exception):
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors