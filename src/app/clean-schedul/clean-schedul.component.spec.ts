import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanSchedulComponent } from './clean-schedul.component';

describe('CleanSchedulComponent', () => {
  let component: CleanSchedulComponent;
  let fixture: ComponentFixture<CleanSchedulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanSchedulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanSchedulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
