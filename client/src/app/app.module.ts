import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './components/login/login-routing.module';
import { LoginModule } from './components/login/login.module';
import { SignupRoutingModule } from './components/signup/signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupModule } from './components/signup/signup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ComicsListModule } from './components/comics-list/comics-list.module';
import { ComicsListRoutingModule } from './components/comics-list/comics-list-routing.module';
import { MessageService } from 'primeng/api';
import { ComicsDetailsRoutingModule } from './components/comics-details/comics-details-routing.module';
import { ComicsDetailsModule } from './components/comics-details/comics-details.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
    LoginModule,
    SignupRoutingModule,
    SignupModule,
    ComicsListRoutingModule,
    ComicsListModule,
    ComicsDetailsRoutingModule,
    ComicsDetailsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
