export class Layout {
  currentSequences = { currentGroupSequence: 1, next_group_index: 0};
  groups = [];
  typeColors = { active: '#acb19b', na: '#d1d2cf', path: '#acb19b', blank: '#00000000' , selected: '#d1d2cf', blocked: '#d1d2cf'};
  typeIcons = { active: 'event_seat', na: 'event_seat', path: 'reorder', blank: 'event_seat' };
  typeActionDisabled = { active: 'false', na: 'true', path: 'true', blank: 'true' };
  layout_type = 'none';
  Id : number;
  mode : string;
  lid_col_map = {};

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

  constructor(mode){
    this.mode = mode;
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
    if(layout != null && this.mode == 'edit' && Object.keys(layout).length > 0)
    {
      var inp_layout = layout['layout'];
      this.currentSequences = inp_layout["currentSequences"];
      this.groups = inp_layout["groups"];
      this.typeIcons = inp_layout["typeIcons"];
      this.typeActionDisabled = inp_layout["typeActionDisabled"];
      this.typeColors = inp_layout["typeColors"];
      this.layout_type = layout["layout_type"];
      this.importPriceList(inp_layout["priceList"]);
      this.Id = layout["id"];
      this.updatePricingMap();
      this.generateLidColMap();
    }
  }

  importPriceList(inpPriceList)
  {
    if(inpPriceList != null)
    {
      for(var i = 0; i<inpPriceList.length; i++)
      {
        var p = inpPriceList[i];
        if(p['name'] == "default")
        {
          var defPrice = this.priceMap['default'];
          defPrice['value'] = p['value'];
          defPrice['desc'] = p['desc'];
          defPrice['color'] = p['color'];
          defPrice['label'] = p['label'];
          defPrice['status'] = p['status'];
          defPrice['name'] = p['name'];
          defPrice['count'] = p['count'];
        }
        else
        {
          this.priceList.push(p);
        }
      }
      this.updatePricingMap();
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
                      priceList: this.priceList,
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

  generateLidColMap()
  {
    for(var i = 0; i<this.groups.length; i++)
    {
      for(var j = 0; j<this.groups[i].rows.length; j++)
      {
          for(var k = 0; k<this.groups[i].rows[j].cols.length; k++)
          {
              var col = this.groups[i].rows[j].cols[k];
              this.lid_col_map[col.lid] = col;
          }
      }
    }
  }
}
