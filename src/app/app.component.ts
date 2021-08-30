import { Component } from '@angular/core';
import { Song } from 'src/app/classes/Song';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomPlayer';
  songs: Song[] = [];
  constructor() {
    this.songs = [
      new Song(50,
        "מי יודע",
        "איציק-דדיה-מי-יודע.mp3",
        "איציק דדיה",
        "263013_tumb_750Xauto.jpg"),
      new Song(51,
        "מה טובו אוהליך",
        "משה-קליין-מה-טובו-אוהליך.mp3",
        "משה קליין",
        "275133_tumb_750Xauto.jpg"),
      new Song(52,
        "כל האור בעולם",
        "מיכה גמרמן - כל האור בעולם.mp3",
        "מיכה גמרמן",
        "275026_tumb_750Xauto.jpg"),
      new Song(53,
        "עם סגולה",
        "עם-סגולה-שלום-ברנהולץ.mp3",
        "שלום ברנהולץ",
        "253749_tumb_750Xauto.jpg"),
      new Song(54,
        "שיר פשוט",
        "6ed5cda63effd6de124164d9160c3ed1.mp3",
        "משה קליין",
        "3365.jpg")
    ];
  }
}
