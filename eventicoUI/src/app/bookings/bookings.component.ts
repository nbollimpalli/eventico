import { Component, OnInit } from '@angular/core';
import { UserService } from '../event-user/shared/user.service'

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private userservice : UserService) { }

  ngOnInit() {
  }

  get permissions() {
    return this.userservice.user.Permissions;
  }

}
