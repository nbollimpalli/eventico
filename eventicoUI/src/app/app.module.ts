import 'zone.js/dist/zone';  // Included with Angular CLI.
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
import { ColorPickerModule } from 'ngx-color-picker';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SlideshowModule} from 'ng-simple-slideshow';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular-6-social-login";

import { UserService } from './event-user/shared/user.service';
import { EventService } from './events/shared/event.service';
import { EventTypeService } from './event-types/shared/event-type.service';
import { EventVenueService } from './event-venues/shared/event-venue.service';
//import { EventPriceService } from './event-prices/shared/event-type.service';
import { FileManagerService } from './shared-services/file-manager.service';
import { ApiFactoryService } from './shared-services/api-factory.service';
import { RestService } from './shared-services/rest.service'
import { DatetimeService } from './shared-services/datetime.service';
import { BookingService } from './bookings/shared/booking.service';
import { SeoService } from './shared-services/seo.service';
import { ManageUserService } from './event-user/users/shared/manage-user.service';
import { RoleService } from './event-user/users/roles/shared/role.service';

import { RegisterComponent } from './event-user/register/register.component';
import { LoginComponent } from './event-user/login/login.component';

import { UsersComponent } from './event-user/users/users.component';
import { UserComponent } from './event-user/users/user/user.component';
import { RolesComponent } from './event-user/users/roles/roles.component';
import { RoleComponent } from './event-user/users/roles/role/role.component';

//import { UpdateProfileComponent } from './event-user/settings/settings.component';
import { SettingsComponent } from './event-user/settings/settings.component';
import { EventUserComponent } from './event-user/event-user.component';

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

import { SelectRoleDialog } from './event-user/users/users.component';
import { UpdateRoleName } from './event-user/users/users.component';

// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2215681985332917")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("90679818586-qm4pcltmojh6g1gc7ib0al8cqlsif3sr.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

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
    SettingsComponent,
    EventUserComponent,
    BookingsComponent,
    BookingComponent,
    UsersComponent,
    UserComponent,
    RolesComponent,
    RoleComponent,
    SelectRoleDialog,
    UpdateRoleName,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ColorPickerModule,
    FlexLayoutModule,
    SlideshowModule,
    SocialLoginModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // <-- debugging purposes only
    ),
  ],
  entryComponents: [
    SelectRoleDialog,
    UpdateRoleName,
  ],
  providers: [SeoService, BookingService, DatetimeService, RestService, ApiFactoryService, FileManagerService, EventVenueService, EventTypeService, EventService, UserService, AuthGuard, AntiauthGuard, AdminauthGuard, SuperadminauthGuard,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  },
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
