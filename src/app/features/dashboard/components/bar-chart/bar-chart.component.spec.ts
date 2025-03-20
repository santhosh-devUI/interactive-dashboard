import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
import { By } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    await TestBed.configureTestingModule({
      declarations: [BarChartComponent],
      imports: [NgxChartsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
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
      { name: 'Product A', value: 120 },
      { name: 'Product B', value: 200 },
    ];
    fixture.detectChanges();

    await fixture.whenStable();

    const chartElement = fixture.debugElement.query(
      By.css('ngx-charts-bar-vertical')
    );
    expect(chartElement).toBeTruthy();
  });
});
