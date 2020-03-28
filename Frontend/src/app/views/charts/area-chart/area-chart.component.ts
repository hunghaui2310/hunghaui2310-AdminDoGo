import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;
  @Input() data = [];

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
        chart: {
          type: 'area'
        },
        title: {
          text: 'RANDOM DATA'
        },
        subtitle: {
          text: 'demo'
        },
        yAxis: {
          title: {
            text: 'Billions'
          },
          labels: {
            formatter: function () {
              return this.value / 1000;
            }
          }
        },
        tooltip: {
          split: true,
          valueSuffix: ' millions'
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true,
        },
        series: this.data
      };
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
       new Event('resize')
      );
    }, 300);
  }

}
