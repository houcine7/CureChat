import { Component, OnInit } from '@angular/core';
import { RoomComponent } from '../room/room.component';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css'],
})
export class MenuBottomComponent implements OnInit {
  menu: Array<any> = [
    {
      name: 'Mic',
      icon: 'uil uil-microphone',
      onClick: this.roomService.toggleAudio,
    },
    {
      name: 'Camera',
      icon: 'uil uil-camera',
      onClick: this.roomService.toggleVideo,
    },
    { name: 'End', icon: 'uil uil-stop-circle' },
    { name: 'Share', icon: 'uil uil-share' },
  ];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {}

  clicker = () => {};
}
