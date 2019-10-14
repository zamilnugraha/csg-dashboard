import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanSectionComponent } from './clean-section.component';

describe('CleanSectionComponent', () => {
  let component: CleanSectionComponent;
  let fixture: ComponentFixture<CleanSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
