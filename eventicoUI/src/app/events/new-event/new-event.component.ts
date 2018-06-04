import { Component, OnInit } from '@angular/core';
import { EventType } from '../../event-types/shared/event-type.model';
import { EventVenue } from '../../event-venues/shared/event-venue.model';
import { Event } from '../shared/event.model';
import { EventTypeService } from '../../event-types/shared/event-type.service';
import { EventVenueService } from '../../event-venues/shared/event-venue.service';
import { EventService } from '../shared/event.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  event : Event;
  constructor(private eventService : EventService, private router : Router, private eventTypeService : EventTypeService, private eventVenueService : EventVenueService)
  {
    this.event = new Event({});
  }

  ngOnInit() {
    this.resetForm();
    this.eventTypeService.loadEventTypes();
    this.eventVenueService.loadEventVenues();

  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
      this.event = new Event({});
    }
  }

  onSubmit(form : NgForm) {
    this.eventService.createEvent(this.event)
    .subscribe( (data) => {
      this.resetForm(form);
      this.router.navigate(['']);
    }
    );
  }

  get eventTypes() : Object{
    return this.eventTypeService.eventTypes;
  }

  get eventVenues() : Object{
    return this.eventVenueService.eventVenues;
  }

  get layout() : Object{
    return {
      groups: [
        {
          name: "Gold",
          rows: [
            {
              name: "A",
              number: 1,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "B",
              number: 2,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "C",
              number: 3,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "D",
              number: 4,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            }
          ]
        },
        {
          name: "Silver",
          rows: [
            {
              name: "A",
              number: 1,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "B",
              number: 2,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "C",
              number: 3,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "D",
              number: 4,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            }
          ]
        },
        {
          name: "Bronze",
          rows: [
            {
              name: "A",
              number: 1,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "B",
              number: 2,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "C",
              number: 3,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            },
            {
              name: "D",
              number: 4,
              cols: [{number: 1},{number: 2},{number: 3},{number: 4},{number: 0},{number: 5},{number: 6},{number: 7, disabled: true},{number: 8},{number: 9}, {number: 10}]
            }
          ]
        }
      ]
    };
  }

}

