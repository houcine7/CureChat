import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  videoEnabled: boolean = true;
  audioEnabled: boolean = true;
  videoTrack!: MediaStreamTrack;
  audioTrack!: MediaStreamTrack;

  constructor() {}

  toggleVideo() {
    console.log('toggling');
    if (this.videoEnabled) {
      this.videoTrack.enabled = false;
      this.videoEnabled = false;
    } else {
      this.videoTrack.enabled = true;
      this.videoEnabled = true;
    }
  }

  toggleAudio() {
    if (this.audioEnabled) {
      this.audioTrack.enabled = false;
      this.audioEnabled = false;
    } else {
      this.audioTrack.enabled = true;
      this.audioEnabled = true;
    }
  }
}
