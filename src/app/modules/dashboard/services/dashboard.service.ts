import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private currentComponentSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private lastCreatedTicket: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private updateQueues: BehaviorSubject<any> = new BehaviorSubject<any>({});
  formSaveClicked: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  currentFormValues: BehaviorSubject<any> = new BehaviorSubject<any>({});

  getComponentDataFromHeader = new BehaviorSubject("")
  currentRouteToSubHeader =new BehaviorSubject("")
  attributeId=new BehaviorSubject('')

  // currentComponent: BehaviorSubject<string> = new BehaviorSubject('users');
  constructor() { }

  setcurrentComponent(data: any): void {
    this.currentComponentSubject.next(data);
  }

  getcurrentComponent(): Observable<any> {
    return this.currentComponentSubject.asObservable();
  }

  emitCreatedTicket (data : any) {
    this.lastCreatedTicket.next(data);
  }

  fetchLastCreatedTicket(): Observable<any> {
    return this.lastCreatedTicket.asObservable();
  }

  updateQueueList(data : any) {
    this.updateQueues.next(data);
  }

  fetchQueueListEvent(): Observable<any> {
    return this.updateQueues.asObservable();
  }
}
