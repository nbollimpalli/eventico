import { Component, OnInit , ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
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
import { Location } from '../../shared/location.model';
import { SnackbarService } from '../../shared-services/snackbar.service';
@Component({
  selector: 'app-new-event-venue',
  templateUrl: './new-event-venue.component.html',
  styleUrls: ['./new-event-venue.component.css']
})
export class NewEventVenueComponent implements OnInit {
  eventVenue : EventVenue;
  venueLocation : Location;
  eventVenueLayout : EventVenueLayout;
  markEmptyControl: FormControl = new FormControl();
  mode : string;

  myControl: FormControl = new FormControl();

  lat: number = 12.972442;
  lng: number = 77.580643;
  public searchControl: FormControl;
  public zoom: number;
  mapView;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild("map")
  public mapElementRef : ElementRef;

  constructor(
    private eventVenueService : EventVenueService,
    private router : Router,
    public dialog: MatDialog,
    private route : ActivatedRoute,
    private userservice : UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snackbarService : SnackbarService,
  )
  {
    this.snackbarService.load();
    this.route.params.subscribe(params => this.setupEventVenue(params['id']));
  }

  setupEventVenue(id)
  {
    console.log(id);
    if(id != null && id != '' && id != "undefined")
    {
      this.mode = "edit";
      this.eventVenue = new EventVenue({}, this.mode);
      this.eventVenueLayout = this.eventVenue.eventVenueLayout;
      this.venueLocation = new Location();
      this.eventVenue.location = this.venueLocation;
      this.eventVenueService.getEventVenue(id)
      .subscribe(
      (data) => {
        var venue = data['data']['event_venue'];
        var layout = data['data']['layout'];
        venue['layout'] = layout;
        this.eventVenue.import(venue, this.mode);
        this.setPosition();
        this.mapsAPILoader.load().then(() => {
                var request = {
                  placeId: this.eventVenue.location.PlaceId
                 };
                var service = new google.maps.places.PlacesService(this.mapElementRef.nativeElement);
                this.snackbarService.afterRequest(data);
                this.snackbarService.load();
                service.getDetails(request,(result, status) => {
                    this.snackbarService.calm();
                    let place: google.maps.places.PlaceResult = result;
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom = 14;
                });

        }
        );
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
      }
      );
    }
    else
    {
      this.mode = "new";
      this.eventVenue = new EventVenue({}, this.mode);
      this.eventVenueLayout = this.eventVenue.eventVenueLayout;
      this.venueLocation = new Location();
      this.eventVenue.location = this.venueLocation;
      this.snackbarService.calm();
    }
  }

  ngAfterViewInit()
  {
    //set current position
    this.setPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        componentRestrictions: {country: 'in'}
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.venueLocation.Name = place.name;
          this.venueLocation.Address = place.formatted_address;
          this.venueLocation.PlaceId = place.place_id;
          this.venueLocation.LocationUrl = place.url;

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.venueLocation.lat = this.lat;
          this.venueLocation.lng = this.lng;
          this.zoom = 14;
        });
      });
    });
  }

  ngOnInit() {
    this.resetForm();
    this.zoom = 14;
    this.searchControl = new FormControl();
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
    this.snackbarService.show_snackbar(response.message);
    this.resetAddPathForm(form);
  }

  markEmpty(form : NgForm) : void
  {
    console.log(this.addGroupFormData);
    var response = this.eventVenueLayout.markEmpty(this.markEmptyFormData);
    this.snackbarService.show_snackbar(response.message);
    this.resetMarkEmptyForm(form);
  }

  upsertEventVenue()
  {
    this.snackbarService.load();
    this.eventVenueService.upsertEventVenue(this.eventVenue)
    .subscribe(
    (data) => {
      this.eventVenue.Id = data['data']['venue']['id'];
      this.eventVenue.location.Id = data['data']['venue']['location']['id'];
      this.snackbarService.afterRequest(data);
    },
    (data) => {
      this.snackbarService.afterRequestFailure(data);
    }

    );
  }

  upsertLayout()
  {
    this.snackbarService.load();
    this.eventVenueService.upsertVenueLayout(this.eventVenue)
    .subscribe(
    (data) => {
      this.eventVenue.eventVenueLayout.Id = data['data']['layout']['id'];
      this.snackbarService.afterRequest(data);
      this.router.navigate(['/event-venues']);
    },
    (data) => {
      this.snackbarService.afterRequestFailure(data);
    }
    );
  }

  get layout_groups(){
    return this.eventVenueLayout.groups;
  }


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

  private setPosition() {
    if(this.mode == 'new')
    {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 14;
        });
      }
    }
  }
}

