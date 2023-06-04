import { Component, OnInit } from '@angular/core';
import { Conversation } from 'src/app/models/Conversation';
import { Message } from 'src/app/models/Message';
import { ChatWindowService } from 'src/app/services/chat-window.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
  conversations: Array<Conversation> = [];
  currentConversationMessages: Array<Message> | undefined = [];
  errorMessage!: Error;
  queryParam: string = '';
  currentConversation!: Conversation | undefined;

  constructor(
    private chatWindowService: ChatWindowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.chatWindowService.getConversations().subscribe({
      next: (data: any) => {
        this.conversations = data;
        this.currentConversation = this.conversations.find(
          (conv) => conv.id === this.queryParam
        );
        // Set the current conv messages
        this.currentConversationMessages = this.currentConversation?.messages;
      },
      error: (err: Error) => {
        this.errorMessage = err;
      },
    });

    // Watching queryParam changes
    this.route.queryParams.subscribe((params) => {
      this.queryParam = params['id']; // Get the value of the 'id' parameter
    });
  }

  onCreateNewConversationClick = () => {
    this.currentConversationMessages = [];
  };

  onConversationClick = () => {};
}
