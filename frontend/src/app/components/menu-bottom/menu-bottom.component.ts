import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
