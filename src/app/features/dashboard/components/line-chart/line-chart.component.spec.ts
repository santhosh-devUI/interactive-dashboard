import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { By } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineChartComponent],
      imports: [NgxChartsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the chart when data is provided', async () => {
    component.data = [
      {
        name: 'Engagement',
        series: [
          { name: 'Week 1', value: 50 },
          { name: 'Week 2', value: 90 },
        ],
      },
    ];
    fixture.detectChanges();

    await fixture.whenStable();

    const chartElement = fixture.debugElement.query(
      By.css('ngx-charts-line-chart')
    );
    expect(chartElement).toBeTruthy();
  });
});
