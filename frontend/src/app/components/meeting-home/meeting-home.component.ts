import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-meeting-home',
  templateUrl: './meeting-home.component.html',
  styleUrls: ['./meeting-home.component.css'],
})
export class MeetingHomeComponent {
  userAuthenticated: boolean = false;
  username!: string;
  userAvatar!: string;
  constructor(private router: Router, private userService: UserService) {
    this.username = this.userService.getUsername();
    this.userAuthenticated = this.username?.length > 0;
    this.userAvatar =
      this.userService.getAvatr() !== null
        ? this.userService.getAvatr()
        : '/assets/user.png';
  }

  ngOnInit(): void {}

  goToRoom = () => {
    this.router.navigate(['/meeting/', uuidv4()]);
  };
}
