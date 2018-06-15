export class Layout {
  currentSequences = { currentGroupSequence: 1, next_group_index: 0};
  groups = [];
  typeColors = { active: '#acb19b', na: '#d1d2cf', path: '#acb19b', blank: '#00000000' };
  typeIcons = { active: 'event_seat', na: 'event_seat', path: 'reorder', blank: 'event_seat' };
  typeActionDisabled = { active: 'false', na: 'true', path: 'true', blank: 'true' };
  layout_type = 'none';
  Id : number;
  priceList = [
    {
      value: 0,
      desc: 'Basic price',
      color: '#acb19b',
      label: 'Basic',
      status: 'active',
      name: 'default',
      count: 0
    }
  ];
  priceMap = {};

  constructor(){
    this.updatePricingMap();
  }

  getLayout()
  {
    return {groups: this.groups};
  }

  sort()
  {
    for(var i = 0; i<this.groups.length; i++)
    {
      for(var j = 0; j<this.groups[i].rows.length; j++)
      {
          this.groups[i].rows[j].cols.sort(this.sequence_compare_asc);
      }
      this.groups[i].rows.sort(this.sequence_compare_dec);
    }
    this.groups.sort(this.sequence_compare_dec);

  }

  sequence_compare_dec(objectA, objectB)
  {
    var a = Number(objectA.sequence);
    var b = Number(objectB.sequence);
    var retuVal = -1;
    if(b > a)
    {
      retuVal = 1;
    }
    return retuVal;
  }

  sequence_compare_asc(objectA, objectB)
  {
    var a = Number(objectA.sequence);
    var b = Number(objectB.sequence);
    var retuVal = -1;
    if(a > b)
    {
      retuVal = 1;
    }
    return retuVal;
  }

  renumber(cols)
  {
    var next_number = 1;
    if(cols != null)
    {
      for(var i = 0; i<cols.length; i++)
      {
        var col = cols[i];
        if(col.type == "blank" || col.type == "path")
        {
          col.number = 0;
        }
        else
        {
          col.number = next_number;
          next_number++;
        }

      }
    }
  }

  import(layout)
  {
    if(layout != null)
    {
      var inp_layout = layout['layout'];
      this.currentSequences = inp_layout["currentSequences"];
      this.groups = inp_layout["groups"];
      this.typeIcons = inp_layout["typeIcons"];
      this.typeActionDisabled = inp_layout["typeActionDisabled"];
      this.typeColors = inp_layout["typeColors"];
      this.layout_type = inp_layout["layout_type"];
      this.Id = inp_layout["id"];
    }
  }

  export()
  {
    var layout = { layout:
                    {
                      currentSequences: this.currentSequences,
                      groups: this.groups,
                      typeIcons: this.typeIcons,
                      typeActionDisabled: this.typeActionDisabled,
                      typeColors: this.typeColors,
                    },
                    layout_type: this.layout_type,
                    id: this.Id
                 }
    return layout;
  }

  getDefaultPrice()
  {
    for(var i=0 ; i < this.priceList.length ; i++)
    {
      var price = this.priceList[i];
      if(price.name == "default")
      {
        return price;
      }
    }
  }

  updatePricingMap()
  {
    for(var i=0 ; i < this.priceList.length ; i++)
    {
      var price = this.priceList[i];
      this.priceMap[price.name] = price;
    }
  }
}
