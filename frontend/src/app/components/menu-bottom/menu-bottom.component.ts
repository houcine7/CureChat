import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoMeetingService } from 'src/app/services/video-meeting.service';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css'],
})
export class MenuBottomComponent implements OnInit {
  menu: Array<any> = [
    { name: 'Mic', icon: 'uil uil-microphone' },
    { name: 'Camera', icon: 'uil uil-camera' },
    { name: 'End', icon: 'uil uil-stop-circle' },
    { name: 'Share', icon: 'uil uil-share' },
  ];

  cameraEnabled: Observable<boolean>;
  state: boolean = false;

  constructor(private videoMeeting: VideoMeetingService) {
    this.cameraEnabled = this.videoMeeting.cameraEnabled$;
  }

  ngOnInit(): void {
    console.log('herer i am');
  }

  handelClickCamera(): void {
    this.videoMeeting.setCameraEnabled(this.state);
    this.state = !this.state;
    this.cameraEnabled = this.videoMeeting.cameraEnabled$;
    console.log('yes');
  }
}
