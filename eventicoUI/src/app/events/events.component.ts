import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Event } from './shared/event.model';
import { EventService } from './shared/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
   ];
  constructor(private eventService : EventService) { }

  ngOnInit() {
      this.eventService.loadEvents();
  }

  get events() : Object{
    return this.eventService.events;
  }
}
