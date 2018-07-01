import { Injectable } from '@angular/core';
import { EventService } from '../../events/shared/event.service';
import { Booking } from './booking.model';
import { RestService } from '../../shared-services/rest.service';
import { User } from '../../event-user/shared/user.model';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private restService : RestService, private eventService : EventService) { }

  skipAndBook(booking : Booking)
  {
    const skipAndBookJSON = booking.export();
    return this.restService.post( 'SKIP_AND_BOOK', null, skipAndBookJSON );
  }

  book(booking : Booking, user : User)
  {
    var bookingJSON = booking.export();
    var userJSON = user.export();
    const reqJSON = {
      'booking': bookingJSON,
      'user': userJSON
    }
    return this.restService.post('BOOK', null, reqJSON);
  }
}
