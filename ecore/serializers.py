from rest_framework import serializers
from .models import Role, Permission, RolePermission


class RoleSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Role
        fields = ('id', 'name', 'status', 'desc', 'display_name')

class PermissionSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = Permission
        fields = ('id', 'desc', 'display_name', 'status', 'parent_permission', 'root_permission', 'allowed_any')


class RolePermissionSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = RolePermission
        fields = ('id', 'role', 'permission')