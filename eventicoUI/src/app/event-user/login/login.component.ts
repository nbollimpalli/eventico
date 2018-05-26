import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user : User;
  passwordPattern : string;
  emailPattern : string;

  constructor(private userservice : UserService, private toastr : ToastrService, private router : Router) {
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

  onLogin(form : NgForm) {
    this.userservice.loginUser(form.value)
    .subscribe( (data) => {
      this.resetForm(form);
      localStorage.setItem('userToken', data['token']);
      this.userservice.updateProfile();
      this.router.navigate(['']);
    }
    );
  }

}
