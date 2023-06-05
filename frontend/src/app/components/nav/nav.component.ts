import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  userAuthenticated: boolean = false;
  username!: string;
  userAvatar!: string;
  constructor(private userService: UserService) {
    this.username = this.userService.getUsername();
    this.userAuthenticated = this.username?.length > 0;
    this.userAvatar =
      this.userService.getAvatr() !== null
        ? this.userService.getAvatr()
        : '/assets/user.png';
  }

  ngOnInit() {}
}
