import { Layout } from './layout.model';

export class EventLayout  extends Layout{
  mode: string;//supports event_venue, event, booking modes
  constructor()
  {
    super();
  }

  markUnavailable(groupName : string, rowNumber : number, startColNumber : number, endColNumber: number)
  {
    var group = this.groups[groupName];
    if(group != null)
    {
      var cols = group[rowNumber];
      for(var i = startColNumber; i < endColNumber; i++)
      {
        var col = cols[i];
        col.unavailable = true;
      }
    }
  }

  updateEventLayout(){

  }
}
