import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TitlesResponse } from '../models/title.response';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  constructor(private httpClient: HttpClient) { }

  public getAllTitles(): Observable<TitlesResponse> {
    return this.httpClient.get<TitlesResponse>(`${environment.apiUrl}/titles`);
  }

}
