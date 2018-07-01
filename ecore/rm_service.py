from .models import Permission,RolePermission
from .serializers import PermissionSerializer, RolePermissionSerializer
import copy

class RmService():


    def fetchRolePermessions(self, roles):
        permissions = Permission.objects.all()
        role_permissions = RolePermission.objects.all()
        permissions = PermissionSerializer(permissions, many=True).data
        role_permissions = RolePermissionSerializer(role_permissions, many=True).data
        # root => parent => leaf
        rps = {}
        for rp in role_permissions:
            rps[str(str(rp['role']) + '_' + str(rp['permission']))] = True
        for role in roles:
            role['permissions'] = []
            for permission in permissions:
                pem_clone = copy.copy(permission)
                key = str(role['id']) + '_' + str(permission['id']);
                if (key in rps or pem_clone['allowed_any'] or role['access_everything'] == True):
                    pem_clone['enabled'] = 'checked'
                else:
                    pem_clone['enabled'] = None
                role['permissions'].append(pem_clone)
            role['permissions'] = self.populate_hpems(role['permissions'])
        return roles

    def populate_hpems(self, permissions):
        pem_map = {}
        # assign id to pem map
        for pem in permissions:
            pem_map[pem['id']] = pem

        for pem in permissions:
            if (pem['parent_permission']):
                childs = []
                if ('childs' in pem_map[pem['parent_permission']]):
                    childs = pem_map[pem['parent_permission']]['childs']
                else:
                    pem_map[pem['parent_permission']]['childs'] = childs
                childs.append(pem)
        root_pems = []
        for pem in permissions:
            if (pem['parent_permission'] == None and pem['root_permission'] == None):
                root_pems.append(pem)
        return root_pems