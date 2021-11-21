import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullpostComponent } from 'src/app/containers/fullpost/fullpost.component';
import { HomeComponent } from 'src/app/containers/home/home.component';
import { NewpostComponent } from 'src/app/containers/newpost/newpost.component';

const routes: Routes = [
      {path : "" , component : HomeComponent},
      {path : "create" , component : NewpostComponent},
      {path : 'post/:id' , component : FullpostComponent},
      {path : 'post/:id/edit' , component : NewpostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
