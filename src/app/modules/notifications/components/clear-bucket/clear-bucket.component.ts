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

@Component({
  selector: 'app-clear-bucket',
  templateUrl: './clear-bucket.component.html',
  styleUrl: './clear-bucket.component.scss'
})
export class ClearBucketComponent {
  @ViewChild('picker') picker: MatDateRangePicker<Date>;
  @ViewChild('tasksParentArea') tasksParentArea: ElementRef;
  @ViewChild(DateRangePickerComponent) dateRangePicker: DateRangePickerComponent;
  searchValue: string = '';
  searchIconClicked: boolean = false;
  selectedOption: string = '';
  filterQuery: any = {
    searchValue: '',
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
    public toastService: ToastService
  ) {}

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
    if (!this.moreApiCalled) {
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
      .set('clear_status', true)
      .set('skip', this.filterQuery.skip.toString());
      
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
        this.moreApiCalled = false;
      },
      (err: any) => {
        this.showLoader = false;
        this.moreApiCalled = false;
        this.toastService.showError(err?.error?.error || err?.error?.message);
        this.noResultsFound = true;
      }
    );
  }

  clearSearch(): void {
    this.searchIconClicked = false;
    this.searchValue = '';
    this.clearFilters(); // Reset filters and selected date
  }

  openPicker() {
    if (this.picker) {
      this.picker.open();
    }
  }


  clearFilters(): void {
    this.searchIconClicked = false;
    this.searchValue = '';
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.filterQuery = {
      searchValue: '',
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
      this.filterQuery.searchValue !== '' ||
      this.selectedStartDate !== null ||
      this.selectedEndDate !== null
    );
  }

  backTohome() {
    this.router.navigate(['/home/users']);
  }

  navigateToNotifications(): void {
    this.router.navigate(['/notifications']);
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


  deleteNotificationsByIds(notificationIds: string[]): void {
    if (!this.showSkelton) this.showLoader = true;
    const payload = { notificationIds };
    const url = `${environment.coreApiUrl}/notifications/archive`;
  
    this.apiService.delete(url, { body: payload }).subscribe(
      (response: any) => {
        if (response?.res) {
          for (const notificationId of notificationIds) {
            this.list = this.list.filter((notification: any) => notification?.id !== notificationId);
          }
          this.toastService.showSuccess('Notifications deleted successfully.');
          // Refetch notifications to update the list
          this.getNotifications();
        }
      },
      (err: any) => {
        this.toastService.showError(err?.error?.error || err?.error?.message);
      }
    );
  }
  
deleteAllNotificationsApi(): void {
  if (!this.showSkelton) this.showLoader = true;
  this.filterQuery.skip = 1;
  const notificationIds = this.list.map((notification: any) => notification?.id);
  const payload = { notificationIds };
  const url = `${environment.coreApiUrl}/notifications/archive`;

  this.apiService.delete(url, { body: payload }).subscribe(
    (response: any) => {
      if (response?.res) {
        this.toastService.showSuccess('All notifications in the clear bucket are deleted successfully.');
        // Clear the list
        this.list = [];
        // Refetch notifications to update the list
        this.getNotifications();
      }
    },
    (err: any) => {
      this.toastService.showError(err?.error?.error || err?.error?.message);
    }
  );
}
 
  
  deleteAllNotifications(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to permanently delete all notifications from clear bucket?',
      },
    });
    dialogRef.componentInstance.confirmed.subscribe(() => {
      this.deleteAllNotificationsApi();
    });
  }
  

  restoreNotificationById(notificationId: string): void {
    if (!this.showSkelton) this.showLoader = true;
    this.filterQuery.skip = 1;
    const url = `${environment.coreApiUrl}/notifications/${notificationId}/unarchive`;
  
    this.apiService.patch(url, {}).subscribe(
      (response: any) => {
        this.list = this.list.filter((notification: any) => notification?.id !== notificationId);
        this.toastService.showSuccess(`Notification is successfully restored.`);
        this.getNotifications();
      },
      (err: any) => {
        this.toastService.showError(err?.error?.error || err?.error?.message);
      }
    );
  }
  

}
