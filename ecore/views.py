from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import *
# Create your views here.
from .models import Role, RolePermission, Permission
from django.db import transaction
from .serializers import RoleSerializer, PermissionSerializer, RolePermissionSerializer
from ecore.json_response import JsonResponse
from .rm_service import RmService
SUPER_ADMIN = 'super_admin'
DEFAULT = 'default'

@api_view(['POST'])
@permission_classes([AllowAny])
def seed_permissions(request):
    roles = [
        {
            'name' : 'super_admin',
            'display_name' : 'Super Admin',
            'desc' : 'has access for everything',
            'status' : 'active',
            'access_everything' : True
        },
        {
            'name': 'default',
            'display_name': 'Default',
            'desc': 'Normal login used, allowed to only book event tickets',
            'status': 'active',
            'access_everything': False
        }
    ]

    pem_list = [
        {
            0 : 'admin_tool_bar',
            1 : 'Admin Tool Bar',
            2 : 'Allows To Manage Events and reports',
            3 : 'active',
            4 : False
        },
        {
            0: 'more_admin_tools',
            1: 'more Admin Tools',
            2: 'Addition Admin tools like user management and report management',
            3: 'active',
            4: False
        },
        {
            0: 'new_event',
            1: 'New Event',
            2: 'Allows To Create Event',
            3: 'active',
            4: False
        },
        {
            0: 'edit_event',
            1: 'Edit Event',
            2: 'Allows To Edit Event',
            3: 'active',
            4: False
        },
        {
            0: 'event_types',
            1: 'Event Types',
            2: 'Allows To Manage Event Types',
            3: 'active',
            4: False
        },
        {
            0: 'new_event_type',
            1: 'Event Type',
            2: 'Allows To Create Event Type',
            3: 'active',
            4: False
        },
        {
            0: 'edit_event_type',
            1: 'Edit Event Type',
            2: 'Allows To Edit Event Type',
            3: 'active',
            4: False
        },
        {
            0: 'event_venues',
            1: 'Event Venues',
            2: 'Allows To Manage Event Venues',
            3: 'active',
            4: False
        },
        {
            0: 'new_event_venue',
            1: 'New Event Venue',
            2: 'Allows To Create Event Venue',
            3: 'active',
            4: False
        },
        {
            0: 'edit_event_venue',
            1: 'Edit Event Venue',
            2: 'Allows To Edit Event Venue',
            3: 'active',
            4: False
        },
        {
            0: 'user_management',
            1: 'User Management',
            2: 'Allows To Manage Users',
            3: 'active',
            4: False
        },
        {
            0: 'reports',
            1: 'Reports',
            2: 'Allows To Manage Reports',
            3: 'active',
            4: False
        },
        {
            0: 'search_events',
            1: 'Search Events',
            2: 'Allows To Search Events',
            3: 'active',
            4: True
        },
        {
            0: 'search_event_types',
            1: 'Search Event Type',
            2: 'Allows To Search Event Type',
            3: 'active',
            4: False
        },
        {
            0: 'search_event_venues',
            1: 'Search Event venue',
            2: 'Allows To Search Event venue',
            3: 'active',
            4: False
        },
        {
            0: 'list_events',
            1: 'List Events',
            2: 'Allows To List Events',
            3: 'active',
            4: True
        },
        {
            0: 'list_event_types',
            1: 'List Event Type',
            2: 'Allows To List Event Type',
            3: 'active',
            4: False
        },
        {
            0: 'list_event_venues',
            1: 'List Event venue',
            2: 'Allows To List Event venue',
            3: 'active',
            4: False
        },
        {
            0: 'book_event',
            1: 'Book Event',
            2: 'Allows To Book Event Seat',
            3: 'active',
            4: True
        },
        {
            0: 'skip_pay_and_book',
            1: 'Skip Payment And Book',
            2: 'Allows To Skip Payment And Book',
            3: 'active',
            4: False
        }
    ]

    root_parent_pem_mapping = [
        #admin tools
            {'pem' : 'more_admin_tools', 'root_pem' : 'admin_tool_bar', 'parent_pem' : 'admin_tool_bar'},
                {'pem': 'user_management', 'parent_pem': 'more_admin_tools', 'root_pem': 'admin_tool_bar'},
                {'pem': 'reports', 'parent_pem': 'more_admin_tools', 'root_pem': 'admin_tool_bar'},

            {'pem' : 'new_event', 'root_pem' : 'admin_tool_bar', 'parent_pem' : 'admin_tool_bar'},

            {'pem' : 'event_types', 'root_pem' : 'admin_tool_bar', 'parent_pem' : 'admin_tool_bar'},
                {'pem' : 'new_event_type', 'parent_pem' : 'event_types', 'root_pem' : 'admin_tool_bar'},
                {'pem' : 'edit_event_type', 'parent_pem' : 'event_types', 'root_pem' : 'admin_tool_bar'},
                {'pem' : 'list_event_types', 'parent_pem' : 'event_types', 'root_pem' : 'admin_tool_bar'},
                {'pem': 'search_event_types', 'parent_pem': 'event_types', 'root_pem': 'admin_tool_bar'},

            {'pem' : 'event_venues', 'root_pem' : 'admin_tool_bar', 'parent_pem' : 'admin_tool_bar'},
                {'pem' : 'new_event_venue', 'parent_pem' : 'event_venues', 'root_pem' : 'admin_tool_bar'},
                {'pem': 'edit_event_venue', 'parent_pem': 'event_venues', 'root_pem': 'admin_tool_bar'},
                {'pem': 'list_event_venues', 'parent_pem': 'event_venues', 'root_pem': 'admin_tool_bar'},
                {'pem': 'search_event_venues', 'parent_pem': 'event_venues', 'root_pem': 'admin_tool_bar'},

        #list events
            {'pem': 'edit_event', 'root_pem': 'list_events', 'parent_pem': 'list_events'},
            {'pem': 'book_event', 'root_pem': 'list_events', 'parent_pem': 'list_events'},
                {'pem': 'skip_pay_and_book', 'root_pem': 'list_events', 'parent_pem': 'book_event'},
    ]

    with transaction.atomic():
        for r in roles:
            role = Role(name=r['name'], display_name=['display_name'], desc=r['desc'], status=r['status'], access_everything=r['access_everything'] )
            role.save()

        for m in pem_list:
            pem = Permission(name=m[0], display_name=m[1],desc=m[2],status=m[3],allowed_any=m[4])
            pem.save()

        for mapping in root_parent_pem_mapping:
            pem = Permission.objects.get(name=mapping['pem'])
            parent_pem = Permission.objects.get(name=mapping['parent_pem'])
            root_pem = Permission.objects.get(name=mapping['root_pem'])
            pem.root_permission = root_pem
            pem.parent_permission = parent_pem
            pem.save()
    return Response({}, status=status.HTTP_201_CREATED)

def seed_configs():
    configs = [
        {
            'name' : 'FACEBOOK_APP_ID',
            'value' : ''
        },
        {
            'name': 'GOOGLE_AUTH_KEY',
            'value': ''
        },
        {
            'name': '',
            'value': ''
        },
        {
            'name': '',
            'value': ''
        },
        {
            'name': '',
            'value': ''
        },
        {
            'name': '',
            'value': ''
        },
        {
            'name': '',
            'value': ''
        }
    ]
    return Response({}, status=status.HTTP_201_CREATED)

def upsert_role(request):
    return Response({}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_roles(request):
    role_objs = Role.objects.all()
    roles = RoleSerializer(role_objs, many=True).data
    return Response(roles, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upsert_role_permission(request):
    resp = JsonResponse()
    try:
        role_info = request.data
        role_name = role_info.get('name')
        role_id = role_info.get('id')
        if(role_id):
            role = Role.objects.get(id=role_id)
        else:
            role = Role()
        role.display_name = role_name
        modifiedPems = role_info.get('modifiedPems')
        with transaction.atomic():
            role.save()
            update_role_permission(role, modifiedPems)
        role = RoleSerializer(instance=role).data
        role = RmService().fetchRolePermessions([role])[0]
        resp.add_data('role', role)
        resp.add_json_messages(['Successfully Updated Role information'])
    except Exception as e:
        resp.mark_failed(['Unable to update this role information, please contact consent developer'])
    return resp.export()

def update_role_permission(role, permissions):
    if(permissions and role):
        permission_ids = []
        for role_pem in permissions:
            permission_ids.append(role_pem['id'])
        rolePemObjs = RolePermission.objects.filter(permission__in = permission_ids, role = role)
        rolePemObjsIdMap = {}
        for rolePem in rolePemObjs:
            rolePemObjsIdMap[rolePem.permission_id] = rolePem

        for pem in permissions:
            if(pem['enabled'] == True and rolePemObjsIdMap.get(pem['id']) == None):
                rolePem = RolePermission(role=role, permission_id=pem['id'])
                rolePem.save()
            elif(rolePemObjsIdMap.get(pem['id']) != None):
                rolePemObjsIdMap.get(pem['id']).delete()


