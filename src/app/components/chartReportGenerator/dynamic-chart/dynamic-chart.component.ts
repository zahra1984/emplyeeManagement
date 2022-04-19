import { Component, OnInit } from '@angular/core';
import {
  BubbleDataPoint,
  ChartConfiguration,
  ChartData,
  ChartDataset,
  ChartType,
} from 'chart.js';
import { FreedomHappienes } from 'src/app/dto/freedomHappienes';
import { FreedomHappienesService } from 'src/app/services/Freedom/freedom-happienes.service';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.css'],
})
export class DynamicChartComponent implements OnInit {
  freedomHappienesList: FreedomHappienes[] = [];
  public bubbleChartOptions: ChartConfiguration['options'];
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  public bubbleChartData!: ChartData<'bubble'>;
  constructor(private service: FreedomHappienesService) {}

  ngOnInit(): void {
    this.service.getDataFreedomHappienes().subscribe((res) => {
      this.freedomHappienesList = res;
      this.bindDataChart();
    });
  }
  bindDataChart() {
    let maxfreedomScore = Math.max.apply(
      Math,
      this.freedomHappienesList.map(function (o) {
        return o.freedomScore;
      })
    );
    let minfreedomScore = Math.min.apply(
      Math,
      this.freedomHappienesList.map(function (o) {
        return o.freedomScore;
      })
    );
    let maxhappienessScore = Math.max.apply(
      Math,
      this.freedomHappienesList.map(function (o) {
        return o.happienesScore;
      })
    );
    let minhappienessScore = Math.min.apply(
      Math,
      this.freedomHappienesList.map(function (o) {
        return o.happienesScore;
      })
    );
    this.bubbleChartOptions = {
      scales: {
        x: {
          min: minfreedomScore - 0.5,
          max: maxfreedomScore + 0.5,
          ticks: {},
        },
        y: {
          min: minhappienessScore - 0.5,
          max: maxhappienessScore + 0.5,
          ticks: {},
        },
      },
    };

    let bData: ChartDataset<'bubble', BubbleDataPoint[]>[] = [];

    let color: string = 'red';
    let bordercolor: string = 'red';

    for (let item of this.freedomHappienesList) {
      if (item.happienesScore < 4.5) {
        color = 'red';
        bordercolor = 'red';
      }
      if (item.happienesScore >= 4.5 && item.happienesScore <= 6) {
        color = 'orange';
        bordercolor = 'orange';
      } else if (item.happienesScore >= 6) {
        color = 'green';
        bordercolor = 'green';
      }
      bData.push({
        data: [
          {
            x: item.freedomScore,
            y: item.happienesScore,
            r: item.happienesScore,
          },
        ],
        backgroundColor: [color],
        borderColor: bordercolor,
        hoverBackgroundColor: 'purple',
        hoverBorderColor: 'purple',
        label: item.country,
      });
    }

    this.bubbleChartData = {
      labels: [],

      datasets: bData,
    };
  }
}
