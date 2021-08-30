import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomAudioPlayerComponent } from './components/custom-audio-player/custom-audio-player.component';
import { OperatingButtonsComponent } from './components/operating-buttons/operating-buttons.component';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { VolumeComponent } from './components/volume/volume.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomAudioPlayerComponent,
    OperatingButtonsComponent,
    SongDetailsComponent,
    VolumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
