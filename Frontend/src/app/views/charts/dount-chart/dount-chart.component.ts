import { Component, OnInit } from '@angular/core';
import {ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'app-dount-chart',
  templateUrl: './dount-chart.component.html',
  styleUrls: ['./dount-chart.component.scss']
})
export class DountChartComponent implements OnInit {

  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
