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

//  socialSignIn(form : NgForm) {
//
//    const d = {
//        email: "naveenbollimpalli@gmail.com",
//        id:"10211505693228599",
//        image:"https://graph.facebook.com/10211505693228599/picture?type=normal",
//        name:"Naveen Bollimpalli",
//        provider:"facebook",
//        token:"EAAdUZCbtchnwBAP378q0kZAo3m3Sk5xiHbEEdWpL1c8TfZA1gL8sCrZCU3ldCwnKPNXBSU4CTGkJCZBDWPZAs2zWMRugly5TJsiwwerKhTUGBwxWb9QNxz2vTD7IAvaEOdZCODQBGJAycLFeF0gRIZBZBKpEdrpTRcIFZABmXBj9oamdyb4kikX1mVyoR95rf3h4YFlZAHYyQ32XwZDZD"
//      };
//
//    this.userservice.social_auth_login(d)
//    .subscribe( (data) => {
//        console.log(data)
////      this.afterLogin(data)
//    }
//    );
//  }

  afterLogin(data)
  {
    localStorage.setItem('userToken', data['token']);
    this.userservice.updateProfile();
    this.router.navigate(['']);
  }

}
