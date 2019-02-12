import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable ,  of } from 'rxjs';

import { User } from '../models/user';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  apiRoot = 'http://localhost:8000/api/users';

  constructor(private messageService: MessageService, private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
        this.messageService.add(`UserService: fetching all users`);
        return this.http.get<User[]>(this.apiRoot, {
          headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.authService.getToken()
          })
      });
  }
}
