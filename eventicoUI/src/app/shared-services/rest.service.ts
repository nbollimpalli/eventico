import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiFactoryService } from './api-factory.service';

@Injectable()
export class RestService {

  constructor(private http : HttpClient, private apiFactory : ApiFactoryService) { }

  get(api_name : string, bypass_auth : boolean, headers, params)
  {
    var get_headers;
    if(bypass_auth == true)
    {
      get_headers = new HttpHeaders({'No-Auth' : 'True'});
    }
    else
    {
      get_headers = new HttpHeaders({});
    }
    return this.http.get(this.apiFactory.getApi(api_name),{params: params, headers: get_headers});
  }

  post(api_name : string, bypass_auth : boolean, headers, body)
  {
    var post_headers;
    if(bypass_auth == true)
    {
      post_headers = new HttpHeaders({'No-Auth' : 'True'});
    }
    else
    {
      post_headers = new HttpHeaders({});
    }
//    const req = new HttpRequest('POST', this.apiFactory.getApi(api_name), body, {
//        headers: post_headers
//      });
//    return this.http.request(req);
    return this.http.post(this.apiFactory.getApi(api_name), body,{headers: post_headers});
  }


}
