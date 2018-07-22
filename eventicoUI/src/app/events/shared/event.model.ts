import { EventLayout } from '../../shared/event-layout.model';
import { EventVenue } from '../../event-venues/shared/event-venue.model';
import { EventType } from '../../event-types/shared/event-type.model';

export class Event {
  Id: number;
  Name: string;
  Desc: string;
  LayoutType: string;
  EventTypeId: string;
  EventVenueId: string;
  eventVenue : EventVenue;
  eventLayout: EventLayout;
  eventType : EventType;
  mode : String;
  facebook_share_url : string;
  twitter_share_url : string;
  times = {
    start: {
        date: new Date(),
        hh: 1,
        mm: 0,
        period: 'AM',
        month : 'MTH',
        day : 'DAY',
        day_num : 'DAY NUM'
      },

    end: {
        date: new Date(),
        hh: 1,
        mm: 15,
        period: 'AM'
      }
  }
  images = {
    banner: {url: '', id: ''},
    mini_banner: {url: '', id: ''},
    thumb_nail: {url: '', id: ''},
  }

  constructor(eventJsonObject, mode : String)
  {
    this.mode = mode;
    this.import(eventJsonObject);
  }

  import(eventJsonObject)
  {
    this.Name = eventJsonObject["name"];
    this.Desc = eventJsonObject["desc"];
    if(this.mode == 'new')
    {
      this.times['start']['date'] = new Date();
      this.times['end']['date'] = new Date();
      this.eventLayout = new EventLayout(eventJsonObject["layout"], this.mode);
    }
    else if(this.mode == 'edit')
    {
      this.eventLayout.mode = 'edit';
      this.Id = eventJsonObject["id"];
      this.times = eventJsonObject['times'];
      this.eventLayout.import(eventJsonObject["layout"])
      var event_type = eventJsonObject['event_type'];
      var event_venue = eventJsonObject['event_venue'];
      this.EventTypeId =  event_type['id'].toString();
      this.EventVenueId = event_venue['id'].toString();
      if(eventJsonObject['images'] && eventJsonObject['images'].length > 0)
      {
        for(var image in eventJsonObject['images'])
        {
          if(eventJsonObject['images'][image]['file_type'] == 'event_banner')
          {
            this.images['banner']['url'] = eventJsonObject['images'][image]['upload'];
            this.images['banner']['id'] = eventJsonObject['images'][image]['id'];
          }
        }
      }
    }
    else if(this.mode == 'list')
    {
      this.Id = eventJsonObject["id"];
      this.times = eventJsonObject['times'];
      var event_type = eventJsonObject['event_type'];
      var event_venue = eventJsonObject['event_venue'];
      this.eventType = new EventType(event_type);
      this.eventVenue = new EventVenue(event_venue, 'list');

      if(eventJsonObject['images'] && eventJsonObject['images'].length > 0)
      {
        for(var image in eventJsonObject['images'])
        {
          if(eventJsonObject['images'][image]['file_type'] == 'event_banner')
          {
            this.images['banner']['url'] = eventJsonObject['images'][image]['upload'];
            this.images['banner']['id'] = eventJsonObject['images'][image]['id'];
          }
        }
      }
    }
  }

  export()
  {

    var exportJSON = {
      "id" : this.Id,
      "name" : this.Name,
      "desc" : this.Desc,
      "layout_type" : this.LayoutType,
      "event_type" : this.EventTypeId,
      "event_venue" : this.EventVenueId,
      "times" : this.times,
      "default_price" : this.eventLayout.getDefaultPrice(),
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

