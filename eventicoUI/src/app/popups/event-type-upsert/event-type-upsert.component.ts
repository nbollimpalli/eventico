import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService } from '../../event-user/shared/user.service';
import { MatSnackBar } from '@angular/material';
import { EventType } from '../../event-types/shared/event-type.model';
import { EventTypeService } from '../../event-types/shared/event-type.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-type-upsert',
  templateUrl: './event-type-upsert.component.html',
  styleUrls: ['./event-type-upsert.component.css']
})

export class EventTypeUpsertComponent implements OnInit{

  eventType : EventType;

  constructor(public dialogRef: MatDialogRef<EventTypeUpsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userservice : UserService, public snackBar: MatSnackBar, private eventTypeService : EventTypeService, private router : Router) {
    this.eventType = this.data['event_type'];
  }


  ngOnInit() {
  }

  upsert_event_type() {
    this.eventTypeService.upsertEventType(this.eventType)
    .subscribe(
      (sdata) => {
        this.afterRequest(sdata);
        this.eventTypeService.loadEventTypes();
        this.dialogRef.close();
      },
      (fdata) => {
        this.afterRequestFailure(fdata['error']);
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

  afterRequest(data)
  {
    this.userservice.user.ProfileUpdationPending = false;
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
  }

  afterRequestFailure(data)
  {
    this.userservice.user.ProfileUpdationPending = false;
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
  }
}

