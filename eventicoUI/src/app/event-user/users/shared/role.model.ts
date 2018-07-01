export class Role {
  Id : string;
  Name : string;
  Permissions;
  modifiedPems = [];
  constructor(role_info)
  {
    this.import(role_info)
  }

  import(role_info)
  {
    if(role_info)
    {
      this.Id = role_info['id'];
      this.Name = role_info['display_name'];
      this.Permissions = role_info['permissions'];
      this.modifiedPems = [];
    }
  }

  export()
  {
    var res = {
      id: this.Id,
      name: this.Name,
      permissions: this.Permissions,
      modifiedPems: this.modifiedPems,
    }
    return res;
  }
}
