import { Layout } from './layout.model';

export class EventLayout  extends Layout{
  mode: string;//supports event_venue, event, booking modes
  constructor(layout, mode)
  {
    super(mode);
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
        if(col.type == 'active')
        {
          col.type = 'na';
          this.priceMap[col.price].count--;
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
    if(mData.price_index == null)
    {
       return {success: false, message: 'please select a valid pricing details'};
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
          this.priceMap[col.price].count--;
          col.price = this.priceList[mData.price_index].name;
          this.priceMap[col.price].count++;
        }
      }
    }
    console.log(this.groups);
    return {success: true, message: 'Successfully Marked Pricing'};
  }

  addPricing(pData)
  {
    if(pData.label == null || pData.label == "" || pData.value == null || pData.desc == null || pData.desc == "")
    {
      return {success: false, message: 'invalid info provided, please make sure all the data is filled before adding new price'};
    }
    this.priceList.push(
    {
      value: pData.value,
      desc: pData.desc,
      color: '#acb19b',
      label: pData.label,
      status: 'active',
      name: pData.desc.slice(0,-1).replace(/\s/g, ""),
      count: 0,
      taxes: [],
    }
    );
    this.updatePricingMap();
    return {success: true, message: 'Successfully added new Pricing'};

  }

  addTax(tData)
  {
    if(tData.label == null || tData.label == "" || tData.value == null)
    {
      return {success: false, message: 'Invalid info provided, please make sure all the data is filled before adding new tax detail'};
    }
    if(tData.type != "absolute" || (tData.desc != "percent"))
    {
      return {success: false, message: 'Invalid tax type'};
    }

    if(tData.applicable_object == null || tData.applicable_object == "" || tData.applicable_object == undefined)
    {
      return {success: false, message: 'Invalid Applicable object information'}
    }
  }



  updateEventLayout(){

  }
}
