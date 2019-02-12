import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable ,  of } from 'rxjs';


import { Movie } from '../models/movie';
import { MOVIES } from '../models/mock-movies';
import { MessageService } from './message.service';
import {AuthService} from "./auth.service";

@Injectable()
export class MovieService {

  apiRoot = 'http://localhost:8000/api/movies';

  constructor(private messageService: MessageService, private http: HttpClient, private authService: AuthService) { }

  getMovies(): Observable<Movie[]> {
        this.messageService.add(`MovieService: fetching all movies`);
        return this.http.get<Movie[]>(this.apiRoot, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getToken()
            })
        });
  }

  // @TODO needs db
  getMovie(id: number): Observable<Movie> {
        this.messageService.add(`MovieService: fetched movie id=${id}`);
        return this.http.get<Movie>(this.apiRoot + '/' + id, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getToken()
            })
        });
  }

  editMovie(id: number, movie: Movie) {
      this.messageService.add(`MovieService: editing movie id=${id} with data ${JSON.stringify(movie)}`);
        const data = {
          'title': movie.title,
          'series': movie.series,
          'series_num': movie.series_num,
          'owner': movie.owner
        };
        return this.http.put<Response>(this.apiRoot + '/' + id, data, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getToken()
            })
        });
  }


  // @TODO needs DB
  addMovie(movie: Movie): Observable<Response> {
    this.messageService.add(`MovieService: adding movie with data ${JSON.stringify(movie)}`);
    // add the movie
    const data = {
      'title': movie.title,
      'director': movie.director,
      'format': movie.format,
      'series': movie.series,
      'series_num': movie.series_num,
      'owner': movie.owner
    };

     return this.http.post<Response>(this.apiRoot, data, {
         headers: new HttpHeaders({
             Authorization: 'Bearer ' + this.authService.getToken()
         })
     });
  }

  // @TODO needs DB
  removeMovie(id: number): Observable<Response>{
    this.messageService.add(`MovieService: removing movie id=${id}`);
    return this.http.delete<Response>(this.apiRoot + '/' + id, {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.authService.getToken()
        })
    });
  }

}
