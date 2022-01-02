import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullpostComponent } from 'src/app/containers/fullpost/fullpost.component';
import { HomeComponent } from 'src/app/containers/home/home.component';
import { NewpostComponent } from 'src/app/containers/newpost/newpost.component';
import { ProfileUpdateComponent } from 'src/app/profile-update/profile-update.component';
import { EditorComponent } from '../editor/editor.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

const routes: Routes = [
      {path : "" , component : HomeComponent},
      {path : "create" , component : EditorComponent},
      {path : 'post/:id' , component : FullpostComponent},
      {path : 'post/:id/edit' , component : EditorComponent},
      //{path : 'user/:id' , component : UserProfileComponent},
      //{path : 'my-profile' , component : UserProfileComponent}
      {
        path : "user/:id" , component : UserProfileComponent,
        loadChildren : () => import('../user-profile/user-profile.module')
        .then((m) => m.UserProfileModule)
      },
      {
        path : "my-profile" , component : UserProfileComponent,
        loadChildren : () => import('../user-profile/user-profile.module')
        .then((m) => m.UserProfileModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
