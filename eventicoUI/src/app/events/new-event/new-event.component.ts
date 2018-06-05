import { Component, OnInit } from '@angular/core';
import { EventType } from '../../event-types/shared/event-type.model';
import { EventVenue } from '../../event-venues/shared/event-venue.model';
import { Event } from '../shared/event.model';
import { EventTypeService } from '../../event-types/shared/event-type.service';
import { EventVenueService } from '../../event-venues/shared/event-venue.service';
import { EventService } from '../shared/event.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventLayout } from '../../shared/event-layout.model';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  event : Event;
  showOverlay : string;
  mode : string;
  eventLayout : EventLayout;
  constructor(private eventService : EventService, private router : Router, private eventTypeService : EventTypeService, private eventVenueService : EventVenueService, private route : ActivatedRoute)
  {
    this.mode = "new";
    this.showOverlay = 'none';
    this.route.params.subscribe(params => this.setupEvent(params['id']));
  }

  ngOnInit() {
    this.resetForm();
    this.eventTypeService.loadEventTypes();
    this.eventVenueService.loadEventVenues();
  }

  setupEvent(id)
  {
    console.log(id);
    console.log('-------');
    if(id != null && id != '' && id != "undefined")
    {
      this.mode = "update";
      this.eventService.getEvent(id)
      .subscribe( (data) => {
        var obj = JSON.parse(data.toString());
        this.event = this.eventService.makeEventObject(obj[0]);
        this.eventLayout = this.event.eventLayout;
        this.showOverlay = 'none';
      }
      );
    }
    else
    {
      this.mode = "new";
      this.event = new Event({});
      this.eventLayout = this.event.eventLayout;
      this.showOverlay = 'none';

    }
  }

  updateVenueDetails()
  {
    if(this.event.EventVenueId != null)
    {
      this.showOverlay = 'block';
      this.eventVenueService.getEventVenue(this.event.EventVenueId)
      .subscribe( (data) => {
        var obj = JSON.parse(data.toString());
        var eventVenue = this.eventVenueService.makeEventVenueObject(obj[0]);
        this.eventLayout.import(eventVenue.eventVenueLayout.export());
        this.event.LayoutType = eventVenue.LayoutType;
        this.showOverlay = 'none';
        console.log(this.eventLayout);
      }
      );
    }
  }

  markNA(form : NgForm) : void
  {
    console.log(this.markNAFormData);
    var response = this.eventLayout.markUnavailable(this.markNAFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetMarkNAForm(form);
  }

  resetMarkNAForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.markNAFormData.group_index = -1;
      this.markNAFormData.row_index = -1;
      this.markNAFormData.start_col_index = -1;
      this.markNAFormData.end_col_index = -1;
    }
  }

  updatePrice(form : NgForm) : void
  {
    console.log(this.pricingFormData);
    var response = this.eventLayout.markPricing(this.pricingFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetPricingForm(form);
  }

  resetPricingForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.pricingFormData.group_index = -1;
      this.pricingFormData.row_index = -1;
      this.pricingFormData.start_col_index = -1;
      this.pricingFormData.end_col_index = -1;
    }
  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
      this.event = new Event({});
    }
  }

  onSubmit(form : NgForm) {
    this.showOverlay = 'block';
    this.eventService.createEvent(this.event)
    .subscribe( (data) => {
      this.showOverlay = 'none';
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

  markNAFormData =
  {
    group_index: -1,
    row_index: -1,
    start_col_index: -1,
    end_col_index: -1,
  };

  pricingFormData =
  {
    group_index: -1,
    row_index: -1,
    start_col_index: -1,
    end_col_index: -1,
  };

  get layout_groups(){
    return this.eventLayout.groups;
  }

}

