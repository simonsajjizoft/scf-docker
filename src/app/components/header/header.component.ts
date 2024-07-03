import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
  OnDestroy, 
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, interval } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('helpAreaText') helpAreaText: ElementRef | any;
  isFrenchLanguage: boolean = false;
  isBlueTheme: boolean = false;
  showSettingsDropdown: boolean = false;
  showDropdown: boolean = false;
  showLoader: boolean = false;
  showHelpArea: boolean = false;
  pageExpanded: boolean = false;
  notificationDropdown: boolean = false;
  unreadCount: any;
  private notificationInterval: any;
  userFirstLetter! : string;
  userName! : string;
  private unreadCountSubscription: Subscription;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService,
    private commonService: CommonService,
    public translate: TranslateService,
    private notificationService: NotificationService,
    private authService:AuthService,
    private route:ActivatedRoute
  ) {
    let frenchView: any;
    if (typeof localStorage !== 'undefined')
      frenchView = localStorage.getItem('frenchView');
      frenchView === 'true' ? (this.isFrenchLanguage = true) : (this.isFrenchLanguage = false);
  }



}

