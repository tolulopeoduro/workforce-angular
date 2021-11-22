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
    TruncatePipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
