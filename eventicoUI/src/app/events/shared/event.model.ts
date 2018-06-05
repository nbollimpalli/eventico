import { EventLayout } from '../../shared/event-layout.model'

export class Event {
  Id: string;
  Name: string;
  Desc: string;
  LayoutType: string;
  DefaultPrice: number;
  EventTypeId: number;
  EventVenueId: number;
  eventLayout: EventLayout;

  constructor(eventJsonObject)
  {
    this.import(eventJsonObject);
  }

  import(eventJsonObject)
  {
    this.Id = eventJsonObject["id"];
    this.Name = eventJsonObject["name"];
    this.Desc = eventJsonObject["desc"];
    this.LayoutType = eventJsonObject["layout_type"];
    this.DefaultPrice = eventJsonObject["default_price"];
    this.EventTypeId = eventJsonObject["event_type_id"];
    this.EventVenueId = eventJsonObject["event_venue_id"];
    this.eventLayout = new EventLayout(eventJsonObject["layout"]);
  }

  export()
  {
    var exportJSON = {
      "id" : this.Id,
      "name" : this.Name,
      "desc" : this.Desc,
      "layout_type" : this.LayoutType,
      "default_price" : this.DefaultPrice,
      "event_type_id" : this.EventTypeId,
      "event_venue_id" : this.EventVenueId
    }
    return exportJSON;
  }

}

