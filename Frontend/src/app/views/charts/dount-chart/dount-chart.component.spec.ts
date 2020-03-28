import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DountChartComponent } from './dount-chart.component';

describe('DountChartComponent', () => {
  let component: DountChartComponent;
  let fixture: ComponentFixture<DountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
