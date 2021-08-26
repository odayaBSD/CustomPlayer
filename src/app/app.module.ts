import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomAudioPlayerComponent } from './custom-audio-player/custom-audio-player.component';
import { OperatingButtonsComponent } from './operating-buttons/operating-buttons.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { VolumeComponent } from './volume/volume.component';

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
