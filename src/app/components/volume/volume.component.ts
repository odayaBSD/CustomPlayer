import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  currentState: number = 1;
  percentVolume: number;
  toggle: boolean = false;
  prevVolume: number = 0;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("volume")) {
      this.storageService.setItemToLocal("volume", this.currentState);
      this.convertToPercent(this.currentState);
    }
    else {
      this.updateVolume(parseFloat(localStorage.getItem("volume")));
    }
  }

  onInputChange(event): void {
    this.updateVolume(event.value);
  }

  updateVolume(value: number) {
    this.currentState = value;
    this.convertToPercent(value);
    this.storageService.setItemToLocal("volume", value);
  }

  convertToPercent(value: number): void {
    this.percentVolume = Math.round(value * 100);
  }

  getSuitableIcon(): string {
    switch (true) {
      case this.percentVolume == 0:
        return "volume_off";
      case this.percentVolume < 33:
        return "volume_mute";
      case this.percentVolume < 66:
        return "volume_down";
      case this.percentVolume <= 100:
        return "volume_up";
    }
  }

  toggleVolume(): void {
    if (!this.toggle && this.currentState != 0) {
      this.prevVolume = this.currentState;
      this.updateVolume(0);
    }
    else {
      if (this.prevVolume != 0) {
        this.updateVolume(this.prevVolume);
      }
      else {
        this.updateVolume(0.5);
      }
    }
    this.toggle = !this.toggle;
  }

}
