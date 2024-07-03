import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrl: './form-controls.component.scss'
})
export class FormControlsComponent {
  @Output() addControlEvent = new EventEmitter();

  selectField(field:any){
    this.addControlEvent.emit(field)
  }

}
