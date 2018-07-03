import { Injectable } from '@angular/core';
import { EventVenue } from './event-venue.model';
import { RestService } from '../../shared-services/rest.service';

@Injectable()
export class EventVenueService {

  eventVenues: EventVenue[] = [];

  constructor(private restService : RestService) { }

  upsertEventVenue(eventVenue : EventVenue)
  {
      const body = eventVenue.export();
      return this.restService.post( 'UPSERT_EVENT_VENUE', null, body );
  }

  getEventVenue(id)
  {
    var params =  {id: id};
    return this.restService.get('GET_EVENT_VENUE', null, params);
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
    this.fetchEventVenues().subscribe(
      (data) => {
        this.syncUIEventVenues(data['data']['event_venues']);
      },
      (data) => {
      }
      );
  }

  fetchEventVenues()
  {
    var params = {};
    return this.restService.get('GET_EVENT_VENUES', null, params);
  }

  syncUIEventVenues(event_venues)
  {
    var mode = 'list';
    for (let i = 0; i < event_venues.length; i++) {
         var eventVenue = new EventVenue(event_venues[i], mode);
         this.eventVenues.push(eventVenue);
    }

    console.log(this.eventVenues);
  }

}
