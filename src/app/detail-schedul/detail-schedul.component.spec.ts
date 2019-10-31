import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailScheduldComponent } from './detail-schedul.component';

describe('DetailScheduldComponent', () => {
  let component: DetailScheduldComponent;
  let fixture: ComponentFixture<DetailScheduldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailScheduldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailScheduldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
