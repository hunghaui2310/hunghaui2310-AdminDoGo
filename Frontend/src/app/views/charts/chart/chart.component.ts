import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  testForm: FormGroup;
  events: string[] = [];
  date;

  constructor(private formBuilder: FormBuilder) {
    this.createTestForm();
  }

  ngOnInit() {
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    this.events.push(`${event.value}`);
    console.log('date picked', this.date);
  }

  createTestForm() {
    this.testForm = this.formBuilder.group({
      testDate: [null, Validators.required],
    });
  }

}
