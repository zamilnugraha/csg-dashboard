import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSchedulComponent } from './staff-schedul.component';

describe('StaffSchedulComponent', () => {
  let component: StaffSchedulComponent;
  let fixture: ComponentFixture<StaffSchedulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSchedulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSchedulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
