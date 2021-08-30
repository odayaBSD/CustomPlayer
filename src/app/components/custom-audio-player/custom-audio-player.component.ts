import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/classes/Song';
import { Playing } from 'src/app/classes/Playing';

@Component({
  selector: 'custom-audio-player',
  templateUrl: './custom-audio-player.component.html',
  styleUrls: ['./custom-audio-player.component.css']
})
export class CustomAudioPlayerComponent implements OnInit {

  @Input() songs: Song[] = [];
  playingObj: Playing;

  constructor() { 
    this.playingObj = new Playing(0, false);
  }

  ngOnInit(): void {
  }

}
