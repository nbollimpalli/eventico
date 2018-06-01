import { Component, OnInit } from '@angular/core';
import { EventType } from '../shared/event-type.model';
import { EventTypeService } from '../shared/event-type.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event-type',
  templateUrl: './new-event-type.component.html',
  styleUrls: ['./new-event-type.component.css']
})
export class NewEventTypeComponent implements OnInit {
  eventType : EventType;
  constructor(private eventTypeService : EventTypeService, private router : Router)
  {
    this.eventType = new EventType({});
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
      this.eventType = new EventType({});
    }
  }

  onSubmit(form : NgForm) {
    this.eventTypeService.createEventType(this.eventType)
    .subscribe( (data) => {
      this.resetForm(form);
      this.router.navigate(['']);
    }
    );
  }

}
