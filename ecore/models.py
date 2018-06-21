from django.db import models

#Default
class Role(models.Model):
    display_name = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    created_on = models.DateTimeField(auto_now_add=True)
    access_everything = models.BooleanField(default=False)

class Permission(models.Model):
    display_name = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=255, default='pending')
    parent_permission = models.ForeignKey('Permission', on_delete=models.CASCADE, null=True, blank=True, related_name='permission_parent')
    root_permission = models.ForeignKey('Permission', on_delete=models.CASCADE, null=True, blank=True, related_name='permission_root')
    allowed_any = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, null=True, blank=True)

