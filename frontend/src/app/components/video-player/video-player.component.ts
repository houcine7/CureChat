import { Component, Input, OnInit } from '@angular/core';
import { VideoMeetingService } from 'src/app/services/video-meeting.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() stream: any;

  constructor() {}

  ngOnInit(): void {}
}
