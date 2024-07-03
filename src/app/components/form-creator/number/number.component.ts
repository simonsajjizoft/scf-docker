import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NumberComponent {
  @Input() config:any;
  @Input() editMode:any;
  @Output() editEvent = new EventEmitter();
  @Output() updateValueEvent = new EventEmitter()

  ngOnChanges(){}

  editElement(){
    this.editEvent.emit(this.config)
  }

  updateChangeField(ev:any){
    this.updateValueEvent.emit(ev?.target?.value)
  }

}
