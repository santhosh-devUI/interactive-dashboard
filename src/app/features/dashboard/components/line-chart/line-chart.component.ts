import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() data: any[] = [];
  view: [number, number] = [700, 400];

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
  };
  ngOnInit() {
    this.setChartSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setChartSize();
  }

  setChartSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1200) {
      this.view = [700, 400];
    } else if (screenWidth > 768) {
      this.view = [600, 350];
    } else {
      this.view = [300, 300];
    }
  }
}
