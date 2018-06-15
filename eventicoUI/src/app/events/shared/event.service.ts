import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { RestService } from '../../shared-services/rest.service';
import { DatetimeService } from '../../shared-services/datetime.service'

@Injectable()
export class EventService {

  events: Event[] = [];

  constructor(private restService : RestService, private dtService : DatetimeService) { }

  upsertEvent(upsertEventObj : Event)
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

//  update_times(type, date, hour, mins, period)
//  {
//    if(type == null || date == null || hour == null || mins == null || period == null)
//    {
//      return {success: false, message: 'Invalid date time entered'};
//    }
//    else
//    {
//      if(type == 'start')
//      {
//        var dt = times['start'];
//        //first validate if the date is correct or not
//
//      }
//      else if(type == 'end')
//      {
//
//      }
//      else
//      {
//        return {success: false, message: 'Invalid date type'};
//      }
//    }
//  }

}
