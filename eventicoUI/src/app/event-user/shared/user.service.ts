import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = "https://www.eventico.algovent.com";
  user : User;


  constructor(private http : HttpClient) {
    this.user = new User();
  }

  setGuestProfile()
  {
    this.user.LoggedIn = false;
    this.user.FirstName = 'Guest';
    this.user.LastName = 'User';
    this.user.AdminToolBar = {
      'allowed':false,
      'newEvent':false,
      'reports':false,
      'manageUsers': false
    }
    this.user.EventCard = {'allowed' : true, 'edit': false, 'share' : true, 'book' : true}
  }

  registerUser(user : User)
  {
    const body = {
      email : user.Email,
      password : user.Password,
      first_name : user.FirstName,
      last_name : user.LastName
    }
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/users/create/', body,{headers: reqHeaders});
  }

  loginUser(user : User)
  {
    const body = {
      email : user.Email,
      password : user.Password
    }
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/users/api-token-auth/', body, {headers : reqHeaders});
  }

  updateProfile()
  {
    this.setGuestProfile();
    if(localStorage.getItem('userToken') != null)
    {
      this.fetchProfile().subscribe( (data) => {
        this.user.LoggedIn = true;
        this.user.FirstName = 'Naveen';
        this.user.LastName = 'B';
        this.user.AdminToolBar = {
          'allowed':true,
          'newEvent':true,
          'reports':true,
          'manageUsers': true
        }
      }
      );
    }
  }

  fetchProfile()
  {
    var actionUrl = '/users/profile';
    return this.http.get(this.rootUrl+actionUrl);
  }

}
