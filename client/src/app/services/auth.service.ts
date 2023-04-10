import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,  Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { SignupLoginResponseModel } from '../models/signup.login.response.model';
import { SignupModel } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  public login(body: LoginModel): Observable<SignupLoginResponseModel> {
    return this.httpClient.post<SignupLoginResponseModel>(`${environment.apiUrl}/auth/login`, body);
  }

  public signup(body: SignupModel): Observable<SignupLoginResponseModel> {
    return this.httpClient.post<SignupLoginResponseModel>(`${environment.apiUrl}/auth/signup`, body);
  }

  public logout(): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}/auth/logout`, {});
  }

  public getToken(): string {
    return localStorage.getItem('access_token')!;
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

}
