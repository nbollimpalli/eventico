export class Location {
  Id : string;
  Name : string;
  Address : string;
  PlaceId : string;
  LocationUrl : string;
  lat : number;
  lng : number;
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
      this.lat = Number(input['lat']);
      this.lng = Number(input['lng']);
    }
  }

  export()
  {
    var res = {
      'id' : this.Id,
      'name' : this.Name,
      'address' : this.Address,
      'place_id' : this.PlaceId,
      'location_url' : this.LocationUrl,
      'lat' : Number(this.lat),
      'lng' : Number(this.lng),
    }
    return res;
  }
}
