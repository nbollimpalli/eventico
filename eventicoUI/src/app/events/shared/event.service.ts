import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { RestService } from '../../shared-services/rest.service';
import { DatetimeService } from '../../shared-services/datetime.service'
import { SnackbarService } from '../../shared-services/snackbar.service';
import { Location } from '../../shared/location.model';
@Injectable()
export class EventService {

  events: Event[] = [];
  locations : Location[] = [];
  constructor(
    private restService : RestService,
    private dtService : DatetimeService,
    private snackbarService : SnackbarService
  )
  { }

  upsertEvent(upsertEventObj : Event)
  {
    const upsertJSON = upsertEventObj.export();
    return this.restService.post( 'UPSERT_EVENT', null, upsertJSON );
  }

  getEvent(id)
  {
    var params = {'id' : id};
    return this.restService.get('GET_EVENT', null, params);
  }

  loadEvents()
  {
    this.snackbarService.load();
    this.events = [];
    this.fetchEvents().subscribe(
    (sdata) => {
        this.syncUIEvents(sdata);
        this.snackbarService.calm();
    },
    (fdata) => {
        this.snackbarService.calm();
    }
    );
  }

  fetchEvents()
  {
    var params = {};
    return this.restService.get('GET_EVENTS', null, params);
  }

  syncUIEvents(data)
  {
    var jsonEvents = data['data']['events']
    for (let i = 0; i < jsonEvents.length; i++) {
         var event = new Event(jsonEvents[i], 'list');
         this.events.push(event);
         this.locations.push(event.eventVenue.location);
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
    return this.restService.post('UPSERT_LAYOUT', null, upsertJSON);
  }

}
