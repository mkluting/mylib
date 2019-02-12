import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  email: string;
  password: string;
  redirectUrl: string;
  users: User[];
  isLoading = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
      this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit() {
      this.route.queryParams
          .subscribe(params => this.redirectUrl = params['return'] || '/books');
      if (this.authService.isLoggedIn()) {
          console.log('logged in');
          this.router.navigateByUrl(this.redirectUrl);
      } else {
          console.log('not logged in');
          this.authService.logout();
          // get user list with avatars
          this.getUsersList();
      }
  }

  getUsersList() {
      this.userService.getUsers()
          .subscribe(users => { this.users = users; this.isLoading = false; }, err => { console.log('error getting users'); } );
  }

  login(username) {
      // if (this.form.invalid) {
      //     return;
      // }
      // const val = this.form.value;
      //
      // if (val.email && val.password) {
      //    console.log(val.email + ' ' + val.password);
          this.authService.loginByUsername(username)
              .subscribe(
                  () => {
                      console.log('User is logged in');
                      if (this.redirectUrl) {
                          this.router.navigate([this.redirectUrl]);
                          this.redirectUrl = null;
                      }
                  }
              );
      // }
  }

  goToCreate() {
      this.router.navigateByUrl('/create-account');
  }

}
