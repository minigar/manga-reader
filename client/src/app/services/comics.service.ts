import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TitlesResponse } from '../models/title.response';
import { ComicsDetailsResponseModel } from '../models/comics.details.response.model';
import { GenreResponseModel } from '../models/genre.response.model';
import { AuthorModel } from '../models/author.model'

@Injectable({
  providedIn: 'root'
})

export class ComicsService {

  constructor(private httpClient: HttpClient) { }

  public getAllTitles(params?: HttpParams): Observable<TitlesResponse> {
    return this.httpClient.get<TitlesResponse>(`${environment.apiUrl}/titles`, { params });
  }

  public getDifferentTitle(id: number): Observable<ComicsDetailsResponseModel> {
    return this.httpClient.get<ComicsDetailsResponseModel>(`${environment.apiUrl}/titles/${id}`);
  }

  public getAllGenres(): Observable<GenreResponseModel> {
    return this.httpClient.get<GenreResponseModel>(`${environment.apiUrl}/genres`);
  }

  public getAllAuthors(): Observable<GenreResponseModel> {
    return this.httpClient.get<GenreResponseModel>(`${environment.apiUrl}/authors`);
  }

  public getDifferentAuthors(id: number): Observable<AuthorModel> {
    return this.httpClient.get<AuthorModel>(`${environment.apiUrl}/authors/${id}`);
  }

}
