import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {
    form: FormGroup;
    redirectUrl: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
      this.form = this.fb.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit() {
      this.route.queryParams.subscribe(params => this.redirectUrl = params['return'] || '/books');
      if (this.authService.isLoggedIn()) {
          this.router.navigateByUrl(this.redirectUrl);
      } else {
          this.authService.logout();
      }
  }

  goToLogin() {
      this.router.navigateByUrl('/login');
  }

  createAccount() {
      if (this.form.invalid) {
          return;
      }

      const val = this.form.value;
      if (val.username) {
          this.authService.create(val.username, '')
              .subscribe(
                  () => {
                      console.log('User created');
                      if (this.redirectUrl) {
                          this.router.navigate([this.redirectUrl]);
                          this.redirectUrl = null;
                      }
                  }
              );
      }
  }

}
