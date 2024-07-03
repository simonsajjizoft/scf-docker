import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
    MatTreeModule,
    MatIconModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
  exports: [
    MatRippleModule,
    MatIconModule,
    MatTreeModule,
    MatIconModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
