import { Component, OnInit } from '@angular/core';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.css'],
})
export class MenuBottomComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clicker = () => {};
}
