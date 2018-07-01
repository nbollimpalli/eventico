import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ForgotPasswordComponent } from '../../popups/forgot-password/forgot-password.component';

import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user : User;
  passwordPattern : string;
  emailPattern : string;
  loading = false;

  constructor(private userservice : UserService, private toastr : ToastrService, private router : Router, private socialAuthService: AuthService, public snackBar: MatSnackBar, public dialog: MatDialog,) {
    this.user = userservice.user;
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
      this.user.reset();
    }
  }

  onLogin(form : NgForm) {
    if(form.valid != true)
    {
      return;
    }
    this.userservice.loginUser()
    .subscribe(
      (sdata) => {
        this.afterLogin(sdata);
      },
      (fdata) => {
        this.afterLoginFailure(fdata['error']);
      },
    );
  }

  afterLogin(data)
  {
    localStorage.setItem('userToken', data['data']['user']['token']);
    this.userservice.user.import(data['data']['user']);
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
    this.router.navigate(['']);
  }

  afterLoginFailure(data)
  {
    this.userservice.user.ProfileUpdationPending = false;
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
  }

  show_snackbar(message)
  {
    var action = 'OK';
    let snack_bar = this.snackBar.open(message, action, {
      verticalPosition : 'top',
      horizontalPosition: 'right',
    });
  }

  forgot_password()
  {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '80%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result == 'success')
        {
          this.show_snackbar('Password reset successful');
        }
    });
  }

}
