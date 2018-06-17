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
import { FileManagerService } from '../../shared-services/file-manager.service';

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
  color : string;
  defaultPrice : Object;
  banner: File = null;
  enddatetime: boolean;
  minDate : Date;
  endMinDate : Date;
  constructor(private eventService : EventService, private router : Router, private eventTypeService : EventTypeService, private eventVenueService : EventVenueService, private route : ActivatedRoute, private fileManager : FileManagerService)
  {
    this.color = '#ffffff';
    this.mode = "new";
    this.showOverlay = 'none';
    this.enddatetime = true;
    this.route.params.subscribe(params => this.setupEvent(params['id']));
    this.minDate = new Date();
  }

  ngOnInit() {
    this.resetForm();

  }

  handleFileInput(files: FileList) {
    console.log('file uploaded');

    this.banner = files.item(0);
    this.showOverlay = 'block';
    this.updateEventBanner()
  }

  updateEventBanner()
  {
    if(this.event.Id != null && this.event.Id != undefined)
    {
      var options = {
        objectId: this.event.Id,
        model: 'event',
        app_label: 'events',
        file_type: 'event_banner',
      }
      this.fileManager.upload(this.banner, options).subscribe(data => {
          console.log(data);
          this.event.images['banner'].url = data["upload"];
          this.showOverlay = 'none';
        }, error => {
          console.log(error);
        });
    }
    else
    {
      alert('please create event before uloading the banner');
    }

  }

  setupEvent(id)
  {
    this.eventTypeService.loadEventTypes();
    this.eventVenueService.loadEventVenues();

    this.mode = "new";
    this.event = new Event({}, this.mode);
    this.eventLayout = this.event.eventLayout;
    this.defaultPrice = this.eventLayout.getDefaultPrice();

    if(id != null && id != '' && id != "undefined")
    {
      this.mode = "update";
      this.eventService.getEvent(id)
      .subscribe( (data) => {
        this.mode = 'edit';
        this.eventService.updateEventInfo(data, this.event);
        this.showOverlay = 'none';
        console.log(this.event);
      }
      );
    }
    else
    {
      this.showOverlay = 'none';
    }
  }

  upsertEvent()
  {

    if(this.event == null)
    {
      alert('Invalid Event');
    }
    else if(this.event.Name == null || this.event.Name == undefined || this.event.Name == '')
    {
      alert('Event name cannot be empty');
    }
    else if(this.defaultPrice['value'] == null || this.defaultPrice['value'] == undefined || this.defaultPrice['value'] <= 0)
    {
      alert('default price of the event must greater than 0');
    }
    else if(this.defaultPrice['label'] == null || this.defaultPrice['label'] == undefined || this.defaultPrice['label'] == '')
    {
      alert('Label of the default price cannot be empty');
    }
    else if(this.event.Desc == null || this.event.Desc == undefined || this.event.Desc == '')
    {
      alert('Event description cannot be empty');
    }
    else if(this.event.EventTypeId == null || this.event.EventTypeId == undefined)
    {
      alert('Event type cannot be empty');
    }
    else if(this.event.EventVenueId == null || this.event.EventVenueId == undefined)
    {
      alert('Event Venue cannot be empty');
    }
    this.eventService.upsertEvent(this.event)
    .subscribe( (data) => {
       var event_info = data['event'];
       event_info['layout'] = data['layout'];
       this.event.mode = 'edit';
       this.event.import(event_info);
     }
    );
  }

  upsertLayout()
  {
    this.eventService.upsertEventLayout(this.event)
    .subscribe( (data) => {
      this.router.navigate(['']);
    }
    );
  }

//  updateVenueDetails()
//  {
//    if(this.event.EventVenueId != null)
//    {
//      this.showOverlay = 'block';
//      this.eventVenueService.getEventVenue(this.event.EventVenueId)
//      .subscribe( (data) => {
//        var obj = JSON.parse(data.toString());
//        var eventVenue = this.eventVenueService.makeEventVenueObject(obj[0]);
//        this.eventLayout.import(eventVenue.eventVenueLayout.export());
//        this.event.LayoutType = eventVenue.eventVenueLayout.layout_type;
//        this.showOverlay = 'none';
//        console.log(this.eventLayout);
//      }
//      );
//    }
//  }

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

  addPricing(form : NgForm) : void
  {
    console.log(this.addPricingFormData);
    var response = this.eventLayout.addPricing(this.addPricingFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetAddPricingForm(form);
  }

  resetAddPricingForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.addPricingFormData.value = "";
      this.addPricingFormData.desc = "";
      this.addPricingFormData.label = "";
    }
  }

  markPricing(form : NgForm) : void
  {
    console.log(this.markPricingFormData);
    var response = this.eventLayout.markPricing(this.markPricingFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetMarkPricingForm(form);
  }

  resetMarkPricingForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.markPricingFormData.group_index = -1;
      this.markPricingFormData.row_index = -1;
      this.markPricingFormData.start_col_index = -1;
      this.markPricingFormData.end_col_index = -1;
      this.markPricingFormData.price_index = -1;
    }
  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
      this.event = new Event({}, 'new');
    }
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

  markPricingFormData =
  {
    group_index: -1,
    row_index: -1,
    start_col_index: -1,
    end_col_index: -1,
    price_index: -1,
  };

  addPricingFormData =
  {
    label:"",
    value:"",
    desc:""
  }

  get layout_groups(){
    return this.eventLayout.groups;
  }

}

