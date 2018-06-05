import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { EventType } from './event-type.model';

@Injectable()
export class EventTypeService {

  eventTypes: EventType[] = [];
  readonly rootUrl = "https://www.eventico.algovent.com";

  constructor(private http : HttpClient) { }

  createEventType(createETObj : EventType)
  {
    const createJSON = createETObj.getCreateJSON();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/eventtype/create/', createJSON,{headers: reqHeaders});
  }

  updateEventType(updateETObj : EventType)
  {
    const updateJSON = updateETObj.getUpdateJSON();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/eventtype/update/', updateJSON,{headers: reqHeaders});
  }

  loadEventTypes()
  {
    this.eventTypes = [];
    this.fetchEventTypes().subscribe( (data) => {
        this.syncUIEventTypes(data);
      }
      );
  }

  fetchEventTypes()
  {
    var actionUrl = '/eventtypes/';
    return this.http.get(this.rootUrl+actionUrl);
  }

  syncUIEventTypes(data)
  {
    console.log('sync data ::');
    console.log(data);
    var eventTypeList = JSON.parse(data);
    for (let i = 0; i < eventTypeList.length; i++) {
         var id = eventTypeList[i]["pk"];
         var eventTypeJsonObject = eventTypeList[i]["fields"];
         eventTypeJsonObject["id"] = id;
         var eventType = new EventType(eventTypeJsonObject);
         this.eventTypes.push(eventType);
    }
    console.log(this.eventTypes);
  }

}
