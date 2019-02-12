import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NeedAuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const redirectUrl = route['_routerState']['url'];

        if (this.auth.isLoggedIn()){
            return true;
        }

        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/login'], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );

        return false;
    }


}
