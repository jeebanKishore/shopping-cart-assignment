import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { SliderviewComponent } from './sliderview/sliderview.component';


@NgModule({
  declarations: [
    HomepageComponent,
    CategorylistComponent,
    SliderviewComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class HomepageModule { }
