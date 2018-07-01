export class ManageUser {
  Id : String;
  Name : String;
  Email : String;
  Status : String;
  Role : String;
  constructor(user_info)
  {
    this.import(user_info);
  }

  import(user_info)
  {
    if(user_info)
    {
      this.Id = user_info['id'];
      this.Name = user_info['name'];
      this.Email = user_info['email'];
      this.Status = user_info['status'];
      this.Role = user_info['role'];
    }
  }

  export()
  {
    var res = {
     'id' : this.Id,
     'role' : this.Role,
     'status' : this.Status
    }
    return res;
  }


}
