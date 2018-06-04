import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { EventVenue } from './event-venue.model';

@Injectable()
export class EventVenueService {

  eventVenues: EventVenue[] = [];
  readonly rootUrl = "http://127.0.0.1:8000";

  constructor(private http : HttpClient) { }

  upsertEventVenue(upsertETObj : EventVenue)
  {
    if(upsertETObj.Id == null || upsertETObj.Id == '')
    {
      return this.createEventVenue(upsertETObj);
    }
    else
    {
      return this.updateEventVenue(upsertETObj);
    }
  }

  getEventVenue(id)
  {
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.get(this.rootUrl+'/eventvenue/',{params: {id: id}, headers: reqHeaders});
  }

  createEventVenue(createETObj : EventVenue)
  {
    const createJSON = createETObj.getCreateJSON();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/eventvenue/create/', createJSON,{headers: reqHeaders});
  }

  updateEventVenue(updateETObj : EventVenue)
  {
    const updateJSON = updateETObj.getUpdateJSON();
    var reqHeaders = new HttpHeaders({'No-Auth' : 'True'});
    return this.http.post(this.rootUrl+'/eventvenue/update/', updateJSON,{headers: reqHeaders});
  }

  loadEventVenues()
  {
    this.eventVenues = [];
    this.fetchEventVenues().subscribe( (data) => {
        this.syncUIEventVenues(data);
      }
      );
  }

  fetchEventVenues()
  {
    var actionUrl = '/eventvenues/';
    return this.http.get(this.rootUrl+actionUrl);
  }

  syncUIEventVenues(data)
  {
    console.log('sync data ::');
    console.log(data);
    var EventVenueList = JSON.parse(data);
    for (let i = 0; i < EventVenueList.length; i++) {
         var eventVenue = this.makeEventVenueObject(EventVenueList[i]);
         this.eventVenues.push(eventVenue);
    }
    console.log(this.eventVenues);
  }

  makeEventVenueObject(data) : EventVenue
  {
     var id = data["pk"];
     var EventVenueJsonObject = data["fields"];
     EventVenueJsonObject["id"] = id;
     var eventVenue = new EventVenue(EventVenueJsonObject);
     return eventVenue;
  }

}
