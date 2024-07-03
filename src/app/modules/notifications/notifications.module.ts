import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsHomeComponent } from './components/notifications-home/notifications-home.component';
import { NotificationMessagesComponent } from './components/notification-messages/notification-messages.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClearBucketComponent } from './components/clear-bucket/clear-bucket.component';



const notificationRoutes: Routes = [
  { path: '', component:NotificationsHomeComponent  },
  { path: 'clear-bucket', component: ClearBucketComponent },
];



@NgModule({
  declarations: [
    NotificationsHomeComponent,
    NotificationMessagesComponent,
    ClearBucketComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(notificationRoutes),
    SharedModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ]
})
export class NotificationsModule { }
