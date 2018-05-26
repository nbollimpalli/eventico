import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './event-user/shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './event-user/register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './event-user/login/login.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { MaterialModule } from './material.module';
import { AuthGuard } from './auth/auth.guard';
import { AntiauthGuard } from './auth/antiauth.guard';
import { AdminauthGuard } from './auth/adminauth.guard';
import { SuperadminauthGuard } from './auth/superadminauth.guard';
import { appRoutes } from './routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    EventsComponent,
    LoginComponent,
    NewEventComponent
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
  providers: [UserService, AuthGuard, AntiauthGuard, AdminauthGuard, SuperadminauthGuard,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
