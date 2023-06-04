import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

export type RegisterData = {
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
};

export type LoginData = {
  username: string;
  password: string;
};

const ApiBaseURL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private htttp: HttpClient) {}

  // register user function
  register = (data: RegisterData): Observable<any> => {
    return this.htttp.post(ApiBaseURL + 'auth/register', data).pipe(
      map((res) => {
        return res;
      })
    );
  };

  // login user function

  loging = (data: LoginData): Observable<any> => {
    return this.htttp.post(ApiBaseURL + 'auth/login', data).pipe(
      map((res) => {
        return res;
      })
    );
  };
}
