import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DataService } from 'src/app/core/services/data.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreModule } from '@ngrx/store';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataService: DataService;

  const mockData = {
    sales: [
      { name: 'Product A', value: 120 },
      { name: 'Product B', value: 200 },
    ],
    userEngagement: [
      {
        name: 'Engagement',
        series: [
          { name: 'Week 1', value: 50 },
          { name: 'Week 2', value: 90 },
        ],
      },
    ],
    performance: [
      { name: 'Jan', value: 75 },
      { name: 'Feb', value: 85 },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        LineChartComponent,
        BarChartComponent,
        PieChartComponent,
      ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
      ],
      providers: [DataService],
    }).compileComponents();

    dataService = TestBed.inject(DataService);
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on initialization', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.data).toEqual(mockData);
  });

  it('should update the table data when metric changes', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(
      By.css('#metric-select')
    ).nativeElement;
    selectElement.value = 'userEngagement';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.tableData).toEqual(mockData.userEngagement[0].series);
  });
});
