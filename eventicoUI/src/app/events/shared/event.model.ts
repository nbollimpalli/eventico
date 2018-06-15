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

  times = {
    start: {
        hh: 1,
        mm: 0,
        period: 'am'
      },

    end: {
        hh: 1,
        mm: 15,
        period: 'am'
      }
  }
  images = {
    banner: {url: '', id: ''},
    mini_banner: {url: '', id: ''},
    thumb_nail: {url: '', id: ''},
  }

  constructor(eventJsonObject)
  {
    this.import(eventJsonObject);
    this.times['start']['date'] = new Date();
    this.times['end']['date'] = new Date();
  }

  import(eventJsonObject)
  {
    this.Id = eventJsonObject["id"];
    this.Name = eventJsonObject["name"];
    this.Desc = eventJsonObject["desc"];
    this.LayoutType = (eventJsonObject["layout_type"] || 'none');
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
      "event_type" : this.EventTypeId,
      "event_venue" : this.EventVenueId,
      "times" : this.times
    }
    return exportJSON;
  }

  import_images(imageJSON)
  {
    if( imageJSON != null )
    {
      for(var key in imageJSON)
      {
        if(this.images[key])
        {
          this.images[key].url = imageJSON[key].url;
          this.images[key].id = imageJSON[key].id;
        }
      }
    }
  }

  export_images()
  {
    return this.images;
  }

}

