import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  @Input() config:any;
  @Input() editMode:any;

  constructor(private apiService:ApiService){}

  ngOnChanges(){
    if(this.config?.code) this.fetchValues();
  }


  @Output() editEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();

  editElement(){
    this.editEvent.emit(this.config)
  }

  deleteElement(){
    this.deleteEvent.emit(this.config)
  }

  fetchValues(){
    let endpoint = '/fields/code-lists/';
    this.apiService.getMetaData(environment?.flowManageUrl + endpoint + this.config?.code).subscribe((response: any) => {
      if(response){
        if(response?.data?.children) this.config.values = response?.data?.children;
      }
    }, (err:any)=>{
    })
  }

  getLabelbyPathName(item: any, path: any) {
    return item[path];
  }

}