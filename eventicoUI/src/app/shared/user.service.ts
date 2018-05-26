import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = "http://127.0.0.1:8000";
  constructor(private http : HttpClient) {

  }

  registerUser(user : User)
  {
    const body = {
      email : user.Email,
      password : user.Password,
      first_name : user.FirstName,
      last_name : user.LastName
    }
    return this.http.post(this.rootUrl+'/users/create/', body);
  }

  loginUser(user : User)
  {
    const body = {
      email : user.Email,
      password : user.Password
    }

    return this.http.post(this.rootUrl+'/users/api-token-auth/', body);
  }

}
