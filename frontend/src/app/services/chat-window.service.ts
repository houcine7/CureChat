import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { Conversation } from '../models/Conversation';

@Injectable({
  providedIn: 'root',
})
export class ChatWindowService {
  constructor(private http: HttpClient) {}

  public getConversations(): Observable<Array<Conversation>> {
    return this.http.get<Array<Conversation>>(
      'http://localhost:8080/api/conversations'
    );
  }

  public createConversation(
    conversation: Conversation
  ): Observable<Conversation> {
    return this.http.post<Conversation>(
      'http://localhost:8080/conversations',
      conversation
    );
  }

  // public getConversationMessages() => {

  // }

  saveMessage = () => {};
}
