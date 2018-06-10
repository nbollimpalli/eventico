import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { RestService } from '../../shared-services/rest.service';

@Injectable()
export class EventService {

  events: Event[] = [];

  constructor(private restService : RestService) { }

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
    return this.restService.post( 'CREATE_EVENT', true, null, createJSON );

  }

  updateEvent(updateEventObj : Event)
  {
    const updateJSON = updateEventObj.export();
    return this.restService.post( 'UPDATE_EVENT', true, null, updateJSON );

  }

  updateEventLayout( event : Event )
  {
    //event.eventlayout;
  }

  getEvent(id)
  {
    var params = {};
    return this.restService.get('GET_EVENT', true, null, params);
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
    var params = {};
    return this.restService.get('GET_EVENTS', true, null, params);
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
