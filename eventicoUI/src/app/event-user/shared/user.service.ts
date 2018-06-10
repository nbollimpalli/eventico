import { Injectable } from '@angular/core';
import { User } from './user.model';
import { RestService } from '../../shared-services/rest.service';

@Injectable()
export class UserService {
  user : User;


  constructor(private restService : RestService) {
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
    return this.restService.post( 'REGISTER_USER', true, null, body );
  }

  loginUser(user : User)
  {
    const body = {
      email : user.Email,
      password : user.Password
    }
    return this.restService.post( 'LOGIN_USER', true, null, body );

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
    var params = {};
    return this.restService.get('FETCH_ROLE_PROFILE', false, null, params);
  }

}
