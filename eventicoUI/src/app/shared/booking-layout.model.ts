import { Layout } from './layout.model';

export class BookingLayout extends Layout{
  selection_info = {
    total : 0,
    qty : 0,
    selection_summary : [],
    summary_map : {},
    selected_seats : {},
  }

  constructor(layout, mode){
    super(mode);
    this.import(layout);
  }

  pollAndUpdate(){

  }



  selectSeat(seat){
    console.log(seat);
    var summary = this.selection_info['selection_summary'];
    var summary_map = this.selection_info['summary_map'];
    var selection = seat['selected'];
    if(selection != true)
    {
      seat['selected'] = true;
      var price_val = this.priceMap[seat.price].value;
      var summary_unit = summary_map[seat.price];
      this.selection_info.selected_seats[seat.lid] = seat;
      if(summary_unit)
      {
        summary_unit['qty'] = summary_unit['qty'] + 1;
        summary_unit['sub_total'] = summary_unit['sub_total'] + price_val;
      }
      else
      {
        summary_unit = { qty: 1, price: seat.price , sub_total: price_val};
        summary_map[seat.price] = summary_unit;
        summary.push(summary_unit);
      }
      this.selection_info['total'] = this.selection_info['total'] + price_val;
      this.selection_info['qty'] = this.selection_info['qty'] + 1;
    }
    else
    {
      seat['selected'] = false;
      var price_val = this.priceMap[seat.price].value;
      var summary_unit = summary_map[seat.price];
      if(summary_unit)
      {
        summary_unit['qty'] = summary_unit['qty'] - 1;
        summary_unit['sub_total'] = summary_unit['sub_total'] - price_val;
        this.selection_info['total'] = this.selection_info['total'] - price_val;
        this.selection_info['qty'] = this.selection_info['qty'] - 1;
        delete this.selection_info.selected_seats[seat.lid];
      }
    }
  }

  removeSelection(summary_unit)
  {
    var seat_price = summary_unit.price;
    for(var key in this.selection_info.selected_seats)
    {
      var seat = this.selection_info.selected_seats[key];
      if(seat.price == seat_price)
      {
        seat['selected'] = false;
        delete this.selection_info.selected_seats[seat.lid];
      }
    }
    this.selection_info['total'] = this.selection_info['total'] - summary_unit['sub_total'];
    this.selection_info['qty'] = this.selection_info['qty'] - summary_unit['qty'];
    this.resetSummaryUnit(summary_unit);
  }

  resetSummaryUnit(summary_unit)
  {
    summary_unit['qty'] = 0;
    summary_unit['sub_total'] = 0;
  }

  export_selected_seats()
  {
    return this.selection_info.selected_seats;
  }

  getBlockedSeats(){

  }



}
