import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent {
  isSaveActive: boolean = true;
  displayHTML: any;
  form:any;
  components:any;
  @Input() message!: string;
  @Output() confirmed: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<FormPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.form = data?.form;
    this.components = data?.components;
    // this.displayHTML = this.sanitizer
    //   .bypassSecurityTrustHtml(data?.displayHtml);
    // console.log(this.form)
  }
  onConfirm(): void {
    this.confirmed.emit();
    this.dialogRef.close();
  }
  onCancel(): void {
    this.dialogRef.close();
  }


}
