import { Component, OnInit , ElementRef, NgZone, ViewChild} from '@angular/core';
import { EventVenue } from '../shared/event-venue.model';
import { EventVenueService } from '../shared/event-venue.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventVenueLayout } from '../../shared/event-venue-layout.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../event-user/shared/user.service'
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-new-event-venue',
  templateUrl: './new-event-venue.component.html',
  styleUrls: ['./new-event-venue.component.css']
})
export class NewEventVenueComponent implements OnInit {
  eventVenue : EventVenue;
  eventVenueLayout : EventVenueLayout;
  markEmptyControl: FormControl = new FormControl();
  mode : string;
  showOverlay: string;

  myControl: FormControl = new FormControl();

  lat: number = 51.678418;
  lng: number = 7.809007;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private eventVenueService : EventVenueService,
    private router : Router,
    public dialog: MatDialog,
    private route : ActivatedRoute,
    private userservice : UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  )
  {
    this.showOverlay = 'block';
    this.route.params.subscribe(params => this.setupEventVenue(params['id']));
  }

  setupEventVenue(id)
  {
    console.log(id);
    if(id != null && id != '' && id != "undefined")
    {
      this.mode = "edit";
      this.eventVenueService.getEventVenue(id)
      .subscribe( (data) => {
        var ev = data['event_venue'];
        ev["layout"] = data["layout"];
        this.eventVenue = new EventVenue(ev, this.mode);
        this.eventVenueLayout = this.eventVenue.eventVenueLayout;
        console.log(this.eventVenue);
        this.showOverlay = 'none';
      }
      );
    }
    else
    {
      this.mode = "new";
      this.eventVenue = new EventVenue({}, this.mode);
      this.eventVenueLayout = this.eventVenue.eventVenueLayout;
      this.showOverlay = 'none';

    }
  }

  searchLocationCallback(selectedData:any) {
        console.log(selectedData);
  }

  ngOnInit() {
    this.resetForm();
    this.zoom = 4;
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        componentRestrictions: {country: 'in'}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
    }
  }

  resetAddGroupForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.addGroupFormData =
      {
        group_name: null,
        rows: null,
        cols: null,
      };
    }
  }

  resetMarkEmptyForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.markEmptyFormData.group_index = -1;
      this.markEmptyFormData.row_index = -1;
      this.markEmptyFormData.start_col_index = -1;
      this.markEmptyFormData.end_col_index = -1;
    }
  }

  resetAddPathForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.addPathFormData.group_index = -1;
      this.addPathFormData.col_index = -1;
    }
  }

  onSubmit(form : NgForm) {
    this.eventVenueService.createEventVenue(this.eventVenue)
    .subscribe( (data) => {
      this.resetForm(form);
      this.router.navigate(['']);
    }
    );
  }

  addGroup(form : NgForm)
  {
    console.log(this.addGroupFormData);
    var response = this.eventVenueLayout.addGroup(this.addGroupFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetAddGroupForm(form);
  }

  addPath(form : NgForm) : void
  {
    console.log(this.addPathFormData);
    var response = this.eventVenueLayout.addPath(this.addPathFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetAddPathForm(form);
  }

  markEmpty(form : NgForm) : void
  {
    console.log(this.addGroupFormData);
    var response = this.eventVenueLayout.markEmpty(this.markEmptyFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetMarkEmptyForm(form);
  }

  upsertEventVenue()
  {
    this.eventVenueService.upsertEventVenue(this.eventVenue)
    .subscribe( (data) => {
      this.eventVenue.Id = data['id'];
    }
    );
  }

  upsertLayout()
  {
    this.eventVenueService.upsertVenueLayout(this.eventVenue)
    .subscribe( (data) => {
      this.eventVenue.eventVenueLayout.Id = data['id'];
      this.router.navigate(['']);
    }
    );
  }

  get layout_groups(){
    return this.eventVenueLayout.groups;
  }

  addPathDialogData =
  {
    title: 'Update Path Tool',
    fields:
      [
        {field_type: 'text', name: 'Group Name',default_value: '', value: ''},
        {field_type: 'number', name: 'Column',default_value: 0, value: 0}
      ]
  };

  markEmptyDialogData =
  {
    title: 'Mark Empty Tool',
    fields:
      [
        {field_type: 'text', name: 'Group Name',default_value: '', value: ''},
        {field_type: 'number', name: 'Row',default_value: 0, value: 0},
        {field_type: 'number', name: 'Start Column',default_value: 1, value: 1},
        {field_type: 'number', name: 'End Column',default_value: 1, value: 1}
      ]
  };

  addNewGroupDialogData =
  {
    title: 'Create New Group',
    fields:
      [
        {field_type: 'text', name: 'Group Name',default_value: '', value: ''},
        {field_type: 'number', name: 'Rows',default_value: 0, value: 0},
        {field_type: 'number', name: 'Columns',default_value: 0, value: 0}
      ]
  };



  addGroupFormData =
  {
    group_name: '',
    rows: null,
    cols: null,
  };

  markEmptyFormData =
  {
    group_index: -1,
    row_index: -1,
    start_col_index: -1,
    end_col_index: -1,
  };

  addPathFormData =
  {
    group_index: -1,
    col_index: -1
  };

  get permissions() {
    return this.userservice.user.Permissions;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}

