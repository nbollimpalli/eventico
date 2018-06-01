import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Event } from './event.model';

@Injectable()
export class EventService {

  events: Event[] = [];
  readonly rootUrl = "http://127.0.0.1:8000";

  constructor(private http : HttpClient) { }

  createEvent(createEventObj : Event)
  {
    const createJSON = createEventObj.getCreateJSON();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/event/create/', createJSON,{headers: reqHeaders});
  }

  updateEventType(updateETObj : Event)
  {
    const updateJSON = updateETObj.getUpdateJSON();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/event/update/', updateJSON,{headers: reqHeaders});
  }

  loadEvents()
  {
    this.events = [];
    this.fetchEvents().subscribe( (data) => {
        this.syncUIEvents(data);
      }
      );
  }

  fetchEvents()
  {
    var actionUrl = '/events/';
    return this.http.get(this.rootUrl+actionUrl);
  }

  syncUIEvents(data)
  {
    console.log('sync data ::');
    console.log(data);
    var eventList = JSON.parse(data);
    for (let i = 0; i < eventList.length; i++) {
         var id = eventList[i]["pk"];
         var eventJsonObject = eventList[i]["fields"];
         eventJsonObject["id"] = id;
         var event = new Event(eventJsonObject);
         this.events.push(event);
    }
    console.log(this.events);
  }

}
