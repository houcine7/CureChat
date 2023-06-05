import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private userService: UserService, private router: Router) {
    this.username = this.userService.getUsername();
    this.userAuthenticated = this.username?.length > 0;
    this.userAvatar =
      this.userService.getAvatr() !== null
        ? this.userService.getAvatr()
        : '/assets/user.png';
  }

  ngOnInit() {}

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  };
}
