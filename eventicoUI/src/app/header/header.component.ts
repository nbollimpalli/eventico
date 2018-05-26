import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService } from '../event-user/shared/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, private userservice : UserService ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userservice.updateProfile();
    this.router.navigate(['']);
  }

  get adminToolBar() : Object{
    return this.userservice.user.AdminToolBar;
  }

  get loggedIn()  : Boolean{
    return this.userservice.user.LoggedIn;
  }

}
