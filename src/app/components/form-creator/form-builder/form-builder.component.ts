import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../../modules/dashboard/services/dashboard.service';
import { EditFieldDialogComponent } from '../edit-field-dialog/edit-field-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnChanges {
  @Input() form: any;
  @Input() components: any = [];
  @Input() isSubmitForm: boolean;
  @Input() isPreviewForm: boolean;
  @Output() submitFormEvent = new EventEmitter();
  @Output() previewFormEvent = new EventEmitter()
  id: any;
  showLoader:boolean = false;


  constructor(private dashboardService: DashboardService, private dialog: MatDialog, private route: ActivatedRoute, private apiService: ApiService) {
    this.dashboardService.currentRouteToSubHeader.next("forms");
  }

  ngOnChanges() {
    if(this.form) this.patchValuesToComponents(this.form.components)
    if (this.isSubmitForm) this.submitFn();
    if (this.isPreviewForm) this.preview();
  }

  editElement(element: any) {
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '60vw',
      height: '70vh',
      data: { element: element, title: 'Edit Form Element', components: this.components }
    });
    dialogRef.componentInstance.confirmed.subscribe((data: any) => {
      let newElement = { ...element,...data };
      Object.assign(element, newElement)
      if(data?.metaData){
        let newElement = {...element,...data?.metaData};
        newElement.required = Boolean(newElement.mandatory);
        Object.assign(element,newElement)
       }
       delete element.metaData;
       if(!data?.itemTemplate) delete element?.itemTemplate;
       if(!data?.responseTemplate) delete element?.responseTemplate;
       if(!data?.endPoint) delete element?.endPoint;
      if (data?.columnLength) {
        element.columnLength = data?.columnLength;
        element.subType = data?.subType;
        let newElement: any = { 'type': 'columns', columnLength: element.columnLength, columns: [], subType: data?.subType }
        for (let i = 0; i < element?.columnLength; i++) {
          let columnElement: any = { type: '' };
          newElement.columns.push(columnElement);
        };
        Object.assign(element, newElement)
      }
      if (data?.itemTemplate && data?.endPoint) {
        this.fetchDataValues(data?.endPoint,data?.responseTemplate,data?.itemTemplate, element);
      }
      if(data?.values){
        let newElement = {...element};
        newElement.values = data?.values;
        Object.assign(element,newElement)
      }
    });

  }

  addElement(elementType: any) {
    let element: any = {};
    if (elementType == 'textfield') element = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'textfield', 'hideLabel': false, value: '' };
    else if (elementType == 'textarea') element = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'textarea', 'hideLabel': false, value: '' };
    else if (elementType == 'number') element = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'number', 'hideLabel': false, value: '' };
    else if (elementType == 'checkbox') element = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'checkbox', 'hideLabel': false, value: '', layout: 'row', values: [] };
    else if (elementType == 'selectbox') element = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'selectbox', 'hideLabel': false, value: '', values: [] };
    else if (elementType == 'radio') element = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'radio', 'hideLabel': false, value: '', layout: 'row', values: [] };
    else if (elementType == 'label') element = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '100%', 'type': 'label', 'hideLabel': false, value: '' };
    else if (elementType == 'columns') element = { 'type': 'columns', columnLength: 2, subType: 'columns-2', columns: [{ type: '' }, { type: '' }] }

    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '60vw',
      height: '70vh',
      data: { element: element, title: 'Add Form Element', components: this.components }
    });
    dialogRef.componentInstance.confirmed.subscribe((data: any) => {
      let newElement = { ...element,...data };
      Object.assign(element, newElement)
      if(data?.metaData){
        let newElement = {...element,...data?.metaData};
        newElement.required = Boolean(newElement.mandatory);
        Object.assign(element,newElement)
       }
       delete element.metaData;
       if(!data?.itemTemplate) delete element?.itemTemplate;
       if(!data?.responseTemplate) delete element?.responseTemplate;
       if(!data?.endPoint) delete element?.endPoint;
      if (data?.columnLength) {
        element.columnLength = data?.columnLength;
        element.subType = data?.subType;
        let newElement: any = { 'type': 'columns', columnLength: element.columnLength, columns: [], subType: data?.subType }
        for (let i = 0; i < element?.columnLength; i++) {
          let columnElement: any = { type: '' };
          newElement.columns.push(columnElement);
        };
        Object.assign(element, newElement)
      }
      if ( data?.itemTemplate && data?.endPoint) {
        this.fetchDataValues(data?.endPoint,data?.responseTemplate,data?.itemTemplate, element);
      }
      if(data?.values){
        let newElement = {...element};
        newElement.values = data?.values;
        Object.assign(element,newElement)
      }
      this.components.push(element);
    });
  }

  addElementToColumn(ev: any) {
    if (ev?.type == 'textfield') {
      let obj = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'textfield', 'hideLabel': false };
      Object.assign(ev?.element, obj)
    }
    else if (ev?.type == 'textarea') {
      let obj = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'textarea', 'hideLabel': false, value: '' };
      Object.assign(ev?.element, obj)
    }
    else if (ev?.type == 'label') {
      let obj = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '100%', 'type': 'label', 'hideLabel': false, value: '' };
      Object.assign(ev?.element, obj)
    }
    else if (ev?.type == 'number') {
      let obj = { 'labelPosition': 'left', 'label': 'Name', 'labelWidth': '30%', 'type': 'number', 'hideLabel': false, value: '' };
      Object.assign(ev?.element, obj)
    }
  }

  deleteElement(element: any) {
    this.components.map((item: any, i: any) => {
      if (item == element) this.components.splice(i, 1)
    })
  }

  removeElementfromColumn(el: any) {
    Object.assign(el, { type: '' })
  }

  submitFn(ev?: any) {
    this.components.map((item: any) => {
      if (item?.value) item.value = '';
      if(item?.endPoint) item.values = [];
    })
    this.submitFormEvent.emit(this.components)
  }

  preview(ev?: any) {
    this.previewFormEvent.emit(this.components)
  }


  fetchDataValues(endPoint:any,arraypath:any,itemPath:any, element: any) {
    // this.showLoader = true;
    // this.apiService.get(environment?.flowManageUrl + endPoint).subscribe((response: any) => {
    //   if(response){
    //     let newElement = {...element};
    //     newElement.values = arraypath ?  this.getNestedProperty(response,arraypath) : response;
    //   Object.assign(element,newElement);
    //   this.showLoader = false;
    //   }
    // }, (err:any)=>{
    //   this.showLoader = false;
    // })
  }

  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => {
      if (prev && prev[curr] !== undefined) {
        return prev[curr];
      } else {
        console.error(`Property ${curr} not found in`, prev);
        return undefined;
      }
    }, obj);
  }

  patchValuesToComponents(components:any){
    components.map((item:any)=>{
      if(item?.endPoint) this.fetchDataValues(item.endPoint,item?.responseTemplate,item?.itemTemplate,item)
    })

  }
  



}
