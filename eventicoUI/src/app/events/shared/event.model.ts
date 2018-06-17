import { EventLayout } from '../../shared/event-layout.model'

export class Event {
  Id: number;
  Name: string;
  Desc: string;
  LayoutType: string;
  EventTypeId: string;
  EventVenueId: string;
  eventLayout: EventLayout;
  mode : String;
  times = {
    start: {
        date: new Date(),
        hh: 1,
        mm: 0,
        period: 'am',
        month : 'MTH',
        day : 'DAY',
        day_num : 'DAY NUM'
      },

    end: {
        date: new Date(),
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
      this.EventTypeId =  eventJsonObject["event_type"].toString();
      this.EventVenueId = eventJsonObject["event_venue"].toString();
      if(eventJsonObject['images'] && eventJsonObject['images'].length > 0)
      {
        this.images['banner']['url'] = eventJsonObject['images'][0]['upload'];
        this.images['banner']['id'] = eventJsonObject['images'][0]['id'];
      }
    }
    else if(this.mode == 'list')
    {
      this.Id = eventJsonObject["id"];
      this.times = eventJsonObject['times'];
      if(eventJsonObject['images'] && eventJsonObject['images'].length > 0)
      {
        this.images['banner']['url'] = eventJsonObject['images'][0]['upload'];
        this.images['banner']['id'] = eventJsonObject['images'][0]['id'];
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

