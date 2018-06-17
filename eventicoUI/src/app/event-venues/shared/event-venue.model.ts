import { EventVenueLayout } from '../../shared/event-venue-layout.model'
export class EventVenue {
  Id: string;
  Name: String;
  Desc: string;
  eventVenueLayout: EventVenueLayout;
  mode : string;

  constructor(eventVenueJsonObject, mode)
  {
    this.mode = mode;
    this.Id = eventVenueJsonObject["id"];
    this.Name = eventVenueJsonObject["name"];
    this.Desc = eventVenueJsonObject["desc"];
    this.eventVenueLayout = new EventVenueLayout(eventVenueJsonObject["layout"], this.mode);
  }

  getCreateJSON()
  {
    var createJSON = {
      "name" : this.Name,
      "desc" : this.Desc
    }
    return createJSON;
  }

  getUpdateJSON()
  {
    var updateJSON = this.getCreateJSON();
    updateJSON["id"] = this.Id;
    return updateJSON;
  }

}
