import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input('config') column:any;
  elementsList:any = [{type:'textfield',name:'Text Field'},{type:'textarea',name:'Text Area'},{type:'label',name:'Label'},{type:'number',name:'Number'}];
  selectDropClicked:boolean = false;
  @ViewChild('menu') menu:ElementRef;
  @Output() selectMenuItemEvent = new EventEmitter();

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    const clickedInside = this.menu.nativeElement.contains(event?.target);
    if (!clickedInside) {
      this.selectDropClicked = false;
    }
  }


  selectDropdown(item:any,column:any){
    this.selectMenuItemEvent.emit({type: item?.type,element:column})


  }

}
