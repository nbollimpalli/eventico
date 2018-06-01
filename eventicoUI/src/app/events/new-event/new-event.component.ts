import { Component, OnInit } from '@angular/core';
import { EventType } from '../../event-types/shared/event-type.model';
import { Event } from '../shared/event.model';
import { EventTypeService } from '../../event-types/shared/event-type.service';
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
  constructor(private eventService : EventService, private router : Router, private eventTypeService : EventTypeService)
  {
    this.event = new Event({});
  }

  ngOnInit() {
    this.resetForm();
    this.eventTypeService.loadEventTypes();
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

}

