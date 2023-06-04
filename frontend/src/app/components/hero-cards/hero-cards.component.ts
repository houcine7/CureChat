import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

type cardData = {
  img: string;
  name: string;
  number: number;
};

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css'],
})
export class HeroCardsComponent implements OnInit {
  data: cardData[];
  clientsNumber: number = 0;

  constructor(private userService: UserService) {
    this.data = [
      {
        img: 'assets/clients.png',
        name: 'clients',
        number: this.clientsNumber,
      },
      {
        img: 'assets/chat.png',
        name: 'questions',
        number: 856,
      },
      {
        img: 'assets/doctor.png',
        name: 'doctors',
        number: 410,
      },
      {
        img: 'assets/hospital.png',
        name: 'hospitals',
        number: 700,
      },
    ];
  }

  ngOnInit(): void {
    this.userService.getNumberUsers().subscribe({
      next: (res) => {
        console.log(res);

        this.clientsNumber = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
