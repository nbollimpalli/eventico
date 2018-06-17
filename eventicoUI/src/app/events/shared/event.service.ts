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
    const upsertJSON = upsertEventObj.export();
    return this.restService.post( 'UPSERT_EVENT', true, null, upsertJSON );
  }

  updateEventLayout( event : Event )
  {
    //event.eventlayout;
  }

  getEvent(id)
  {
    var params = {'id' : id};
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
    for (let i = 0; i < data.length; i++) {
         var event = new Event(data[i], 'list');
         this.events.push(event);
    }
    console.log(this.events);
  }

  updateEventInfo(data, event : Event)
  {
    event.mode = 'edit';
    var event_info = data['event'];
    event_info['layout'] = data['layout'];
    event.import(event_info);
  }

  upsertEventLayout(event : Event)
  {
    var upsertJSON = event.eventLayout.export();
    upsertJSON['object_id'] = event.Id;
    upsertJSON['model'] = 'event';
    upsertJSON['app_label'] = 'events';
    return this.restService.post('UPSERT_LAYOUT', true, null, upsertJSON);
  }

}
