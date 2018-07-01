import { Component, OnInit } from '@angular/core';
import { EventVenue } from './shared/event-venue.model';
import { EventVenueService } from './shared/event-venue.service';
import { UserService } from '../event-user/shared/user.service'

@Component({
  selector: 'app-event-venues',
  templateUrl: './event-venues.component.html',
  styleUrls: ['./event-venues.component.css']
})
export class EventVenuesComponent implements OnInit {

  constructor(private eventVenueService : EventVenueService, private userservice : UserService) { }

  ngOnInit() {
    this.eventVenueService.loadEventVenues();
  }

  get eventVenues() : Object{
    return this.eventVenueService.eventVenues;
  }

  get permissions() {
    return this.userservice.user.Permissions;
  }

}

