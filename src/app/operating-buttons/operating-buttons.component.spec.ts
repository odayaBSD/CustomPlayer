import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingButtonsComponent } from './operating-buttons.component';

describe('OperatingButtonsComponent', () => {
  let component: OperatingButtonsComponent;
  let fixture: ComponentFixture<OperatingButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
