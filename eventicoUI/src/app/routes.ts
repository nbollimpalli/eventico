import { Routes } from '@angular/router';
import { RegisterComponent } from './event-user/register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './event-user/login/login.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { AuthGuard } from './auth/auth.guard';
import { AntiauthGuard } from './auth/antiauth.guard';
import { AdminauthGuard } from './auth/adminauth.guard';
import { SuperadminauthGuard } from './auth/superadminauth.guard';

export const appRoutes: Routes = [
  { path: '', component: EventsComponent , pathMatch: 'full'},
  { path: 'signup', component: RegisterComponent, canActivate: [AntiauthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AntiauthGuard] },
  { path: 'event/new', component: NewEventComponent, canActivate: [AuthGuard] },
  {path: '**', component: EventsComponent }
];
