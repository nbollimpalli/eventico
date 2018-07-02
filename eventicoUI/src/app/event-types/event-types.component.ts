import { Component, OnInit } from '@angular/core';
import { EventType } from './shared/event-type.model';
import { EventTypeService } from './shared/event-type.service';
import { UserService } from '../event-user/shared/user.service'
import { MatDialog } from '@angular/material';
import { EventTypeUpsertComponent } from '../popups/event-type-upsert/event-type-upsert.component';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.css']
})
export class EventTypesComponent implements OnInit {

  constructor(private eventTypeService : EventTypeService, private userservice : UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.eventTypeService.loadEventTypes();
  }

  get eventTypes() : Object{
    return this.eventTypeService.eventTypes;
  }

  get permissions() {
    return this.userservice.user.Permissions;
  }



  new_event_type() {
    var eventType = new EventType({});
    const dialogRef = this.dialog.open(EventTypeUpsertComponent, {
      width: '80%',
      data: {'event_type' : eventType}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  edit_event_type(eventType) {
    const dialogRef = this.dialog.open(EventTypeUpsertComponent, {
      width: '80%',
      data: {'event_type' : eventType}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
