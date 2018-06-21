export class Role {
  Id : String;
  Name : String;
  Permissions;
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
      debugger;
    }
  }

  export()
  {
    var res = {
      id: this.Id,
      name: this.Name,
      permissions: this.Permissions
    }
    return res;
  }
}
