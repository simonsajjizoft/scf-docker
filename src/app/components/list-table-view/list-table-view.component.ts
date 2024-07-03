import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2, ViewChild, input } from '@angular/core';
import { DashboardService } from '../../modules/dashboard/services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-table-view',
  templateUrl: './list-table-view.component.html',
  styleUrl: './list-table-view.component.scss'
})
export class ListTableViewComponent implements OnDestroy {
  colLength!: number;
  calculatedWidth!: number;
  @Input() userActiveStatus: boolean
  @Input() columns: any[] = [];
  @Input() tableDatas: any[] = [];
  @Input() selectedItemId:any;
  columnName: any
  @Output() showDetailPageEvent = new EventEmitter();
  @Output() loadMoreData = new EventEmitter();

  @ViewChild('tableBody') private recordListParentArea: ElementRef;

  constructor(private renderer: Renderer2, private dashboardService: DashboardService, public translate: TranslateService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.colLength = this.columns?.length;
    this.calculatedWidth = 100 / this.colLength;
  }
  ngOnDestroy(): void {

  }

  ngOnChanges() {

  }

  ngAfterViewInit() {
    this.renderer.listen(this.recordListParentArea.nativeElement, 'scroll', (event) => {
      let element = event.target;
      const requiredHeight = element.scrollTop + element.clientHeight;
      let calculatedHeight = element.scrollHeight / 4;
      calculatedHeight = calculatedHeight * 3;
      if (requiredHeight > calculatedHeight) this.loadMoreData.emit();
    });
  }

  navigateToDetails(id: any, data: any) {
    // if (data[4]?.value === "False" && this.userActiveStatus === true) { this.toastrService.warning("User Inactive") }
    // else 
    this.showDetailPageEvent.emit(id);
  }


}
