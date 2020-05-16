import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {fromEvent, Subscription} from 'rxjs';
import {MatDatepickerInput} from '@angular/material';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements AfterViewInit, OnDestroy {

  @Input() public startDate: Date = new Date();
  @Input() public min: Date;
  @Input() public max: Date;
  @Input() public placeholder = '';
  @Input() public errorMessage;
  @Input() public control: FormControl;
  @Input()
  public required = false;
  // @ts-ignore
  @ViewChild(MatDatepickerInput) datepickerInput: MatDatepickerInput<any>;
  // @ts-ignore
  @ViewChild('input') dateInput: ElementRef;
  // @ts-ignore
  @ViewChild('datePicker') datePicker: ElementRef;
  eventSubscription: Subscription;
  date = new Date((new Date().getTime() - 3888000000));

  constructor() { }

  ngAfterViewInit() {
    this.eventSubscription = fromEvent(this.dateInput.nativeElement, 'input').subscribe(_ => {
      this.datepickerInput._onInput(this.dateInput.nativeElement.value);
    });
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  getStartDate() {
    if (this.dateInput.nativeElement.value) {
      return this.dateInput.nativeElement.value;
    }
    return this.startDate;
  }

  focusInputField() {
    setTimeout(() => this.dateInput.nativeElement.focus());
  }

}
