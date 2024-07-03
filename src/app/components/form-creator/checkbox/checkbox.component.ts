import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements OnChanges{
  @Input() config:any;
  @Input() editMode:any;
  @Output() editEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();

  constructor(private apiService:ApiService){}

  ngOnChanges(){
    if(this.config?.code) this.fetchValues();
  }

  editElement(){
    this.editEvent.emit(this.config)
  }

  deleteElement(){
    this.deleteEvent.emit(this.config)
  }

  fetchValues(){
    // let endpoint = '/fields/code-lists/';
    // this.apiService.getMetaData(environment?.flowManageUrl + endpoint + this.config?.code).subscribe((response: any) => {
    //   if(response){
    //   if(response?.data?.children) this.config.values = response?.data?.children;
    //   }
    // }, (err:any)=>{
    // })
  }

  
  getLabelbyPathName(item: any, path: any) {
    return item[path];
  }


}
