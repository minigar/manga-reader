import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(body: LoginModel): Observable<LoginModel> {
    return this.httpClient.post<LoginModel>(`${environment.apiUrl}/auth/login`, body);
  }

  public signup(body: LoginModel): Observable<LoginModel> {
    return this.httpClient.post<LoginModel>(`${environment.apiUrl}/auth/login`, body);
  }

}
