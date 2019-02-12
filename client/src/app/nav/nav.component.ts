import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    routeLinks: any[];
    activeLinkIndex = -1;
    appName = 'MyLib v0.1';
    loggedIn = false;
    defaultRouteLinks = [
        {
            label: 'Books',
            icon: 'book',
            link: './books',
            index: 0
        },
        {
            label: 'Movies',
            icon: 'theaters',
            link: './movies',
            index: 1
        }
    ];

  constructor(private auth: AuthService, private router: Router) {
      if (this.auth.isLoggedIn()) {
          this.loggedIn = true;
          this.routeLinks = this.defaultRouteLinks;
      } else {
          this.routeLinks = [];
      }
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });

    // Auth service subscription for login/logout
    this.auth.loggedIn$.subscribe((loggedIn) => {
            if (loggedIn) {
                this.routeLinks = this.defaultRouteLinks;
                this.loggedIn = true;
            } else {
                this.routeLinks = [];
                this.loggedIn = false;
            }
        });
  }

  logout() {
      this.auth.logout();
      this.router.navigateByUrl('/login');
  }

}
