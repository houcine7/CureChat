import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { Conversation } from '../models/Conversation';

@Injectable({
  providedIn: 'root',
})
export class ChatWindowService {
  authenticatedUser: any;
  ApiBaseURL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    this.authenticatedUser = user != null ? JSON.parse(user) : undefined;
  }

  public getConversations(): Observable<Array<Conversation>> {
    return this.http.get<Array<Conversation>>(
      this.ApiBaseURL + 'conversations'
    );
  }

  public createConversation(conversation: Conversation) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticatedUser.jwtToken}`,
    });

    let headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authenticatedUser.jwtToken}`,
    });
    let options = { headers: headers1 };

    return this.http.post(
      'http://localhost:8080/api/conversations',
      JSON.stringify(conversation),
      options
    );
  }

  public deleteConversation(id: string) {
    let headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authenticatedUser.jwtToken}`,
    });

    let options = { headers: headers1 };

    return this.http.delete(
      'http://localhost:8080/api/conversations/' + id,
      options
    );
  }

  public editConversationName(name: string, id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticatedUser.jwtToken}`,
    });

    let headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authenticatedUser.jwtToken}`,
    });
    let options = { headers: headers1 };

    return this.http.put(
      'http://localhost:8080/api/conversations/' + id,
      JSON.stringify({ name }),
      options
    );
  }

  // public getConversationMessages() => {

  // }

  saveMessage = () => {};
}
