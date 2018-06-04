import { Layout } from './layout.model';

export class EventVenueLayout extends Layout {


  constructor(layout){
    super();
    if(layout != null)
    {
      this.import(layout);
    }
  }

  addGroup(gData)
  {
      if(gData == null || gData.group_name == null || gData.rows == null || gData.cols == null)
      {
        return {success: false, message: 'please provide sufficient information to create a new group'};
      }
      if(gData.rows <= 0 || gData.cols <= 0 )
      {
        return {success: false, message: 'rows or columns cannot be less than or equal to 0'};
      }
      var group = {name: gData.group_name, rows: [], sequence: this.currentSequences.currentGroupSequence}
      this.currentSequences[group.sequence] = { currentRowSequence: 1, rows: {}, next_row_index: 0 };
      for(var i=0; i<gData.rows ; i++)
      {
        var row = {name: i+1, cols: [], sequence: this.currentSequences[group.sequence].currentRowSequence};
        this.currentSequences[group.sequence].rows[row.sequence] = {currentColSequence: 1, next_col_index: 0};
        for(var j=0; j<gData.cols ; j++)
        {
          var col = {number: j+1, sequence: this.currentSequences[group.sequence].rows[row.sequence].currentColSequence, path: false, blank: false, blocked: false, na: false, active: true };
          row.cols.push(col);
          this.currentSequences[group.sequence].rows[row.sequence].currentColSequence = this.currentSequences[group.sequence].rows[row.sequence].currentColSequence +1;
          this.currentSequences[group.sequence].rows[row.sequence].next_col_index = this.currentSequences[group.sequence].rows[row.sequence].next_col_index +1;
        }
        group.rows.push(row);
        this.currentSequences[group.sequence].currentRowSequence = this.currentSequences[group.sequence].currentRowSequence + 1;
        this.currentSequences[group.sequence].next_row_index = this.currentSequences[group.sequence].next_row_index + 1;
      }
      this.groups.push(group);
      this.currentSequences.currentGroupSequence = this.currentSequences.currentGroupSequence + 1;
      this.currentSequences.next_group_index = this.currentSequences.next_group_index + 1;
      this.sort();
      console.log(this.groups);
      return {success: true, message: 'Successfully created the group'};

  }

  addPath(pData)
  {
    if( pData == null || pData.group_index == null || pData.col_index == null || pData.col_index <= 0 || pData.group_index < 0)
    {
       return {success: false, message: 'invalid group and rows are selected, please dont select 0th column or last column'};
    }
    var group_index = pData.group_index;
    var col_index = pData.col_index;

    var group = this.groups[group_index];
    if(group != null)
    {
      var rows = group.rows;
      if(rows != null)
      {
        for(var i = 0; i<rows.length; i++)
        {
          var row = rows[i];
          var currentCol = row.cols[col_index];
          var seq = currentCol.sequence;
          seq = seq + 0.1;
          row.cols.push({number: 0 , sequence: seq, path: true, blank: false, blocked: false, na: false, active: false});
        }
      }
    }
    this.sort();
    return {success: true, message: 'Successfully added the path'};
  }

  markEmpty(mData)
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
        if(col.path == false)
        {
          col.blank = true;
          col.blocked = false;
          col.na = false;
          col.active = false;
        }
      }
      this.renumber(cols);
    }
    console.log(this.groups);
    this.sort();
    return {success: true, message: 'Successfully Marked Empty'};

  }

  resetLayout()
  {
    this.currentSequences = { currentGroupSequence: 1, next_group_index: 0};
    this.groups = [];
  }

  updateEventLayout(){

  }
}
