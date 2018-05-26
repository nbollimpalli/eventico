import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user : User;
  passwordPattern : string;
  emailPattern : string;

  constructor(private userservice : UserService, private toastr : ToastrService) {
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
        Password: ''
      }
    }
  }

  onLogin(form : NgForm) {
    this.userservice.loginUser(form.value)
    .subscribe( (data) => {
      this.resetForm(form);
      this.toastr.success('User Login is successful');
    }
    );
  }

}
