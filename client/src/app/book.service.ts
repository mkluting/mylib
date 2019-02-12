import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable ,  of } from 'rxjs';


import { Book } from '../models/book';
import { BOOKS } from '../models/mock-books';
import { MessageService } from './message.service';
import {AuthService} from "./auth.service";

@Injectable()
export class BookService {

  apiRoot = 'http://localhost:8000/api/books';

  constructor(private messageService: MessageService, private http: HttpClient, private authService: AuthService) { }

  getBooks(): Observable<Book[]> {
        this.messageService.add(`BookService: fetching all books`);
        return this.http.get<Book[]>(this.apiRoot, {
          headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.authService.getToken()
          })
      });
  }

  // @TODO needs db
  getBook(id: number): Observable<Book> {
        this.messageService.add(`BookService: fetched book id=${id}`);
        return this.http.get<Book>(this.apiRoot + '/' + id, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getToken()
            })
        });
  }

  editBook(id: number, book: Book) {
      this.messageService.add(`BookService: editing book id=${id} with data ${JSON.stringify(book)}`);
      const data = {
          'title': book.title,
          'author_first': book.author_first,
          'author_last': book.author_last,
          'format': book.format,
          'series': book.series,
          'series_num': book.series_num,
          'isbn_13': book.isbn_13,
          'isbn_10': book.isbn_10,
          'owner': book.owner
        };
        return this.http.put<Response>(this.apiRoot + '/' + id, data, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getToken()
            })
        });
  }


  // @TODO needs DB
  addBook(book: Book): Observable<Response> {
    this.messageService.add(`BookService: adding book with data ${JSON.stringify(book)}`);
    // add the book
    const data = {
      'title': book.title,
      'author_first': book.author_first,
      'author_last': book.author_last,
      'format': book.format,
      'series': book.series,
      'series_num': book.series_num,
      'isbn_13': book.isbn_13,
      'isbn_10': book.isbn_10,
      'owner': book.owner
    };

     return this.http.post<Response>(this.apiRoot, data, {
         headers: new HttpHeaders({
             Authorization: 'Bearer ' + this.authService.getToken()
         })
     });
  }

  // @TODO needs DB
  removeBook(id: number): Observable<Response>{
    this.messageService.add(`BookService: removing book id=${id}`);
    return this.http.delete<Response>(this.apiRoot + '/' + id, {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.authService.getToken()
        })
    });
  }

}
