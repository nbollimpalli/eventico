import { Component, OnInit, Inject } from '@angular/core';
import {PageEvent} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ManageUserService } from './shared/manage-user.service';
import { ManageUser } from './shared/manage-user.model';
import { Role } from './shared/role.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})



export class UsersComponent implements OnInit {
  pageEvent: PageEvent;
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  users = [];
  roles = [];
  update_permission_role = null;
  constructor(public dialog: MatDialog, private manageUserService : ManageUserService) {
    this.manageUserService.fetchUsers().subscribe( (data) => {
        if(data)
        {
          if(data['users'])
          {
            for(var i = 0; i<data['users'].length; i++)
            {
              var mu = new ManageUser(data['users'][i]);
              this.users.push(mu);
            }
          }
          if(data['roles'])
          {
            for(var i = 0; i<data['roles'].length; i++)
            {
              var role = new Role(data['roles'][i]);
              this.roles.push(role);
            }
          }
        }
        console.log(this.roles);
      }
    );
  }

  ngOnInit() {
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  selectRole(user)
  {
    let dialogRef = this.dialog.open(SelectRoleDialog, {
      width: '250px',
      data: { roles : this.roles, user : user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'updated')
      {
        this.manageUserService.updateManageUser(user).subscribe( (data) => {
        });
      }
    });
  }

  updateRoleName(role)
  {
    let dialogRef = this.dialog.open(UpdateRoleName, {
      width: '600px',
      data: {role : role}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'updated')
      {
        this.manageUserService.upsertRole(role).subscribe( (data) => {
        });
      }
    });
  }

  goto_permission_view(role)
  {
    this.update_permission_role = role;
    debugger;
  }

  goto_role_view()
  {
    this.update_permission_role = null;
  }

  update_permission()
  {
  }

}


@Component({
  selector: 'pick-user-role',
  templateUrl: './pick-user-role.html',
})

export class SelectRoleDialog {

  constructor(
    public dialogRef: MatDialogRef<SelectRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'update-role-name',
  templateUrl: './update-role-name.html',
})

export class UpdateRoleName {

  constructor(
    public dialogRef: MatDialogRef<UpdateRoleName>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
