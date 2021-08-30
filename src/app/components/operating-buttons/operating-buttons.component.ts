import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { BehaviorSubject, Subject } from 'rxjs';
import { Playing } from 'src/app/classes/Playing';
import { Song } from 'src/app/classes/Song';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'operating-buttons',
  templateUrl: './operating-buttons.component.html',
  styleUrls: ['./operating-buttons.component.css']
})
export class OperatingButtonsComponent implements OnInit {

  @Input() songs: Song[] = [];
  @Input() playingObj: Playing = new Playing();
  currentProgress$ = new BehaviorSubject(0);
  currentTime$ = new Subject();

  @ViewChild('player', { static: true }) player: ElementRef;


  audio = new Audio();
  isPlaying = false;
  activeSong;
  durationTime: string;
  currentState: number = 0;
  faster;
  activeRepeat: boolean = true;
  activeShuffle: boolean = false;
  currentIndex: number = 0;
  placingsArray: number[] = [];
  length: number = 0;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    if (this.songs[this.placingsArray[0]] != null && this.songs[this.placingsArray[0]] != undefined) {
      this.player.nativeElement.src = '../../assets/songs/' + this.songs[this.placingsArray[0]].src;
      this.player.nativeElement.load();
      this.activeSong = this.songs[this.placingsArray[0]];
      this.isPlaying = false;
    }
  }

  ngOnChanges() {
    this.updateLength();
    this.activeSong = this.songs[this.placingsArray[0]];
    this.isPlaying = false;
    if (this.currentIndex != this.playingObj.index) {
      this.currentIndex = this.playingObj.index || 0;
      this.durationTime = '0:00';
      this.player.nativeElement.src = '../../assets/songs/' + this.songs[this.placingsArray[0]].src;
      this.player.nativeElement.load();
    }
    if (this.playingObj.play == true) {
      this.playSong(true);
    }
    else {
      this.onPause();
    }
    this.storageService.watchLocalStorage().subscribe((data: string) => {
      if (data == "volume") {
        this.player.nativeElement.volume = parseFloat(localStorage.getItem("volume"));
      }
    });
  }

  updateLength() {
    if (this.length !== this.songs.length) {
      this.length = this.songs.length;
      this.updatePlacing();
    }
  }

  updatePlacing() {
      this.placingsArray = Array.from(Array(this.length).keys());
  }

  playShuffle() {
    this.activeShuffle = !this.activeShuffle;
    if (this.activeShuffle === true) {
      this.placingsArray = this.shuffle(this.placingsArray);
    }
    else {
      this.updatePlacing();
    }
  }

  startClick = (e) => {
    console.log(e);
    this.faster = e.target.innerText == "fast_forward" ? setInterval(() => {
      if (this.player.nativeElement.currentTime + 1 < this.player.nativeElement.duration) {
        this.player.nativeElement.currentTime++;
        console.log('click');
      }
    }, 200) :
      setInterval(() => {
        if (this.player.nativeElement.currentTime - 1 > 0) {
          this.player.nativeElement.currentTime--;
          console.log('click');
        }
      }, 200);
  };

  endClick = (e) => {
    clearInterval(this.faster);
  }

  onInputChange(event: MatSliderChange) {
    this.player.nativeElement.currentTime = event.value;
  }

  playSong(auto?: boolean): void {
    if (this.player.nativeElement.src != (null && undefined) && this.activeSong != this.songs[this.placingsArray[this.currentIndex]]) {
      this.activeSong = this.songs[this.placingsArray[this.currentIndex]];
      this.durationTime = '0:00';
      this.player.nativeElement.src = '../../assets/songs/' + this.activeSong.src;
    }
    this.audio.pause();
    this.storageService.setItem("index", this.songs.indexOf(this.activeSong));
    this.storageService.setItem("playing", true);
    if (auto == true && this.activeRepeat == true || auto == (false || undefined || null)) {
      this.player.nativeElement.play();
      this.isPlaying = true;
    }
    else {
      this.onPause();
    }
  }
  
  shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  onTimeUpdate() {

    // Set song duration time
    if (!this.durationTime || this.durationTime == '0:00') {
      this.setSongDuration();
    }

    // Emit converted audio currenttime in user friendly ex. 01:15
    const currentMinutes = this.generateMinutes(this.player.nativeElement.currentTime);
    const currentSeconds = this.generateSeconds(this.player.nativeElement.currentTime);
    this.currentTime$.next(this.generateTimeToDisplay(currentMinutes, currentSeconds));


    // Emit amount of song played percents
    const percents = this.generatePercentage(this.player.nativeElement.currentTime, this.player.nativeElement.duration);
    if (!isNaN(percents)) {
      this.currentProgress$.next(percents);
    }

    this.currentState = this.player.nativeElement.currentTime;

  }

  onEnded(): void {
    this.storageService.setItem("playing", false);
    this.playNextSong(true);
    // this.player.nativeElement.load();
  }

  forward(value): void {
    if (!this.player.nativeElement.paused) {
      if (this.player.nativeElement.currentTime + value < this.player.nativeElement.duration) {
        this.player.nativeElement.currentTime += value;
      }
      else {
        this.player.nativeElement.currentTime = this.player.nativeElement.duration;
      }
    }
  }

  rewind(value): void {
    if (!this.player.nativeElement.paused) {
      if (this.player.nativeElement.currentTime - value > 0) {
        this.player.nativeElement.currentTime -= value;
      }
      else {
        this.player.nativeElement.currentTime = 0;
      }
    }
  }

  // Play song that comes after active song
  playNextSong(auto?: boolean): void {
    const nextSongIndex = this.currentIndex + 1 < this.songs.length ?
      this.currentIndex + 1 : -1;
    if (nextSongIndex === -1) {
      this.currentIndex = 0;
      this.playSong(auto);
    } else {
      this.currentIndex = nextSongIndex;
      this.playSong();
    }
  }

  // Play song that comes before active song
  playPreviousSong(): void {
    const prevSongIndex = this.currentIndex - 1 >= 0 ?
      this.currentIndex - 1 : -1;
    if (prevSongIndex === -1) {
      this.currentIndex = this.songs.length - 1;
      this.playSong();
    } else {
      this.currentIndex = prevSongIndex;
      this.playSong();
    }
  }

  // Calculate song duration and set it to user friendly format, ex. 01:15
  setSongDuration(): void {
    const durationInMinutes = this.generateMinutes(this.player.nativeElement.duration);
    const durationInSeconds = this.generateSeconds(this.player.nativeElement.duration);

    if (!isNaN(this.player.nativeElement.duration)) {
      this.durationTime = this.generateTimeToDisplay(durationInMinutes, durationInSeconds);
    }
  }

  // Generate minutes from audio time
  generateMinutes(currentTime: number): number {
    return Math.floor(currentTime / 60);
  }

  // Generate seconds from audio time
  generateSeconds(currentTime: number): number | string {
    const secsFormula = Math.floor(currentTime % 60);
    return secsFormula < 10 ? '0' + String(secsFormula) : secsFormula;
  }

  generateTimeToDisplay(currentMinutes, currentSeconds): string {
    return `${currentMinutes}:${currentSeconds}`;
  }

  // Generate percentage of current song
  generatePercentage(currentTime: number, duration: number): number {
    return Math.round((currentTime / duration) * 100);
  }

  onPause(): void {
    this.storageService.setItem("playing", false);
    this.player.nativeElement.pause();
    this.isPlaying = false;
  }

  getDuration(): number {
    if (this.player != undefined)
      return this.player.nativeElement.duration;
    return 0;
  }

}
