import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxEditorModule } from 'ngx-editor';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from '../../components/header/header.component';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { DateRangePickerComponent } from '../../components/date-range-picker/date-range-picker.component';
import { FormBuilderComponent as CustomFormBuilder } from '../../components/form-creator/form-builder/form-builder.component';
import { FormControlsComponent } from '../../components/form-creator/form-controls/form-controls.component';
import { TextFieldComponent } from '../../components/form-creator/text-field/text-field.component';
import { EditFieldDialogComponent } from '../../components/form-creator/edit-field-dialog/edit-field-dialog.component';
import { ColumnsComponent } from '../../components/form-creator/columns/columns.component';
import { TextAreaComponent } from '../../components/form-creator/text-area/text-area.component';
import { MenuComponent } from '../../components/form-creator/menu/menu.component';
import { NumberComponent } from '../../components/form-creator/number/number.component';
import { SelectboxComponent } from '../../components/form-creator/selectbox/selectbox.component';
import { CheckboxComponent } from '../../components/form-creator/checkbox/checkbox.component';
import { RadioComponent } from '../../components/form-creator/radio/radio.component';
import { LabelComponent } from '../../components/form-creator/label/label.component';
import { FormRendererComponent as CustomFormRendererComponent } from '../../components/form-renderer/form-renderer/form-renderer.component';
import { FormPreviewComponent as CustomFormPreviewComponent } from '../../components/form-renderer/form-preview/form-preview.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LabelComponent,
    ConfirmationComponent,
    DateRangePickerComponent,
    CustomFormBuilder,
    FormControlsComponent,
    TextFieldComponent,
    EditFieldDialogComponent,
    ColumnsComponent,
    TextAreaComponent,
    MenuComponent,
    NumberComponent,
    SelectboxComponent,
    CheckboxComponent,
    RadioComponent,
    CustomFormRendererComponent,
    CustomFormPreviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    NgxSkeletonLoaderModule,
    MatDatepickerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    LabelComponent,
    ConfirmationComponent,
    DateRangePickerComponent,
    CustomFormBuilder,
    FormControlsComponent,
    TextFieldComponent,
    EditFieldDialogComponent,
    ColumnsComponent,
    TextAreaComponent,
    MenuComponent,
    NumberComponent,
    SelectboxComponent,
    CheckboxComponent,
    RadioComponent,
    CustomFormRendererComponent,
    CustomFormPreviewComponent,
    TranslateModule
  ],
})
export class SharedModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
