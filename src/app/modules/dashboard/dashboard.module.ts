import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module ';
import { ColorPickerModule } from 'ngx-color-picker';


import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SecondHeaderComponent } from './components/second-header/second-header.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
   LandingPageComponent,
   SecondHeaderComponent,
   SideBarComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    ColorPickerModule 
  ]
})
export class DashboardModule {}
