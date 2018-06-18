import { Injectable } from '@angular/core';
import { EventService } from '../../events/shared/event.service';
import { Booking } from './booking.model';
import { RestService } from '../../shared-services/rest.service';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private restService : RestService, private eventService : EventService) { }

  skipAndBook(booking : Booking)
  {
    const skipAndBookJSON = booking.export();
    return this.restService.post( 'SKIP_AND_BOOK', true, null, skipAndBookJSON );
  }
}
