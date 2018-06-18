import { Component, OnInit } from '@angular/core';
import { Event } from '../../events/shared/event.model';
import { Booking } from '../shared/booking.model';
import { BookingService } from '../shared/booking.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../events/shared/event.service';
import { BookingLayout } from '../../shared/booking-layout.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  mode : string;
  booking : Booking;
  event : Event;
  bookingLayout : BookingLayout;
  constructor(private bookingService : BookingService, private eventService : EventService, private router : Router, private route : ActivatedRoute)
  {
    this.route.params.subscribe(params => this.setupBooking(params['event_id'], params['id']));
  }

  ngOnInit() {
  }

  setupBooking(event_id, booking_id)
  {
    if(booking_id)
    {
      this.mode = 'edit';
    }
    else
    {
      this.mode = 'new';
      this.setupNewBooking(event_id);
    }
  }

  setupNewBooking(event_id)
  {
    this.booking = new Booking(this.mode)
    this.bookingLayout = this.booking.bookingLayout;
    this.event = this.booking.event;
    if(event_id != null && event_id != "undefined")
    {
      this.eventService.getEvent(event_id)
      .subscribe( (data) => {
        this.booking.import(data);
      }
      );
    }
  }

  skipAndBook()
  {
    this.bookingService.skipAndBook(this.booking)
    .subscribe( (data) => {
      alert('booking made success');
      this.router.navigate(['']);
    }
    );

  }

  get layout_groups(){
    return this.bookingLayout.groups;
  }

}
