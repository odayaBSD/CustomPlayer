import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Song } from 'src/app/classes/Song';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  @Input() songs: Song[] = [];
  index: number = 0;
  private storageSub = new Subject<String>();

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.watchStorage().subscribe((data: string) => {
      if (data == "index") {
        this.index = parseInt(sessionStorage.getItem("index"));
      }
    });
  }

}
