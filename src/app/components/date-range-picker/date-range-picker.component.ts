import { Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class DateRangePickerComponent {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;

  @Output() dateRangeSelected = new EventEmitter<{ startDate: Date, endDate: Date }>();

  onStartDateChanged(startDate: Date) {
    this.selectedStartDate = startDate;
    this.emitDateRange();
  }

  onEndDateChanged(endDate: Date) {
    this.selectedEndDate = endDate;
    this.emitDateRange();
  }

  emitDateRange() {
    if (this.selectedStartDate && this.selectedEndDate) {
      this.dateRangeSelected.emit({ startDate: this.selectedStartDate, endDate: this.selectedEndDate });
    }
  }

  resetDates() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
  }
}