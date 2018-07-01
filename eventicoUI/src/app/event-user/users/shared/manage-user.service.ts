import { Injectable } from '@angular/core';
import { RestService } from '../../../shared-services/rest.service';
import { ManageUser } from './manage-user.model';
import { Role } from './role.model';
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private restService : RestService) { }

  fetchUsers()
  {
    var params = {};
    return this.restService.get('GET_USERS', null, params);
  }

  updateManageUser(manageUser : ManageUser)
  {
    var body = {}
    if(manageUser)
    {
      body = manageUser.export();
    }
    return this.restService.post('UPDATE_MANAGE_USER', null, body);
  }

  upsertRole(role : Role)
  {
    var body = {};
    if(role)
    {
      body = role.export();
    }
    return this.restService.post('UPSERT_ROLE', null, body);
  }
}
