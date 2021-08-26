import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAudioPlayerComponent } from './custom-audio-player.component';

describe('CustomAudioPlayerComponent', () => {
  let component: CustomAudioPlayerComponent;
  let fixture: ComponentFixture<CustomAudioPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAudioPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
