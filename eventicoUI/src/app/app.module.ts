import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AuthGuard } from './auth/auth.guard';
import { AntiauthGuard } from './auth/antiauth.guard';
import { AdminauthGuard } from './auth/adminauth.guard';
import { SuperadminauthGuard } from './auth/superadminauth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './auth/auth.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { appRoutes } from './routes';

import { UserService } from './event-user/shared/user.service';
import { EventService } from './events/shared/event.service';
import { EventTypeService } from './event-types/shared/event-type.service';
import { EventVenueService } from './event-venues/shared/event-venue.service';
//import { EventPriceService } from './event-prices/shared/event-type.service';



import { RegisterComponent } from './event-user/register/register.component';
import { LoginComponent } from './event-user/login/login.component';
//import { UpdateProfileComponent } from './event-user/login/login.component';
//import { SettingsComponent } from './event-user/login/login.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { EventsComponent } from './events/events.component';
import { NewEventComponent } from './events/new-event/new-event.component';

import { EventTypesComponent } from './event-types/event-types.component';
import { NewEventTypeComponent } from './event-types/new-event-type/new-event-type.component';

import { EventVenuesComponent } from './event-venues/event-venues.component';
import { NewEventVenueComponent } from './event-venues/new-event-venue/new-event-venue.component';

import { FormDialogComponent } from './form-dialog/form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    EventsComponent,
    LoginComponent,
    NewEventComponent,
    EventTypesComponent,
    NewEventTypeComponent,
    EventVenuesComponent,
    NewEventVenueComponent,
    FormDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // <-- debugging purposes only
    ),
  ],
  entryComponents: [
    FormDialogComponent,
  ],
  providers: [EventVenueService, EventTypeService, EventService, UserService, AuthGuard, AntiauthGuard, AdminauthGuard, SuperadminauthGuard,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  },
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
