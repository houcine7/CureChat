import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username!: string;
  private firstName!: string;
  private lastName!: string;
  private avatar!: string;
  private token!: string;

  constructor() {
    const user = localStorage.getItem('user');
    const authenticatedUser = user != null ? JSON.parse(user) : undefined;

    if (user != undefined) {
      this.username = authenticatedUser.username;
      this.firstName = authenticatedUser.lastName;
      this.lastName = authenticatedUser.lastName;
      this.token = authenticatedUser.jwtToken;
      this.avatar = authenticatedUser.avatar;
    }
  }
}
