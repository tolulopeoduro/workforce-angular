import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './containers/home/home.component';
import { NewpostComponent } from './containers/newpost/newpost.component';

const routes: Routes = [
  {
    path : "" , component : MainComponent,
    children : [
      {path : "" , component : HomeComponent},
      {path : "create" , component : NewpostComponent}
    ]
  },
  {path : "login" , component : LoginComponent},
  {path : "signup" , component : SignupComponent},
  {path : "create" , component : NewpostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
