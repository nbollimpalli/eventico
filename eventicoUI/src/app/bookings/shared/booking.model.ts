import { BookingLayout } from '../../shared/booking-layout.model';
import { Event } from '../../events/shared/event.model';

export class Booking {
  Id: number;
  Uid: string;
  event : Event
  bookingLayout: BookingLayout;
  mode : String;
  event_mode : String;
  layout_mode : string;
  skip_payment = false;
  constructor(mode : String)
  {
    this.mode = mode;
    this.event_mode = 'list';
    this.layout_mode = 'new';
    this.event = new Event({}, this.event_mode);
    this.bookingLayout = new BookingLayout({}, this.layout_mode);
  }

  import(bookingJsonObject)
  {
    if(this.mode == 'new')
    {
      this.layout_mode = 'edit';
      this.bookingLayout.mode = this.layout_mode;
      this.bookingLayout.import(bookingJsonObject['layout']);
      this.event.import(bookingJsonObject['event']);
    }
    else if(this.mode == 'edit')
    {
      this.bookingLayout.mode = 'edit';
      //import data to event in list mode
      //import layout to booking in edit mode
      this.Id = bookingJsonObject["id"];
      this.Uid = bookingJsonObject["uid"];
    }
    else if(this.mode == 'list')
    {
      this.Id = bookingJsonObject["id"];
      this.Uid = bookingJsonObject["uid"];
    }
    else if(this.mode == 'view')
    {
      this.Id = bookingJsonObject["id"];
      this.Uid = bookingJsonObject["uid"];
    }
  }

  export()
  {

    var exportJSON = {
      "id" : this.Id,
      "uid" : this.Uid,
      "event_id" : this.event.Id,
      'selection_info' : this.bookingLayout.selection_info,
    }
    return exportJSON;
  }

}

