export class Layout {
  currentSequences = { currentGroupSequence: 1, next_group_index: 0};
  groups = [];

  constructor(){
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
        if(col.blank == true || col.path == true)
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
      this.currentSequences = layout["currentSequences"];
      this.groups = layout["groups"];
    }
  }

  export()
  {
    var layout = { currentSequences: this.currentSequences, groups: this.groups  };
    return layout;
  }
}
