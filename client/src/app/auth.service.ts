import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import {BehaviorSubject, Observable, of as observableOf, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // @TODO add in auth key for login and create and check db for match

    apiLoginUrl = 'http://localhost:8000/api/account/login';
    apiCreateUrl = 'http://localhost:8000/api/account/create';
    loggedIn$ = new Subject();

    constructor(private http: HttpClient) {
        this.loggedIn$.next(false);
    }

    loginByUsername(username: string) {
        return this.http.post(this.apiLoginUrl, {username})
            .pipe(tap(res => { this.setSession(res); this.loggedIn$.next(true); }))
            .pipe(shareReplay());
    }

    login(email: string, password: string) {
        return this.http.post(this.apiLoginUrl, {email, password})
            .pipe(tap(res => { this.setSession(res); this.loggedIn$.next(true); }))
            .pipe(shareReplay());
    }

    create(email: string, password: string) {
        return this.http.post(this.apiCreateUrl, {email, password})
            .pipe(tap(res => { this.setSession(res); this.loggedIn$.next(true); }))
            .pipe(shareReplay());
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at')
        this.loggedIn$.next(false);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration()) && localStorage.getItem('id_token');
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);

        return moment(expiresAt);
    }

    getToken() {
        return localStorage.getItem('id_token');
    }
}
