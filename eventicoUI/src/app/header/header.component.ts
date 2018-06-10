import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService } from '../event-user/shared/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageUrlArray = ['https://s3.ap-south-1.amazonaws.com/algoventimagestore/TOTT_Logo_New.png'];
  constructor(private router : Router, private userservice : UserService ) { }

  ngOnInit() {
    this.userservice.updateProfile();
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
