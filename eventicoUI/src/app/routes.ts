import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AntiauthGuard } from './auth/antiauth.guard';
import { AdminauthGuard } from './auth/adminauth.guard';
import { SuperadminauthGuard } from './auth/superadminauth.guard';

import { RegisterComponent } from './event-user/register/register.component';
import { LoginComponent } from './event-user/login/login.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { EventsComponent } from './events/events.component';
import { NewEventComponent } from './events/new-event/new-event.component';

import { EventTypesComponent } from './event-types/event-types.component';
import { NewEventTypeComponent } from './event-types/new-event-type/new-event-type.component';

import { EventVenuesComponent } from './event-venues/event-venues.component';
import { NewEventVenueComponent } from './event-venues/new-event-venue/new-event-venue.component';

export const appRoutes: Routes = [
  { path: '', component: EventsComponent , pathMatch: 'full'},
  { path: 'signup', component: RegisterComponent, canActivate: [AntiauthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AntiauthGuard] },
  { path: 'events/event', component: NewEventComponent, canActivate: [AuthGuard] },
  { path: 'event-types', component: EventTypesComponent},
  { path: 'event-types/event-type', component: NewEventTypeComponent},
  { path: 'event-venues', component: EventVenuesComponent},
  { path: 'event-venues/event-venue', component: NewEventVenueComponent},
  {path: '**', component: EventsComponent }
];
