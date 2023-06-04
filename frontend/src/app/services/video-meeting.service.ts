import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoMeetingService {
  private cameraEnabledSubject = new BehaviorSubject<boolean>(false);
  cameraEnabled$ = this.cameraEnabledSubject.asObservable();

  constructor() {}

  setCameraEnabled(state: boolean) {
    this.cameraEnabledSubject.next(state);
  }
}
