export class Location {
  Id : string;
  Name : string;
  Address : string;
  PlaceId : string;
  LocationUrl : string;

  constructor()
  {
  }

  import(input)
  {
    if(input)
    {
      this.Id = input['id'];
      this.Name = input['name'];
      this.Address = input['address'];
      this.PlaceId = input['place_id'];
      this.LocationUrl = input['location_url'];
    }
  }

  export()
  {
    var res = {
      'id' : this.Id,
      'name' : this.Name,
      'address' : this.Address,
      'place_id' : this.PlaceId,
      'location_url' : this.LocationUrl
    }
    return res;
  }
}
