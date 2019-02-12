import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import {LoginComponent} from "./login/login.component";
import {NeedAuthGuard} from "./needAuthGuard";
import {AccountCreateComponent} from "./account-create/account-create.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'books', component: BooksComponent, canActivate: [NeedAuthGuard] },
  { path: 'book-create', component: BookCreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'book-detail/:id', component: BookDetailComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [NeedAuthGuard] },
  { path: 'movie-create', component: MovieCreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'movie-detail/:id', component: MovieDetailComponent, canActivate: [NeedAuthGuard] },
  { path: 'create-account', component: AccountCreateComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
