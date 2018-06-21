from django.contrib.auth import user_logged_in
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
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
@api_view(['GET'])
@permission_classes([AllowAny])
def getUserNames(request):
    names = ["naveen", "algovent", "devops"];
    return JsonResponse(names, status=status.HTTP_200_OK, safe=False);


class CreateUserAPIView(APIView):
    # Allow any user (authenticated or not) to access this url
    permission_classes = (AllowAny,)

    def post(self, request):
        user = request.data
        serializer = UserSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        serializer.instance.set_password(user['password'])
        serializer.instance.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def authenticate_user(request):
    try:
        email = request.data['email']
        password = request.data['password']

        user = User.objects.get(email=email, password=password)
        if user:
            try:
                payload = jwt_payload_handler(user)
                token = jwt.encode(payload, settings.SECRET_KEY)
                user_details = {}
                user_details['name'] = "%s %s" % (
                    user.first_name, user.last_name)
                user_details['token'] = token
                user_logged_in.send(sender=user.__class__,
                                    request=request, user=user)
                return Response(user_details, status=status.HTTP_200_OK)

            except Exception as e:
                raise e
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
    except KeyError:
        res = {'error': 'please provide a email and a password'}
        return Response(res)

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

