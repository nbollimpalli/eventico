import { Injectable } from '@angular/core';
import { EventVenue } from './event-venue.model';
import { RestService } from '../../shared-services/rest.service';

@Injectable()
export class EventVenueService {

  eventVenues: EventVenue[] = [];

  constructor(private restService : RestService) { }

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
    var params =  {id: id};
    return this.restService.get('GET_EVENT_VENUE', null, params);
  }

  createEventVenue(createETObj : EventVenue)
  {
    const createJSON = createETObj.getCreateJSON();
    return this.restService.post( 'CREATE_EVENT_VENUE', null, createJSON );
  }

  updateEventVenue(updateETObj : EventVenue)
  {
    const updateJSON = updateETObj.getUpdateJSON();
    return this.restService.post( 'UPDATE_EVENT_VENUE', null, updateJSON );
  }

  upsertVenueLayout(eventVenue : EventVenue)
  {
    var upsertJSON = eventVenue.eventVenueLayout.export();
    upsertJSON['object_id'] = eventVenue.Id;
    upsertJSON['model'] = 'eventvenue';
    upsertJSON['app_label'] = 'events';
    return this.restService.post('UPSERT_LAYOUT', null, upsertJSON);
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
    var params = {};
    return this.restService.get('GET_EVENT_VENUES', null, params);
  }

  syncUIEventVenues(data)
  {
    console.log('sync data ::');
    console.log(data);
    var EventVenueList = JSON.parse(data);
    var mode = 'list';
    for (let i = 0; i < EventVenueList.length; i++) {
         var eventVenue = this.makeEventVenueObject(EventVenueList[i], mode);
         this.eventVenues.push(eventVenue);
    }
    console.log(this.eventVenues);
  }



  makeEventVenueObject(data, mode) : EventVenue
  {
     var id = data["pk"];
     var EventVenueJsonObject = data["fields"];
     EventVenueJsonObject["id"] = id;
     var eventVenue = new EventVenue(EventVenueJsonObject, mode);
     return eventVenue;
  }

}
