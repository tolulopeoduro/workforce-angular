import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FullpostComponent } from 'src/app/containers/fullpost/fullpost.component';
import { AttributesComponent } from '../element/attributes/attributes.component';
import { ElementComponent } from '../element/element.component';
import { UserBoxComponent } from '../user-box/user-box.component';
import { MainComponent } from './main.component';
import { NavComponent } from '../nav/nav.component';
import { NewpostComponent } from 'src/app/containers/newpost/newpost.component';
import { HomeComponent } from 'src/app/containers/home/home.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ArticleLinkComponent } from '../article-link/article-link.component';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { PromptComponent } from '../prompt/prompt.component';
import { BioComponent } from '../user-profile/bio/bio.component';
import { PictureBoxComponent } from '../user-profile/picture-box/picture-box.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { ProfileUpdateComponent } from 'src/app/profile-update/profile-update.component';
import { ImgDialogComponent } from 'src/app/compoents/img-dialog/img-dialog.component';
import { ImageCropperComponent, ImageCropperModule } from 'ngx-image-cropper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CommentListComponent } from 'src/app/containers/fullpost/comment-list/comment-list.component';
import { CommentComponent } from 'src/app/containers/fullpost/comment/comment.component';

@NgModule({
  declarations: [
    HomeComponent,
    NewpostComponent,
    NavComponent,
    MainComponent,
    UserBoxComponent,
    ElementComponent,
    AttributesComponent,
    FullpostComponent,
    SpinnerComponent,
    WelcomeComponent,
    ArticleLinkComponent,
    TruncatePipe,
    PromptComponent,
    BioComponent,
    PictureBoxComponent,
    UserProfileComponent,
    ProfileUpdateComponent,
    ImgDialogComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ImageCropperModule,
  ]
})
export class MainModule { }
