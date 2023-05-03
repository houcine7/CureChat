import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  showChatBox: boolean;
  showChatIcon: boolean;

  constructor() {
    this.showChatBox = false;
    this.showChatIcon = true;
  }

  handelIconClick(): void {
    this.showChatBox = true;
    this.showChatIcon = false;
  }

  handelCloseBtnClick(): void {
    this.showChatBox = false;
    this.showChatIcon = true;
  }
}
