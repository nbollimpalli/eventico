import { Injectable } from '@angular/core';
import { EventType } from './event-type.model';
import { RestService } from '../../shared-services/rest.service';

@Injectable()
export class EventTypeService {

  eventTypes: EventType[] = [];

  constructor(private restService : RestService) { }

  createEventType(createETObj : EventType)
  {
    const createJSON = createETObj.getCreateJSON();
    return this.restService.post( 'CREATE_EVENT_TYPE', true, null, createJSON );
  }

  updateEventType(updateETObj : EventType)
  {
    const updateJSON = updateETObj.getUpdateJSON();
    return this.restService.post( 'UPDATE_EVENT_TYPE', true, null, updateJSON );
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
    var params = {};
    return this.restService.get('GET_EVENT_TYPES', true, null, params);
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
