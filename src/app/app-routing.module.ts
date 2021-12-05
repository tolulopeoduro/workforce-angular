import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path : "" , component : MainComponent,
    loadChildren : () => import('./components/main/main.module')
    .then((m) => m.MainModule)
  },
  {path : "login" , component : LoginComponent},
  {path : "signup" , component : SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
