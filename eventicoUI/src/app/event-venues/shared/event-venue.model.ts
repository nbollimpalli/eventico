import { EventVenueLayout } from '../../shared/event-venue-layout.model'
export class EventVenue {
  Id: string;
  Name: String;
  Desc: string;
  LayoutType: string;
  eventVenueLayout: EventVenueLayout;

  constructor(eventVenueJsonObject)
  {
    this.Id = eventVenueJsonObject["id"];
    this.Name = eventVenueJsonObject["name"];
    this.Desc = eventVenueJsonObject["desc"];
    this.LayoutType = eventVenueJsonObject["layout_type"];
    this.eventVenueLayout = new EventVenueLayout(eventVenueJsonObject["layout"]);
  }

  getCreateJSON()
  {
    var createJSON = {
      "name" : this.Name,
      "desc" : this.Desc,
      "layout_type" : this.LayoutType,
      "layout" : this.eventVenueLayout.export(),
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
