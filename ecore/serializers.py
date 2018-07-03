from rest_framework import serializers
from .models import Role, Permission, RolePermission
from .models import Location

class RoleSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Role
        fields = ('id', 'name', 'status', 'desc', 'display_name', 'access_everything')

class PermissionSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Permission
        fields = ('id', 'desc', 'display_name', 'status', 'parent_permission', 'root_permission', 'allowed_any')


class RolePermissionSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = RolePermission
        fields = ('id', 'role', 'permission')


class LocationSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Location
        fields = ('id', 'name', 'place_id', 'location_url', 'address')