import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';


const routes: Routes = [
    { path: '', component: LandingPageComponent, 
      children: [
     

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
