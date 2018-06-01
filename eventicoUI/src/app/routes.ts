import { Routes } from '@angular/router';
import { RegisterComponent } from './event-user/register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './event-user/login/login.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { AuthGuard } from './auth/auth.guard';
import { AntiauthGuard } from './auth/antiauth.guard';
import { AdminauthGuard } from './auth/adminauth.guard';
import { SuperadminauthGuard } from './auth/superadminauth.guard';
import { EventTypesComponent } from './event-types/event-types.component';
import { NewEventTypeComponent } from './event-types/new-event-type/new-event-type.component';
import { EditEventTypeComponent } from './event-types/edit-event-type/edit-event-type.component';

export const appRoutes: Routes = [
  { path: '', component: EventsComponent , pathMatch: 'full'},
  { path: 'signup', component: RegisterComponent, canActivate: [AntiauthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AntiauthGuard] },
  { path: 'event/new', component: NewEventComponent, canActivate: [AuthGuard] },
  { path: 'event/update', component: EditEventComponent, canActivate: [AuthGuard] },
  { path: 'event-types', component: EventTypesComponent},
  { path: 'event-types/new', component: NewEventTypeComponent},
  { path: 'event-types/update', component: EditEventTypeComponent},
  {path: '**', component: EventsComponent }
];
