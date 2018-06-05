import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Event } from './event.model';

@Injectable()
export class EventService {

  events: Event[] = [];
  readonly rootUrl = "https://www.eventico.algovent.com";

  constructor(private http : HttpClient) { }

  upsertEventVenue(upsertEventObj : Event)
  {
    if(upsertEventObj.Id == null || upsertEventObj.Id == ''|| upsertEventObj.Id == undefined )
    {
      return this.createEvent(upsertEventObj);
    }
    else
    {
      return this.updateEvent(upsertEventObj);
    }
  }

  createEvent(createEventObj : Event)
  {
    const createJSON = createEventObj.export();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/event/create/', createJSON,{headers: reqHeaders});
  }

  updateEvent(updateEventObj : Event)
  {
    const updateJSON = updateEventObj.export();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/event/update/', updateJSON,{headers: reqHeaders});
  }

  getEvent(id)
  {
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.get(this.rootUrl+'/event/',{params: {id: id}, headers: reqHeaders});
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

  makeEventObject(data) : Event
  {
     var id = data["pk"];
     var EventJsonObject = data["fields"];
     EventJsonObject["id"] = id;
     var event = new Event(EventJsonObject);
     return event;
  }

}
