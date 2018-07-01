export class User {
  Email: string;
  Name: String;
  Mobile: string;
  Password: string;
  LoggedIn : Boolean;
  SendToMailId : String;
  SendToMobile : String;
  Permissions;
  ProfileUpdationPending : boolean;
  AgreeTerms : boolean;
  Subscribe : boolean;

  constructor()
  {
    this.ProfileUpdationPending = false;
    this.Permissions = {};
    this.AgreeTerms = true;
  }

  import(user_info)
  {
    if(user_info)
    {
      this.Email = user_info['email'];
      this.Name = user_info['name'];
      this.Mobile = user_info['mobile'];
      this.LoggedIn = user_info['logged_in'];
      this.SendToMailId = user_info['email'];
      this.SendToMobile = user_info['mobile'];
      if(user_info['permissions'])
      {
        for(var key in user_info['permissions'])
        {
          this.Permissions[key] = user_info['permissions'][key];
        }
      }
      this.Password = '';
    }
    this.ProfileUpdationPending = false;
  }

  export()
  {
    this.ProfileUpdationPending = true;
    var res = {
      email : this.Email,
      name : this.Name,
      mobile : this.Mobile,
      send_to_email : this.SendToMailId,
      send_to_mobile : this.SendToMobile,
    };
    return res;
  }

  export_register_info()
  {
    this.ProfileUpdationPending = true;
    var res = {
      email : this.Email,
      name : this.Name,
      mobile : this.Mobile,
      password : this.Password,
    };
    return res;
  }

  export_login_info()
  {
    this.ProfileUpdationPending = true;
    var res = {
      email : this.Email,
      password : this.Password
    }
    return res;
  }

  reset()
  {
      this.Email = '';
      this.Name = '';
      this.Mobile = '';
      this.Password = '';
      this.LoggedIn = null;
      this.SendToMailId = '';
      this.SendToMobile = '';
      this.ProfileUpdationPending = false;
  }
}
