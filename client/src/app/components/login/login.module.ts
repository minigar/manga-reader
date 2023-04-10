import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "../../interceptors/jwt.interceptor";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  imports: [
    ToastModule,
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
