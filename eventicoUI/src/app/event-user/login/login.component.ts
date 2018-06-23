import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user : User;
  passwordPattern : string;
  emailPattern : string;

  constructor(private userservice : UserService, private toastr : ToastrService, private router : Router, private socialAuthService: AuthService) {
    this.user = new User();
    this.passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.userservice.social_auth_login(userData)
        .subscribe( (data) => {
          this.afterLogin(data)
        }
        );
      }
    );
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
      this.user = {
        Email: '',
        FirstName: '',
        LastName: '',
        Mobile: '',
        Password: '',
        AdminToolBar: null,
        EventCard: null,
        LoggedIn: null
      }
    }
  }

  onLogin(form : NgForm) {
    this.userservice.loginUser(form.value)
    .subscribe( (data) => {
      this.afterLogin(data)
    }
    );
  }

  afterLogin(data)
  {
    localStorage.setItem('userToken', data['data']['user']['token']);
    this.userservice.updateProfile();
    this.router.navigate(['']);
  }

}
