import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHourComponent } from './result-hour.component';

describe('ResultHourComponent', () => {
  let component: ResultHourComponent;
  let fixture: ComponentFixture<ResultHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
