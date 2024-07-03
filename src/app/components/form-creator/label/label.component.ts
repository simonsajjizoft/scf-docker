import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  @Input() config:any;
  @Input() editMode:any;
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  ngOnChanges(){
  }

  editElement(){
    this.editEvent.emit(this.config)
  }

  deleteElement(){
    this.deleteEvent.emit(this.config)
  }

}
