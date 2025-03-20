import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartComponent } from './pie-chart.component';
import { By } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartComponent],
      imports: [NgxChartsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
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
      { name: 'Jan', value: 75 },
      { name: 'Feb', value: 85 },
    ];
    fixture.detectChanges();

    await fixture.whenStable();

    const chartElement = fixture.debugElement.query(
      By.css('ngx-charts-pie-chart')
    );
    expect(chartElement).toBeTruthy();
  });
});
