export class Location {
  Name : String;
  Address : String;
  PlaceId : String;
  LocationUrl : String;

  constructor()
  {
  }

  import(input)
  {
    if(input)
    {
      this.Name = input.get('name');
      this.Address = input.get('address');
      this.PlaceId = input.get('place_id');
      this.LocationUrl = input.get('location_url');
    }
  }

  export()
  {
    var res = {
      'name' : this.Name,
      'address' : this.Address,
      'place_id' : this.PlaceId,
      'location_url' : this.LocationUrl
    }
    return res;
  }
}
