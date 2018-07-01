import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService } from '../../event-user/shared/user.service';
import {NgModule} from '@angular/core'

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<BookingConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userservice : UserService) { }

    get permissions() {
      return this.userservice.user.Permissions;
    }
}
