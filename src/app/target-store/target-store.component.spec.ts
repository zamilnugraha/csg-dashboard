import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetStoreComponent } from './target-store.component';

describe('TargetStoreComponent', () => {
  let component: TargetStoreComponent;
  let fixture: ComponentFixture<TargetStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
