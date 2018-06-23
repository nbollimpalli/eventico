import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User;
  passwordPattern : string;
  emailPattern : string;
  constructor(private userservice : UserService, private toastr : ToastrService, private socialAuthService: AuthService) {
    this.user = new User();
    this.passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
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
        // Now sign-in with userData
        // ...

      }
    );
  }

  onRegister(form : NgForm) {
    this.userservice.registerUser(form.value)
    .subscribe( (data) => {
      this.resetForm(form);
      this.toastr.success('User registration is successful');
    }
    );
  }

}
