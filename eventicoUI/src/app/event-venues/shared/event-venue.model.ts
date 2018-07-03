import { EventVenueLayout } from '../../shared/event-venue-layout.model'
import { Location } from '../../shared/location.model';

export class EventVenue {
  Id: string;
  Desc: string;
  eventVenueLayout: EventVenueLayout;
  mode : string;
  location : Location;

  constructor(eventVenueJsonObject, mode)
  {
    this.import(eventVenueJsonObject, mode);
  }

  import(eventVenueJsonObject, mode)
  {
    this.mode = mode;
    this.Id = eventVenueJsonObject["id"];
    this.Desc = eventVenueJsonObject["desc"];

    if(this.mode == 'new')
    {
      this.eventVenueLayout = new EventVenueLayout(eventVenueJsonObject["layout"], this.mode);
    }
    else if(this.mode == 'edit')
    {
      if(this.eventVenueLayout == null || this.eventVenueLayout == undefined)
      {
        this.eventVenueLayout = new EventVenueLayout(eventVenueJsonObject["layout"], this.mode);
      }
      this.eventVenueLayout.import(eventVenueJsonObject["layout"]);
    }

    if(this.location)
    {
        this.location.import(eventVenueJsonObject['location']);
    }
    else
    {
        this.location = new Location();
        this.location.import(eventVenueJsonObject['location']);
    }
  }

  export()
  {
    var res = {
      'venue' : {'id' : this.Id, 'desc' : this.Desc},
      'location' : this.location.export(),
    }
    return res;
  }

}
