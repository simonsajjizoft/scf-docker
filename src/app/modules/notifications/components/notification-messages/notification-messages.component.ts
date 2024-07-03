import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../services/toast.service';
import { environment } from '../../../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import moment from 'moment';
import { ConfirmationComponent } from '../../../../components/confirmation/confirmation.component';
import { DateRangePickerComponent } from '../../../../components/date-range-picker/date-range-picker.component';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-notification-messages',
  templateUrl: './notification-messages.component.html',
  styleUrl: './notification-messages.component.scss',
})
export class NotificationMessagesComponent {
  @ViewChild('picker') picker: MatDateRangePicker<Date>;
  @ViewChild(DateRangePickerComponent) dateRangePicker: DateRangePickerComponent;
  @ViewChild('tasksParentArea') tasksParentArea: ElementRef;
  searchValue: string = '';
  searchIconClicked: boolean = false;
  selectedOption: string = '';
  filterQuery: any = {
    searchValue: '',
    read: false,
    unread: false,
    limit: 20,
    skip: 1,
  };
  isMenuOpen: boolean = false;
  showLoader: boolean = false;
  showSkelton!: boolean;
  userData: any[] = [];
  list: any;
  noResultsFound: boolean = false;
  moreApiCalled: any;
  hasMoreData: boolean = true;
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  notification: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private router: Router,
    public toastService: ToastService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
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

  toggleIcon() {
    this.searchIconClicked = true;
    this.filterQuery.skip = 1;
    this.getNotifications();
  }

  showCancelIcon(): boolean {
    return (
      this.searchIconClicked &&
      (this.searchValue !== '' || this.hasFilterValues())
    );
  }

  getNotifications(): void {
    if (!this.showSkelton) this.showLoader = true;
    const formatDate = (date: Date) => {
      return moment(date).format('YYYY-MM-DD');
    };

    // Build the URL and query parameters
    const url = '/notifications';
    let queryParams = new HttpParams()
      .set('limit', this.filterQuery.limit.toString())
      .set('clear_status', false)
      .set('skip', this.filterQuery.skip.toString());


    if (this.filterQuery.read) {
      queryParams = queryParams.set('read', 'true');
    } else if (this.filterQuery.unread) {
      queryParams = queryParams.set('read', 'false');
    }
    // Set start and end dates if they are selected
    if (this.selectedStartDate && this.selectedEndDate) {
      queryParams = queryParams.set(
        'startDate',
        formatDate(this.selectedStartDate)
      );
      queryParams = queryParams.set(
        'endDate',
        formatDate(this.selectedEndDate)
      );
    }
    // Add search key and value if specified
    if (this.filterQuery.searchValue) {
      queryParams = queryParams.set(
        'searchValue',
        this.filterQuery.searchValue
      );
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

  clearSearch(): void {
    this.searchIconClicked = false;
    this.searchValue = '';
    this.clearFilters();
  }

  openPicker() {
    if (this.picker) {
      this.picker.open();
    }
  }

  get filteredData() {
    if (this.filterQuery.read) {
      return this.userData.filter((data) => data.read);
    } else if (this.filterQuery.unread) {
      return this.userData.filter((data) => !data.read);
    } else {
      return this.userData;
    }
  }

  selectCheckboxOption(option: string) {
    this.filterQuery.skip = 1;
    if (option === 'Read') {
      this.filterQuery.read = !this.filterQuery.read;
      if (this.filterQuery.read) {
        this.filterQuery.unread = false;
      }
    } else if (option === 'Unread') {
      this.filterQuery.unread = !this.filterQuery.unread;
      if (this.filterQuery.unread) {
        this.filterQuery.read = false;
      }
    }
    this.selectedOption = option;
    this.getNotifications();
  }

  clearFilters(): void {
    this.searchIconClicked = false;
    this.searchValue = '';
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.filterQuery = {
      searchValue: '',
      read: false,
      unread: false,
      limit: 20,
      skip: 1,
    };
    this.selectedOption = '';
    this.dateRangePicker?.resetDates();
    this.getNotifications();
  }

  hasFilterValues(): boolean {
    return (
      this.searchIconClicked ||
      // this.selectedDate !== null ||
      this.filterQuery.searchValue !== '' ||
      this.filterQuery.read ||
      this.filterQuery.unread ||
      this.selectedStartDate !== null ||
      this.selectedEndDate !== null
    );
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Close the dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside =
      target.closest('.dropdown-trigger') || target.closest('.custom-menu');
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }

  backTohome() {
    this.router.navigate(['/home/users']);
  }

  onDateRangeSelected(event: { startDate: Date; endDate: Date }): void {
    this.filterQuery.skip = 1;
    this.selectedStartDate = event?.startDate;
    this.selectedEndDate = event?.endDate;
    this.getNotifications();
  }

  navigateToClearBuckets(): void {
    this.router.navigate(['notifications/clear-bucket'])
  }

  markAllasRead(): void {
    if (!this.showSkelton) this.showLoader = true;
    this.filterQuery.skip = 1;
    const notificationIds = this.list.map((notification: any) => notification?.id);
    const url = `${environment.coreApiUrl}/notifications/mark-read`;
    const payload = { notificationIds };

    this.apiService.patch(url, payload).subscribe(
      (response: any) => {
        if (response?.res) {
          this.toastService.showSuccess('All notifications are successfully marked as Read.');
          // Refetch notifications to update the list
          this.getNotifications();
          this.notificationService.getNotificationCount();
        }
      },
      (err: any) => {
        this.showLoader = false;
        this.showSkelton = false;
        this.toastService.showError(err?.error?.error || err?.error?.message);
      }
    );
  }

  clearAllNotificationsApi(): void {
    if (!this.showSkelton) this.showLoader = true;
    const notificationIds = this.list.map((notification: any) => notification?.id);
    const url = `${environment.coreApiUrl}/notifications/archive`;
    const payload = { notificationIds };

    this.apiService.patch(url, payload).subscribe(
      (response: any) => {
        if (response?.res) {
          this.toastService.showSuccess('All notifications cleared successfully.');
          // Clear the list
          this.list = [];
          this.showLoader = false;
          this.showSkelton = false;
          // Refetch notifications to update the list
          this.getNotifications();
        }
      },
      (err: any) => {
        this.showLoader = false;
        this.showSkelton = false;
        this.toastService.showError(err?.error?.error || err?.error?.message);
      }
    );
  }


  clearAllNotifications(): void {
    this.filterQuery.skip = 1;
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to clear all notifications?',
      },
    });
    dialogRef.componentInstance.confirmed.subscribe(() => {
      this.clearAllNotificationsApi();
    });
  }


  clearNotificationById(notificationId: string): void {
    if (!this.showSkelton) this.showLoader = true;
    const url = `${environment.coreApiUrl}/notifications/${notificationId}/archive`;

    this.apiService.patch(url, {}).subscribe(
      (response: any) => {
        this.list = this.list.filter((notification: any) => notification?.id !== notificationId);
        // this.toastService.showSuccess(`Notification ${notificationId} has been successfully been cleared.`);
        this.toastService.showSuccess(`Notification is successfully cleared.`);
        this.showLoader = false;
        this.showSkelton = false;
        this.getNotifications();
      },
      (err: any) => {
        this.showLoader = false;
        this.showSkelton = false;
        this.toastService.showError(err?.error?.error || err?.error?.message);
      }
    );
  }


}
