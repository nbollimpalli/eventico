import { Component, OnInit  } from '@angular/core';
import { UserService } from './event-user/shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private userservice : UserService){}
  ngOnInit() {
    this.userservice.updateProfile();
  }
}
