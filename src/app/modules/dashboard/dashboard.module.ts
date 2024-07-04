import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module ';
import { ColorPickerModule } from 'ngx-color-picker';


import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SecondHeaderComponent } from './components/second-header/second-header.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ListViewComponent } from './components/capture-forms/list-view/list-view.component';
import { GtinFormDetailsComponent } from './components/capture-forms/gtin-form-details/gtin-form-details.component';
import { GlnDetailsComponent } from './components/capture-forms/gln-details/gln-details.component';
import { GtinsListComponent } from './components/home-gtins/gtins-list/gtins-list.component';
import { GtinsHomeComponent } from './components/home-gtins/gtins-home/gtins-home.component';


@NgModule({
  declarations: [
   LandingPageComponent,
   SecondHeaderComponent,
   SideBarComponent,
   ListViewComponent,
   GtinFormDetailsComponent,
   GlnDetailsComponent,
   GtinsListComponent,
   GtinsHomeComponent
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
