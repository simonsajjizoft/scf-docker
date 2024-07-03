import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent {
  @Input() config:any;
  @Input() editMode:any;
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() updateValueEvent = new EventEmitter();

  ngOnChanges(){}

  editElement(){
    this.editEvent.emit(this.config)
  }

  deleteElement(){
    this.deleteEvent.emit(this.config)
  }

  updateChangeField(ev:any){
    this.updateValueEvent.emit(ev?.target?.value)
  }

}
