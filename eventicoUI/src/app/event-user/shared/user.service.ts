import { Injectable } from '@angular/core';
import { User } from './user.model';
import { RestService } from '../../shared-services/rest.service';

@Injectable()
export class UserService {
  user : User;


  constructor(private restService : RestService) {
    this.user = new User();
  }

  registerUser()
  {
    const body = this.user.export_register_info();
    return this.restService.post( 'REGISTER_USER', null, body );
  }

  loginUser()
  {
    const body = this.user.export_login_info();
    return this.restService.post( 'LOGIN_USER', null, body );

  }

  updateBasicInfo(data)
  {
    if(data)
    {
      this.user.Email = data['email'];
      this.user.Name = data['name'];
      this.user.Mobile = data['mobile'];
      this.user.SendToMailId = data['email'];
      this.user.SendToMobile = data['mobile'];
    }
  }

  updateProfile()
  {
    this.user.ProfileUpdationPending = true;
    this.fetchProfile().subscribe(
      (sdata) => {
        this.user.import(sdata['data']['user']);
      },
      (fdata) => {

      },
      () => {
        this.user.ProfileUpdationPending = false;
      }
    );
  }

  fetchProfile()
  {
    var params = {};
    return this.restService.get('FETCH_USER_PROFILE', null, params);
  }

  social_auth_login(data)
  {
    return this.restService.post('SOCIAL_SIGN_ON', null, data);
  }

  sendForgotPasswordOTP(email : String)
  {
    const body = { 'email' : email };
    return this.restService.post('SEND_OTP', null, body);
  }

  verify_otp(email : String, otp : String)
  {
    const body = { 'email' : email, 'otp' : otp }
    return this.restService.post('VERIFY_OTP', null, body);
  }

  reset_password(token : String, password : String)
  {
    const body = { 'token' : token, 'password' : password}
    return this.restService.post('RESET_PASSWORD', null, body);
  }
}
