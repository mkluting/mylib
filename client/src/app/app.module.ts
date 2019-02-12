import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatTabsModule,
    MatSelectModule, MatListModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookService } from './book.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { PagerService } from './pager.service';
import { CoverService } from './cover.service';
import { MovieService } from './movie.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

import { AppRoutingModule } from './app-routing.module';
import { BookCreateComponent } from './book-create/book-create.component';
import { NavComponent } from './nav/nav.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { LoginComponent } from './login/login.component';
import { AccountCreateComponent } from './account-create/account-create.component';



@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    MessagesComponent,
    BookCreateComponent,
    NavComponent,
    MoviesComponent,
    MovieCreateComponent,
    MovieDetailComponent,
    LoginComponent,
    AccountCreateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
      MatListModule,
    MatTabsModule,
      MatToolbarModule,
    MatButtonModule,
      FlexLayoutModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
      MatListModule,
      MatToolbarModule,
    MatButtonModule,
      FlexLayoutModule
  ],
  providers: [ BookService, MovieService, MessageService, CoverService, PagerService, UserService, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
