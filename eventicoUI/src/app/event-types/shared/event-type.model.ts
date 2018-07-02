export class EventType {
  Id: string;
  Name: string;
  Desc: string;

  constructor(eventTypeJsonObject)
  {
    this.Id = eventTypeJsonObject["id"];
    this.Name = eventTypeJsonObject["name"];
    this.Desc = eventTypeJsonObject["desc"];
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
    var updateJSON = {
      "id" : this.Id,
      "name" : this.Name,
      "desc" : this.Desc
    }
    return updateJSON;
  }

  export()
  {
    var res = {
      "id" : this.Id,
      "name" : this.Name,
      "desc" : this.Desc
    }
    return res;
  }

}
