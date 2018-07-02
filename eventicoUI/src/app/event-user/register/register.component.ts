import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  user : User;
  passwordPattern : string;
  emailPattern : string;
  constructor(private userservice : UserService, private socialAuthService: AuthService, private router : Router, public snackBar: MatSnackBar) {
    this.user = this.userservice.user;
    this.passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
      this.user.reset();
    }
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

  afterLogin(data)
  {
    localStorage.setItem('userToken', data['data']['user']['token']);
    this.userservice.updateProfile();
    this.router.navigate(['/login']);
  }

  onRegister(form : NgForm) {

    if(this.userservice.user.AgreeTerms != true)
    {
      this.show_snackbar('Please agree terms and conditions in order to signup');
      return;
    }

    if(form.valid != true)
    {
      return;
    }

    this.userservice.registerUser()
    .subscribe(
      (sdata) => {
        this.afterRegister(sdata);
      },
      (fdata) => {
        this.afterRegisterFailure(fdata['error'])
      }
    );
  }

  show_snackbar(message)
  {
    var action = 'OK';
    let snack_bar = this.snackBar.open(message, action, {
      verticalPosition : 'top',
      horizontalPosition: 'right',
    });
  }

  afterRegister(data)
  {
    this.userservice.user.import(data['data']['user']);
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
    this.router.navigate(['']);
  }

  afterRegisterFailure(data)
  {
    this.userservice.user.ProfileUpdationPending = false;
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
  }
}
