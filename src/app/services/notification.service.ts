import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService,) { }

  getNotificationCount(): void {
    const url = `${environment.coreApiUrl}/notifications/count`;
    this.apiService.get(url).subscribe(
      (response: any) => {
        const unreadCount = response?.res?.unreadCount || 0;
        this.unreadCountSubject.next(unreadCount);
      },
      error => {
      }
    );
  }
}
