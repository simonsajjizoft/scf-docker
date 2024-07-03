import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
// import { FormPreviewComponent } from '../../modules/dashboard/components/request-forms/form-preview/form-preview.component';


@Component({
  selector: 'app-formio',
  templateUrl: './formio.component.html',
  styleUrls: ['./formio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule]
})
export class FormIO {
  @Input() isSubmitForm:boolean;
  @Input() isPreviewForm:boolean;
  @Output() rebuildEmitter = new EventEmitter();
  @Output() submitFormEvent = new EventEmitter();
  @Output() previewFormEvent = new EventEmitter();
  loadFormBuilder: Boolean = false;
  responses:{data:any} = {data:null};
  form: any = {
    components: []
  };

  options: any = {
    noDefaultSubmitButton: true,
    builder: {'data':false,basic:{conponents:{textfield:false,'password':false}},'advanced':false, 'premium': false,layout:{components:{'well':false,'htmlelement':false,'content':false,'tabs':false,'panel':false,'fieldset':false}}}
  }


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private dialog:MatDialog) {
    if (this.isSupported()) {
      this.loadFormBuilder = true;
      this.rebuildEmitter.next(this.options)
    }
  }


  isSupported(): boolean {
    return isPlatformBrowser(this.platformId) && !!indexedDB;
  }

  ngOnInit() {

  }

  ngOnChanges(){
    if(this.isSubmitForm) this.submitFn();
    if(this.isPreviewForm) this.previewFn()

  }

  onFormLoad(event: any) {
    const formInstance = event.formio;
    formInstance.ready.then(() => {
      const submitButton = formInstance.getComponent('submit');
      if (submitButton) {
        submitButton.visible = false;
      }
    });
  }

  submitFn(ev?:any){
    this.submitFormEvent.emit(this.form)
  }

  previewFn(ev?:any){
    this.previewFormEvent.emit(this.form)
    // this.previewFormEvent.emit(this.formContainer?.formio.root.root.webform.element.innerHTML)
  }

  submitEvent(ev:any){
  }

  detectChange(change:any){
    // if(change?.type =='updateComponent'){
    //   const dialogRef = this.dialog.open(FormPreviewComponent, {
    //     width: '60vw',
    //     height:'90vh',
    //     data: {form:{}}
    //   });
    //   dialogRef.componentInstance.confirmed.subscribe(() => {
  
    //   });
    //   setTimeout(()=>{
    //     this.isPreviewForm = false;
    //   })
    // }
  }

  openSettings(){
    // const dialogRef = this.dialog.open(FormPreviewComponent, {
    //   width: '90vw',
    //   height:'70vh',
    //   data: {form:{}}
    // });
    // dialogRef.componentInstance.confirmed.subscribe(() => {

    // });
    // setTimeout(()=>{
    //   this.isPreviewForm = false;
    // })
  }


}

