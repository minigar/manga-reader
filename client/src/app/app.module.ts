import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './components/login/login-routing.module';
import { LoginModule } from './components/login/login.module';
import { SignupRoutingModule } from './components/signup/signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupModule } from './components/signup/signup.module';

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
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
