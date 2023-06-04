import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username!: string;
  private firstName!: string;
  private lastName!: string;
  private avatar!: string;
  private token!: string;
  private APIURL: string = 'http://localhost:8080/api/users/';

  constructor(private http: HttpClient) {
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

  getUsername(): string {
    return this.username;
  }

  getName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  getToken(): string {
    return this.token;
  }

  getAvatr(): string {
    return this.avatar;
  }

  //
  getNumberUsers(): Observable<any> {
    return this.http.get(this.APIURL + 'count').pipe(
      map((res) => {
        return res;
      })
    );
  }
}
