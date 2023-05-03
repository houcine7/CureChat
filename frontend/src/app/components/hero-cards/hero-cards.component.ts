import { Component } from '@angular/core';

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
export class HeroCardsComponent {
  data: cardData[];

  constructor() {
    this.data = [
      {
        img: 'assets/clients.png',
        name: 'clients',
        number: 578,
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
}
