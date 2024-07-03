import { Component,EventEmitter,HostListener,Input, OnChanges, Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrl: './selectbox.component.scss'
})
export class SelectboxComponent implements OnChanges{
  @Input() config:any;
  @Input() editMode:boolean;
  @Output() editEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();
  @Output() updateValueEvent = new EventEmitter();

  constructor(private apiService:ApiService){}

  ngOnChanges(){
    if(this.config?.endPoint) this.fetchValues();
  }

  editElement(){
    this.editEvent.emit(this.config)
  }

  deleteElement(){
    this.deleteEvent.emit(this.config)
  }
 
  
  isDropdwnMenuOpen: boolean = false;
  selectedOptionValue : any = null;


  toggleMenu() {
    if(!this.config?.disabled) this.isDropdwnMenuOpen = !this.isDropdwnMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown-container');
    if (!clickedInside) {
      this.isDropdwnMenuOpen = false;
    }
  }

  updateSelectedValue(opition: any) {
    this.selectedOptionValue= opition;
    this.isDropdwnMenuOpen = false;
  }

  
  fetchValues(){
  }

  getCodeLists(data:any){
    // let endpoint = '/fields/code-lists';
    // this.codeLists = [];
    // this.showLoader = true;
    // this.apiService.getMetaData(environment?.flowManageUrl + endpoint).subscribe((response: any) => {
    //   if(response?.data){
    //    this.codeLists = response?.data;
    //    this.codeLists.map((item:any)=>{
    //     if(data?.element?.code && data?.element?.code==item?._id) this.selectedCodeList = item;

    //    })
    //     this.showLoader = false;
    //     console.log(this.codeLists)
    //   }
    // }, (err:any)=>{
    //   this.showLoader = false;
    // })
  }

  getLabelbyPathName(item: any, path: any) {
    return item[path];
  }

  updateValueField(value:any){
    this.config.value = value;
    this.updateValueEvent.emit(value)
  }

}