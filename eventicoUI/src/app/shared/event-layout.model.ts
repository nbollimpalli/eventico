import { Layout } from './layout.model';

export class EventLayout  extends Layout{
  mode: string;//supports event_venue, event, booking modes
  constructor(layout)
  {
    super();
    this.import(layout);
  }


  markUnavailable(mData)
  {
    console.log(mData);
    if( mData == null || mData.group_index == null || mData.row_index == null || mData.row_index < 0 || mData.group_index < 0 || mData.start_col_index == null || mData.start_col_index < 0 || mData.end_col_index == null || mData.end_col_index < 0 )
    {
       return {success: false, message: 'invalid group and rows are selected, please dont select 0th column or last column'};
    }

    var group = this.groups[mData.group_index];
    if(group != null)
    {
      var cols = group.rows[mData.row_index].cols;
      for(var i = mData.start_col_index; i <= mData.end_col_index; i++)
      {
        var col = cols[i];
        if(col.type != 'path' && col.type != 'blank')
        {
          col.type = 'na';
          col.color = '#838486b';
          col.disabled = true;
          col.price = 0;
          col.pricing_color = '#bbbbbb';
        }
      }
    }
    this.sort();
    return {success: true, message: 'Successfully Marked Unavailable'};
  }

  markPricing(mData)
  {
    console.log(mData);
    if( mData == null || mData.group_index == null || mData.row_index == null || mData.row_index < 0 || mData.group_index < 0 || mData.start_col_index == null || mData.start_col_index < 0 || mData.end_col_index == null || mData.end_col_index < 0 )
    {
       return {success: false, message: 'invalid group and rows are selected, please dont select 0th column or last column'};
    }
    if(mData.price == null || mData.price <= 0)
    {
       return {success: false, message: 'please enter a valid pricing details, price value must be greater than 0'};
    }
    var group = this.groups[mData.group_index];
    if(group != null)
    {
      var cols = group.rows[mData.row_index].cols;
      for(var i = mData.start_col_index; i <= mData.end_col_index; i++)
      {
        var col = cols[i];
        if(col.type == 'active')
        {
          col.price = mData.price;
          col.pricing_color = '#ffffff';

        }
      }
    }
    this.sort();
    console.log(this.groups);
    return {success: true, message: 'Successfully Marked Pricing'};
  }

  updateEventLayout(){

  }
}
