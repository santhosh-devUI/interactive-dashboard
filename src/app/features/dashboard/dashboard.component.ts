import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/core/services/data.service';
import { setMetric } from 'src/app/core/state/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any;
  selectedMetricTemplate!: TemplateRef<any>;
  tableData: any[] = [];
  tableTitle: any;

  @ViewChild('salesTemplate')
  salesTemplate!: TemplateRef<any>;
  @ViewChild('userEngagementTemplate')
  userEngagementTemplate!: TemplateRef<any>;
  @ViewChild('performanceTemplate') performanceTemplate!: TemplateRef<any>;

  constructor(private dataService: DataService, private store: Store) {}
  ngOnInit(): void {
    this.dataService.getData().subscribe((res: any) => {
      this.data = res;
      this.updateTableData('sales');
      this.tableTitle = 'Sales Data';
      this.selectedMetricTemplate = this.salesTemplate;
    });
  }
  onMetricChange(event: Event) {
    const metric = (event.target as HTMLSelectElement).value;
    this.store.dispatch(setMetric({ metric }));
    this.updateTableData(metric);
    this.tableTitle = metric;
    switch (metric) {
      case 'sales':
        this.selectedMetricTemplate = this.salesTemplate;
        this.tableTitle = 'Sales Data';
        break;
      case 'userEngagement':
        this.selectedMetricTemplate = this.userEngagementTemplate;
        this.tableTitle = 'User Engagement Data';
        break;
      case 'performance':
        this.selectedMetricTemplate = this.performanceTemplate;
        this.tableTitle = 'Performance Data';
        break;
    }
  }
  updateTableData(metric: string): void {
    switch (metric) {
      case 'sales':
        this.tableData = this.data.sales;
        break;
      case 'userEngagement':
        this.tableData = this.data.userEngagement[0].series;
        break;
      case 'performance':
        this.tableData = this.data.performance;
        break;
    }
  }
}
