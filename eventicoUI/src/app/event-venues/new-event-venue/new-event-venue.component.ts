import { Component, OnInit } from '@angular/core';
import { EventVenue } from '../shared/event-venue.model';
import { EventVenueService } from '../shared/event-venue.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventVenueLayout } from '../../shared/event-venue-layout.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import {FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-event-venue',
  templateUrl: './new-event-venue.component.html',
  styleUrls: ['./new-event-venue.component.css']
})
export class NewEventVenueComponent implements OnInit {
  eventVenue : EventVenue;
  eventVenueLayout : EventVenueLayout;
  markEmptyControl: FormControl = new FormControl();

  constructor(private eventVenueService : EventVenueService, private router : Router, public dialog: MatDialog, private route : ActivatedRoute)
  {
    this.route.params.subscribe(params => this.setupEventVenue(params['id']));
  }

  setupEventVenue(id)
  {
    if(id != null || id != '')
    {
      this.eventVenueService.getEventVenue(id)
      .subscribe( (data) => {
        debugger;
        var obj = JSON.parse(data.toString());
        this.eventVenue = this.eventVenueService.makeEventVenueObject(obj[0]);
        this.eventVenueLayout = this.eventVenue.eventVenueLayout;
        console.log(this.eventVenue);
      }
      );
    }
    else
    {
      this.eventVenue = new EventVenue({});
      this.eventVenueLayout = this.eventVenue.eventVenueLayout;
    }
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form != null)
    {
      form.reset();
      this.eventVenue = new EventVenue({});
    }
  }

  resetAddGroupForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.addGroupFormData =
      {
        group_name: null,
        rows: null,
        cols: null,
      };
    }
  }

  resetMarkEmptyForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.markEmptyFormData.group_index = -1;
      this.markEmptyFormData.row_index = -1;
      this.markEmptyFormData.start_col_index = -1;
      this.markEmptyFormData.end_col_index = -1;
    }
  }

  resetAddPathForm(form? : NgForm)
  {
    if(form != null)
    {
      form.reset();
      this.addPathFormData.group_index = -1;
      this.addPathFormData.col_index = -1;
    }
  }

  onSubmit(form : NgForm) {
    this.eventVenueService.createEventVenue(this.eventVenue)
    .subscribe( (data) => {
      this.resetForm(form);
      this.router.navigate(['']);
    }
    );
  }

  addGroup(form : NgForm)
  {
    console.log(this.addGroupFormData);
    var response = this.eventVenueLayout.addGroup(this.addGroupFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetAddGroupForm(form);
  }

  addPath(form : NgForm) : void
  {
    console.log(this.addPathFormData);
    var response = this.eventVenueLayout.addPath(this.addPathFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetAddPathForm(form);
  }

  markEmpty(form : NgForm) : void
  {
    console.log(this.addGroupFormData);
    var response = this.eventVenueLayout.markEmpty(this.markEmptyFormData);
    if(response.success)
    {
    }
    else
    {
      alert(response.message);
    }
    this.resetMarkEmptyForm(form);
  }

  upsertEventVenue()
  {
    this.eventVenueService.upsertEventVenue(this.eventVenue)
    .subscribe( (data) => {
      this.router.navigate(['']);
    }
    );
  }
//  openAddGroupDialog(): void {
//    let dialogRef = this.dialog.open(FormDialogComponent, {
//      width: '40%',
//      data: this.addNewGroupDialogData
//    });
//
//    dialogRef.afterClosed().subscribe(result => {
//      console.log('The dialog was closed');
//    });
//  }
//
//  openAddMarkEmptyDialog(): void {
//    let dialogRef = this.dialog.open(FormDialogComponent, {
//      width: '40%',
//      data: this.markEmptyDialogData
//    });
//
//    dialogRef.afterClosed().subscribe(result => {
//      console.log('The dialog was closed');
//    });
//  }
//
//  openAddPathDialog(): void {
//    let dialogRef = this.dialog.open(FormDialogComponent, {
//      width: '40%',
//      data: this.addPathDialogData
//    });
//
//    dialogRef.afterClosed().subscribe(result => {
//      console.log('The dialog was closed');
//    });
//  }

  get layout_groups(){
    return this.eventVenueLayout.groups;
  }

  addPathDialogData =
  {
    title: 'Update Path Tool',
    fields:
      [
        {field_type: 'text', name: 'Group Name',default_value: '', value: ''},
        {field_type: 'number', name: 'Column',default_value: 0, value: 0}
      ]
  };

  markEmptyDialogData =
  {
    title: 'Mark Empty Tool',
    fields:
      [
        {field_type: 'text', name: 'Group Name',default_value: '', value: ''},
        {field_type: 'number', name: 'Row',default_value: 0, value: 0},
        {field_type: 'number', name: 'Start Column',default_value: 1, value: 1},
        {field_type: 'number', name: 'End Column',default_value: 1, value: 1}
      ]
  };

  addNewGroupDialogData =
  {
    title: 'Create New Group',
    fields:
      [
        {field_type: 'text', name: 'Group Name',default_value: '', value: ''},
        {field_type: 'number', name: 'Rows',default_value: 0, value: 0},
        {field_type: 'number', name: 'Columns',default_value: 0, value: 0}
      ]
  };



  addGroupFormData =
  {
    group_name: '',
    rows: -1,
    cols: -1,
  };

  markEmptyFormData =
  {
    group_index: -1,
    row_index: -1,
    start_col_index: -1,
    end_col_index: -1,
  };

  addPathFormData =
  {
    group_index: -1,
    col_index: -1
  };
}

