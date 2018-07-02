import { Injectable } from '@angular/core';
import { EventType } from './event-type.model';
import { RestService } from '../../shared-services/rest.service';

@Injectable()
export class EventTypeService {

  eventTypes: EventType[] = [];

  constructor(private restService : RestService) { }

  upsertEventType(eventType : EventType)
  {
    const body = eventType.export();
    return this.restService.post( 'UPSERT_EVENT_TYPE', null, body );
  }

  loadEventTypes()
  {
    this.eventTypes = [];
    this.fetchEventTypes().subscribe(
      (sdata) => {
        this.syncUIEventTypes(sdata['data']['event_types']);
      },
      (fdata) => {}
      );
  }

  fetchEventTypes()
  {
    var params = {};
    return this.restService.get('GET_EVENT_TYPES', null, params);
  }

  syncUIEventTypes(eventTypeList)
  {
    for (let i = 0; i < eventTypeList.length; i++) {
         var eventType = new EventType(eventTypeList[i]);
         this.eventTypes.push(eventType);
    }
    console.log(this.eventTypes);
  }

}
