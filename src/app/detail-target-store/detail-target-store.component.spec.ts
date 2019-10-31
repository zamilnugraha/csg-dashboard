import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTargetStoreComponent } from './detail-target-store.component';

describe('DetailTargetStoreComponent', () => {
  let component: DetailTargetStoreComponent;
  let fixture: ComponentFixture<DetailTargetStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTargetStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTargetStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
