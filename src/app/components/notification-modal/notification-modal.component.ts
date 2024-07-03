import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.scss',
})
export class NotificationModalComponent {
  @ViewChild('tasksParentArea') tasksParentArea: ElementRef;
  isMenuOpen: boolean = false;
  filteredNotifications: any[] = [];
  selectedFilter: boolean | null = null;
  initialLoader: boolean = true;
  showSkelton: boolean = true;
  showLoader: boolean = false;
  moreApiCalled: any;
  hasMoreData: boolean = true;
  list: any[] = [];
  filterQuery: any = {
    limit: 6,
    skip: 1,
  };
  noResultsFound: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private renderer: Renderer2,
    public toastService: ToastService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.showSkelton = true;
    this.getNotifications();
  }

  onScroll(event: Event): void {
    if (this.tasksParentArea) {
      const scrollElement = this.tasksParentArea?.nativeElement as HTMLElement;
      let element = scrollElement;
      const requiredHeight = element.scrollTop + element.clientHeight;
      let calculatedHeight = element.scrollHeight / 4;
      calculatedHeight = calculatedHeight * 3;
      if (requiredHeight > calculatedHeight && !this.moreApiCalled)
        this.loadMore();
    }
  }

  loadPrevious(): void {
    if (!this.moreApiCalled) {
      this.moreApiCalled = true;
      this.filterQuery.skip -= 1;
      this.getNotifications();
    }
  }

  loadMore(): void {
    if (!this.moreApiCalled && this.hasMoreData) {
      this.moreApiCalled = true;
      this.filterQuery.skip += 1;
      this.getNotifications();
    }
  }

  navigateToNotifications(): void {
    this.router.navigate(['home/notifications']);
  }

  showAllNotifications(): void {
    this.selectedFilter = null;
    this.getNotifications();
  }

  showUnreadNotifications(): void {
    this.selectedFilter = false;
    this.getNotifications();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside =
      target.closest('.dropdown-trigger') || target.closest('.custom-menu');
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }

  getNotifications(): void {
    if (!this.showSkelton) this.showLoader = true;
    const url = '/notifications';
    let queryParams = new HttpParams()
      .set('limit', this.filterQuery.limit.toString())
      .set('clear_status', false)
      .set('skip', this.filterQuery.skip.toString());

    if (this.selectedFilter === false) {
      queryParams = queryParams.set('read', 'false');
    }

    const fullUrl = `${environment.coreApiUrl}${url}?${queryParams.toString()}`;

    // Fetch notifications
    this.apiService.get(fullUrl).subscribe(
      (data: any) => {
        if (data?.status) {
          if (this.filterQuery.skip === 1) {
            this.list = data?.res?.notifications;
            this.noResultsFound = this.list.length === 0 || data?.res?.notifications.length === 0;
          } else {
            this.list = [...this.list, ...data?.res?.notifications];
          }
          this.showLoader = false;
          this.showSkelton = false;
          this.hasMoreData =
            data?.res?.notifications.length === this.filterQuery.limit;
        }
        this.showLoader = false;
        this.showSkelton = false;
        this.moreApiCalled = false;
      },
      (err: any) => {
        this.showLoader = false;
        this.showSkelton = false;
        this.moreApiCalled = false;
        this.toastService.showError(err?.error?.error || err?.error?.message);
        this.noResultsFound = true;
      }
    );
  }

  markAllasRead(): void {
    if (!this.showSkelton) this.showLoader = true;
    this.filterQuery.skip = 1;
    const notificationIds = this.list.map(
      (notification: any) => notification.id
    );
    const url = `${environment.coreApiUrl}/notifications/mark-read`;
    const payload = { notificationIds };

    this.apiService.patch(url, payload).subscribe(
      (response: any) => {
        if (response?.res) {
          this.toastService.showSuccess(
            'All notifications are successfully marked as Read.'
          );
          // Refetch notifications to update the list
          this.getNotifications();
          this.notificationService.getNotificationCount();
        }
      },
      (err: any) => {
        this.showLoader = false;
        this.toastService.showError(err?.error?.error || err?.error?.message);
      }
    );
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
