import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-edit-field-dialog',
  templateUrl: './edit-field-dialog.component.html',
  styleUrl: './edit-field-dialog.component.scss'
})
export class EditFieldDialogComponent implements AfterViewInit {
  @Input() message!: string;
  @Output() confirmed: EventEmitter<void> = new EventEmitter<void>();
  EditForm! : FormGroup;
  selectPositionDropClicked:any;
  selectedlabelPosition:any;
  positions:any = ['left','top'];
  selectedColumn:any;
  selectColumnsDropClicked:any;
  columns:any = ['columns-1','columns-2','columns-3','columns-4','columns-1-2','columns-2-1'];
  metaDataList:any;
  showLoader:boolean = false;
  selectMetaDataDropClicked:boolean = false;
  selectedmetaData:any;
  codeLists:any = [];
  selectcodeListClicked:boolean = false;
  selectedCodeList:any;
  selectLayoutClicked:boolean = false;
  selectedLayout:any;
  moreApiCalled: boolean;
  payLoad: any = {
    limit: 40,
    skip: 1,
  };
  selectedTabDataEntry = 'API';
  dataValues:any[] = [];
  newValue:any = {name:'',value:''};
  @ViewChild('metaParentArea') private metaParentArea: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('.drpfield')) {
      this.selectMetaDataDropClicked = false;
      this.selectColumnsDropClicked = false;
      this.selectPositionDropClicked = false;
      this.selectcodeListClicked = false;
      this.selectLayoutClicked = false;
    }
  }

  
  constructor(public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private sanitizer: DomSanitizer, private formBuilder:FormBuilder, private apiService:ApiService,private tostr:ToastService, private renderer: Renderer2) {

    if(data?.element?.type == 'columns'){
      this.EditForm = this.formBuilder.group({
        subType: ['', Validators.required],
        columnLength: ['', Validators.required],
      });
      this.EditForm.patchValue(data?.element)
    }
    else if(data?.element?.type == 'label'){
      this.EditForm = this.formBuilder.group({
        label: ['', Validators.required],
      });
      this.EditForm.patchValue(data?.element)

    }
    else{
      this.selectedmetaData = data?.element;
      this.metaDataList = []
      this.getMetaDataList();
      this.dataValues = data?.element?.values ? data?.element?.values : [];
      if((data?.element?.type=='selectbox' || data?.element?.type=='checkbox' || data?.element?.type=='radio' ) ){
        if(this.selectedTabDataEntry == 'API'){
          this.EditForm = this.formBuilder.group({
            label: ['', Validators.required],
            metaData: [''],        
            labelPosition:['',Validators.required],
            hideLabel:[''],
            layout:[''],
            endPoint:[''],
            responseTemplate:[''],
            itemTemplate:['']
          });
        }
        else{
          this.EditForm = this.formBuilder.group({
            label: ['', Validators.required],
            metaData: [''],        
            labelPosition:['',Validators.required],
            hideLabel:[''],
            layout:[''],
            values:[this.dataValues]
          });

        }
      }
      else{      
        this.EditForm = this.formBuilder.group({
        label: ['', Validators.required],
        metaData: ['',],        
        labelPosition:['',Validators.required],
        hideLabel:[''],
        layout:[''],
      });
      }
      this.EditForm.patchValue(data?.element);
    }
    // this.selectedmetaData = data?.element;
 
  }

  onConfirm(): void {
    if(this.EditForm.valid && this.selectedmetaData?.field_key){
      this.confirmed.emit(this.EditForm.value); 
      this.dialogRef.close(this.EditForm.value);
    }
  
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showFormDropdown () {
    this.selectPositionDropClicked = !this.selectPositionDropClicked
  }

  selectDropdown (item : any) {
    this.selectedlabelPosition = item;
    this.EditForm.controls['labelPosition'].setValue(this.selectedlabelPosition);
  }

  selectNoofColumns(item : any) {
    this.selectedColumn = item;
    this.EditForm.controls['subType'].setValue(this.selectedColumn);
    if(this.selectedColumn == 'columns-1')  this.EditForm.controls['columnLength'].setValue('1');
    else if(this.selectedColumn == 'columns-1')  this.EditForm.controls['columnLength'].setValue('1');
    else if(this.selectedColumn == 'columns-2')  this.EditForm.controls['columnLength'].setValue('2');
    else if(this.selectedColumn == 'columns-3')  this.EditForm.controls['columnLength'].setValue('3');
    else if(this.selectedColumn == 'columns-4')  this.EditForm.controls['columnLength'].setValue('4');
    else if(this.selectedColumn == 'columns-1-2')  this.EditForm.controls['columnLength'].setValue('2');
    else if(this.selectedColumn == 'columns-2-1')  this.EditForm.controls['columnLength'].setValue('2');

  }

  selectMetaData(item:any){
    let isFieldExists = this.checkIfMetaFieldExists(item);
    if(!isFieldExists){
      this.selectedmetaData = item;
      Object.assign(this.selectedmetaData, {...item});
      if((this.data?.element?.type=='selectbox' || this.data?.element?.type=='checkbox' || this.data?.element?.type=='radio' )){
        if(this.selectedTabDataEntry == 'API'){
          this.EditForm = this.formBuilder.group({
            label: [this.data?.element?.label, Validators.required],
            metaData: [this.selectedmetaData],        
            labelPosition:[this.data?.element?.labelPosition,Validators.required],
            hideLabel:[this.data?.element?.hideLabel],
            layout:[this.data?.element?.layout ? this.data?.element?.layout : ''],
            endPoint: [this.data?.element?.endPoint ? this.data?.element?.endPoint : ''],
            responseTemplate:[this.data?.element?.responseTemplate ? this.data?.element?.responseTemplate : ''],
            itemTemplate:[this.data?.element?.itemTemplate ? this.data?.element?.itemTemplate : '']
          });
        }
        else{
          this.EditForm = this.formBuilder.group({
            label: [this.data?.element?.label, Validators.required],
            metaData: [this.selectedmetaData],        
            labelPosition:[this.data?.element?.labelPosition,Validators.required],
            hideLabel:[this.data?.element?.hideLabel],
            layout:[this.data?.element?.layout ? this.data?.element?.layout : ''],
            values:[this.dataValues],
          });
        }
      }

      else{
        this.EditForm = this.formBuilder.group({
          label: [this.data?.element?.label, Validators.required],
          metaData: [this.selectedmetaData],        
          labelPosition:[this.data?.element?.labelPosition,Validators.required],
          hideLabel:[this.data?.element?.hideLabel],
          layout:[this.data?.element?.layout ? this.data?.element?.layout : ''],
        });

      }
      this.EditForm.controls['metaData'].setValue(this.selectedmetaData);
      this.EditForm.controls['label'].setValue(this.selectedmetaData?.field_name);
    }
    else this.tostr.showWarning("This field already exists in the Form, Please choose another");


  }


  selectLayout(item:any){
    this.EditForm.controls['layout'].setValue(item);
  }


  getMetaDataList() {
    let endpoint = '/fields';
    const params = `?&limit=${this.payLoad?.limit}&skip=${this.payLoad?.skip}`;
    this.showLoader = true;
    this.apiService.getMetaData(environment?.flowManageUrl + endpoint + params).subscribe((response: any) => {
      if(response?.data){
       if(response?.data?.length ==0 ) this.moreApiCalled = true;
       this.metaDataList = [...this.metaDataList,...response?.data];
       this.showLoader = false;
      }
      else this.moreApiCalled = true;
    }, (err:any)=>{
      this.showLoader = false;
    })
  }




  checkIfMetaFieldExists(item:any):boolean{
    let isFieldExists:boolean = false;
    this.data.components.map((component:any)=>{
      if(item?._id == component?._id) isFieldExists = true;
    })
    return isFieldExists;
  }

  
  loadMoreApi(): void {
    if (!this.moreApiCalled) {
      // this.moreApiCalled = true;
      this.payLoad.skip += 1;
      this.getMetaDataList()
    }
  }

  ngAfterViewInit() {
    this.renderer.listen(this.metaParentArea.nativeElement, 'scroll', (event:any) => {
      let element = event.target;
      const requiredHeight = element.scrollTop + element.clientHeight;
      let calculatedHeight = element.scrollHeight / 4;
      calculatedHeight = calculatedHeight * 3;
      if (requiredHeight > calculatedHeight) this.loadMoreApi();
    });
  }

  toggleMetaDropdown(){
    this.selectMetaDataDropClicked = !this.selectMetaDataDropClicked;
  }

  changeTabDataValue(item:any){
    this.selectedTabDataEntry = item;
    if(this.selectedTabDataEntry == 'API'){
      this.EditForm = this.formBuilder.group({
        label: [this.EditForm.controls['label']?.value, Validators.required],
        metaData: [this.selectedmetaData],        
        labelPosition:[this.EditForm.controls['labelPosition']?.value,Validators.required],
        hideLabel:[this.EditForm.controls['hideLabel']?.value],
        layout:[this.EditForm.controls['layout']?.value],
        endPoint: [this.EditForm.controls['endPoint']?.value],
        responseTemplate:[this.EditForm.controls['responseTemplate']?.value],
        itemTemplate:[this.EditForm.controls['itemTemplate']?.value]
      });
    }
    else{
      this.EditForm = this.formBuilder.group({
        label: [this.EditForm.controls['label']?.value, Validators.required],
        metaData: [this.selectedmetaData],        
        labelPosition:[this.EditForm.controls['labelPosition']?.value,Validators.required],
        hideLabel:[this.EditForm.controls['hideLabel']?.value],
        layout:[this.EditForm.controls['layout']?.value],
        values:[this.dataValues],
      });
    }
  }

  addtoDataValues(value:any,inputField1:any,inputField2:any){
    if(inputField1.value.trim() != '' && inputField2.value.trim() != '') this.dataValues.push(this.newValue);
    inputField1.value = '';
    inputField2.value = '';
    this.newValue = {name:'',value:''};
  }

  setNewValue(ev:any){
    this.newValue.value = ev?.target?.value;
  }

  setNewName(ev:any){
    this.newValue.name = ev?.target?.value;
  }

}
