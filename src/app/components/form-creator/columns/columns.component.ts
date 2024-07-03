import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss'
})
export class ColumnsComponent {
  @Input() config:any;
  @Input() editMode:any;
  @Output() editElementEvent =  new EventEmitter();
  @Output() addElementToColumnEvent =  new EventEmitter();
  @Output() removeElementfromColumnEvent =  new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() updateValueEvent = new EventEmitter();
  
  selectDropClicked:any;  

  editElement($event:any){
    this.editElementEvent.emit($event)
  }

  selectDropdown(ev:any){
    this.addElementToColumnEvent.emit(ev)
  }

  removeElement(element:any){
    this.removeElementfromColumnEvent.emit(element)
  }

  deleteColumns(columns:any){
    this.deleteEvent.emit(columns);
  }

  updateValue(ev:any,column:any){
    this.updateValueEvent.emit({value:ev,column:column})
  }




}
