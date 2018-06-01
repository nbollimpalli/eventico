export class Event {
  Id: string;
  Name: string;
  Desc: string;
  IsLayoutBased: Boolean;

  constructor(eventJsonObject)
  {
    this.Id = eventJsonObject["id"];
    this.Name = eventJsonObject["name"];
    this.Desc = eventJsonObject["desc"];
    this.IsLayoutBased = eventJsonObject["is_layout_based"];
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

}

