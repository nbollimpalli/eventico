export class Permissions {
  AdminToolBar : Object;
  EventCard : Object;

  constructor()
  {
    this.AdminToolBar = {
      'allowed' : false,
      'newEvent':false,
      'reports':false,
      'manageUsers': false,

    }
  }
}
