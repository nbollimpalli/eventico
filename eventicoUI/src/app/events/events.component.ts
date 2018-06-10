import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Event } from './shared/event.model';
import { EventService } from './shared/event.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  myControl: FormControl = new FormControl();
  public cols: Observable<number>;
  options = [
    'One',
    'Two',
    'Three'
   ];
  constructor(private eventService : EventService, private observableMedia: ObservableMedia) { }

  ngOnInit() {
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

  get events() : Object{
    return this.eventService.events;
  }
}
