import { Component, OnInit } from '@angular/core';
import { EventType } from './shared/event-type.model';
import { EventTypeService } from './shared/event-type.service';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.css']
})
export class EventTypesComponent implements OnInit {

  constructor(private eventTypeService : EventTypeService) { }

  ngOnInit() {
    this.eventTypeService.loadEventTypes();
  }

  get eventTypes() : Object{
    return this.eventTypeService.eventTypes;
  }
}
