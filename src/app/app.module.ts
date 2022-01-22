import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers/userReducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentListComponent } from './containers/fullpost/comment-list/comment-list.component';
import { CommentComponent } from './containers/fullpost/comment/comment.component';
import { AuthorComponent } from './components/author/author.component';
import { NavDropdownComponent } from './components/nav/nav-dropdown/nav-dropdown.component';
import { NameDialogComponent } from './components/name-dialog/name-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({user : userReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
