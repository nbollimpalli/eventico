import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiFactoryService {

  readonly api_map : Map<string, string>;
  readonly rootUrl = environment.api;

  constructor() {
    this.api_map = new Map<string, string>();
    this.load_apis();
  }

  load_apis() {
    //event user services
    this.api_map.set('LOGIN_USER', '/users/api-token-auth/');
    this.api_map.set('REGISTER_USER', '/users/create/');
    this.api_map.set('FETCH_ROLE_PROFILE', '/users/profile');

    //file manager services
    this.api_map.set('UPLOAD_FILE', '/file/upload/');
    this.api_map.set('DELETE_FILE', '/file/delete/');

    //event services
    this.api_map.set('CREATE_EVENT', '/event/create/');
    this.api_map.set('UPSERT_EVENT', '/event/upsert/');
    this.api_map.set('DELETE_EVENT', '/event/delete/');
    this.api_map.set('GET_EVENT', '/event/');
    this.api_map.set('GET_EVENTS', '/events/');

    //event venue services
    this.api_map.set('CREATE_EVENT_VENUE', '/eventvenue/create/');
    this.api_map.set('UPDATE_EVENT_VENUE', '/eventvenue/update/');
    this.api_map.set('DELETE_EVENT_VENUE', '/eventvenue/delete/');
    this.api_map.set('GET_EVENT_VENUE', '/eventvenue/');
    this.api_map.set('GET_EVENT_VENUES', '/eventvenues/');

    //event type services
    this.api_map.set('CREATE_EVENT_TYPE', '/eventtype/create/');
    this.api_map.set('UPDATE_EVENT_TYPE', '/eventtype/update/');
    this.api_map.set('DELETE_EVENT_TYPE', '/eventtype/delete/');
    this.api_map.set('GET_EVENT_TYPE', '/eventtype/');
    this.api_map.set('GET_EVENT_TYPES', '/eventtypes/');

    //layout
    this.api_map.set('UPSERT_LAYOUT', '/layout/upsert/');

    //booking service
    this.api_map.set('SKIP_AND_BOOK', '/bookings/skip-and-book/');

    //manage users apis
    this.api_map.set('GET_USERS', '/users/fetch-users/');
    this.api_map.set('UPDATE_MANAGE_USER', '/users/update-manage-user/');
    this.api_map.set('UPSERT_ROLE', '/ecore/upsert-role/');
  }

  getApi(api_name) : string
  {
    var api = this.api_map.get(api_name);
    if(api == null)
    {
      api = '';
    }
    else
    {
      api = this.rootUrl + this.api_map.get(api_name);
    }
    return api;
  }

}
