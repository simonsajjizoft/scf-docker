import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlnDetailsComponent } from './components/capture-forms/gln-details/gln-details.component';
import { ProsyncHomeComponent } from './components/prosync-demo/prosync-home/prosync-home.component';


const routes: Routes = [
    { path: '', component: LandingPageComponent, 
      children: [
        { path: '', component: ProsyncHomeComponent },
        { path: 'capture-form', component: GlnDetailsComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
 
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
