import { Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
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

import { SearchService } from '../shared-services/search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public cols: Observable<number>;
  options = [];

  lat: number = 51.678418;
  lng: number = 7.809007;
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
    private _searchService: SearchService
  )
  {

  }
  loading = false;
  ngOnInit( ) {

    this.queryField.valueChanges
    .subscribe(queryField =>this._searchService.search(queryField, 'EVENTS')
    .debounceTime(1000)
    .distinctUntilChanged()
     .subscribe(response => console.log(response)));

    //set current position
    this.setCurrentPosition();



    this.eventService.loadEvents();
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
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

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  get events() : Object{
    return this.eventService.events;
  }

  get permissions() {
    return this.userservice.user.Permissions;
  }
}
