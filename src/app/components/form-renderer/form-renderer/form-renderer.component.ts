import { log } from 'node:console';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../../modules/dashboard/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrl: './form-renderer.component.scss'
})
export class FormRendererComponent implements OnChanges,OnInit,OnDestroy {
  @Input() form: any;
  @Input() ticketDetails: any;
  @Input() saveClicked: boolean = false;
  @Input() form_data: any;
  showLoader: boolean = false;
  validations: any = [];
  isshowValidations: boolean = false;
  subscription = new Subscription();

  @Output() saveFormEvent = new EventEmitter();
  @Output() formValueChange = new EventEmitter();
  constructor(private apiService: ApiService,private dashboardService:DashboardService) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('.err')) {
      this.isshowValidations = false;
    }
  }

  ngOnInit(): void {
    this.subscription.add(this.dashboardService.formSaveClicked.subscribe((data : any) => {
      if(data) {
        this.dashboardService.currentFormValues.next(this.form)
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.form) this.patchValuesToComponents(this.form.components)
    if (this.saveClicked && this.saveClicked === true) this.fetchChangesInValues();
    if (this.form_data && changes['form_data']) this.patchFormData()
  }

  fetchChangesInValues() {
    this.validations = []
    this.form?.components?.map((component: any) => {
      this.checkForValidations(component)
    })
    if (this.validations?.length > 0) this.saveFormEvent.emit('');
    else this.saveFormEvent.emit(this.form);
  }

  updateValue(value: any, component: any) {
    component['value'] = value;
    this.formValueChange.emit({key: component.field_key, value: component.value});
  }

  updateValueColumnElement(obj: any, component: any) {
    obj.column['value'] = obj.value;
  }

  patchFormData() {
    
    this.form?.components.map((item: any) => {
      if (item?.type == 'columns') {
        item.columns.map((column: any) => {
          column = this.updateObject(column, this.form_data);
        })
      }
      else item = this.updateObject(item, this.form_data);
    })

  }

  updateObject(obj1: any, obj2: any): any {

    const key = obj1.field_key;
    if (obj2[key]) {
      obj1.value = obj2[key];
    } else {
      obj1.value = "";
    }
    return obj1;
  }

  fetchDataValues(endPoint: any, arraypath: any, itemPath: any, element: any) {
    // this.showLoader = true;
    // this.apiService.get(environment?.flowManageUrl + endPoint).subscribe((response: any) => {
    //   if (response) {
    //     let newElement = { ...element };
    //     newElement.values = arraypath ? this.getNestedProperty(response, arraypath) : response;
    //     Object.assign(element, newElement);
    //     this.showLoader = false;
    //   }
    // }, (err: any) => {
    //   this.showLoader = false;
    // })
  }


  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => {
      if (prev && prev[curr] !== undefined) {
        return prev[curr];
      } else {
        console.error(`Property ${curr} not found in`, prev);
        return undefined;
      }
    }, obj);
  }

  patchValuesToComponents(components: any) {
    components.map((item: any) => {
      if (item?.endPoint) this.fetchDataValues(item.endPoint, item?.responseTemplate, item?.itemTemplate, item)
    })

  }

  checkForValidations(component: any) {
    if (component?.required && component?.value == '') this.validations.push(component?.label + " is required");
  }


}
