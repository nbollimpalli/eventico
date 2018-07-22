import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Event } from './shared/event.model';
import { EventService } from './shared/event.service';
import { ObservableMedia } from '@angular/flex-layout';
import { UserService } from '../event-user/shared/user.service'
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { SearchService } from '../shared-services/search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { SnackbarService } from '../shared-services/snackbar.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, AfterViewInit {

  public cols: Observable<number>;
  options = [];

  lat: number = 12.93341230000000000000000000000000;
  lng: number = 77.69136019999996000000000000000000;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(
    private eventService : EventService,
    private observableMedia: ObservableMedia,
    private userservice : UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _searchService: SearchService,
    private snackbarService : SnackbarService,
    private router : Router,
  )
  {
    this.snackbarService.load();
  }
  loading = false;
  ngOnInit( ) {

    this.queryField.valueChanges
    .debounceTime(1000)
    .distinctUntilChanged()
    .switchMap((query) =>  this._searchService.search(query, 'EVENTS'))
    .subscribe(
      (sdata) => {

      },
      (fdata) => {

      }
    );

    //set current position
    this.setCurrentPosition();



    this.eventService.loadEvents();
    const grid = new Map([
      ["xs", 1],
      ["sm", 1],
      ["md", 2],
      ["lg", 3],
      ["xl", 3]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable()
      .map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        return grid.get(change.mqAlias);
      })
      .startWith(start);
  }

  ngAfterViewInit()
  {
    this.snackbarService.calm()
  }

  private setCurrentPosition() {
//    if ("geolocation" in navigator) {
//      navigator.geolocation.getCurrentPosition((position) => {
//        this.lat = position.coords.latitude;
//        this.lng = position.coords.longitude;
//        this.zoom = 11;
//      });
//    }
  }

  get events() : Object{
    return this.eventService.events;
  }

  get locations() : Object{
    return this.eventService.locations;
  }

  get permissions() {
    return this.userservice.user.Permissions;
  }

  eventClicked(event)
  {
    this.router.navigate(['bookings/booking',{event_id: event.Id}]);
    console.log(event);
  }
}

