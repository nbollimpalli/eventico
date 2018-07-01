import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AntiauthGuard } from './auth/antiauth.guard';

import { RegisterComponent } from './event-user/register/register.component';
import { LoginComponent } from './event-user/login/login.component';
import { UsersComponent } from './event-user/users/users.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { EventsComponent } from './events/events.component';
import { NewEventComponent } from './events/new-event/new-event.component';

import { EventTypesComponent } from './event-types/event-types.component';
import { NewEventTypeComponent } from './event-types/new-event-type/new-event-type.component';

import { EventVenuesComponent } from './event-venues/event-venues.component';
import { NewEventVenueComponent } from './event-venues/new-event-venue/new-event-venue.component';

import { BookingsComponent } from './bookings/bookings.component';
import { BookingComponent } from './bookings/booking/booking.component';



export const appRoutes: Routes = [
  { path: '', component: EventsComponent , pathMatch: 'full'},
  { path: 'signup', component: RegisterComponent, canActivate: [AntiauthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AntiauthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'events/event', component: NewEventComponent, canActivate: [AuthGuard] },
  { path: 'event-types', component: EventTypesComponent, canActivate: [AuthGuard]},
  { path: 'event-types/event-type', component: NewEventTypeComponent, canActivate: [AuthGuard]},
  { path: 'event-venues', component: EventVenuesComponent, canActivate: [AuthGuard]},
  { path: 'event-venues/event-venue', component: NewEventVenueComponent, canActivate: [AuthGuard]},
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]},
  { path: 'bookings/booking', component: BookingComponent},
  {path: '**', component: EventsComponent }
];
