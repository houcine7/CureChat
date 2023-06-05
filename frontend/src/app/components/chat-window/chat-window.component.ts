import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Conversation } from 'src/app/models/Conversation';
import { Message } from 'src/app/models/Message';
import { ChatWindowService } from 'src/app/services/chat-window.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

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
  question: string = '';
  isEditing: boolean = false;
  chatMsg!: Message;
  user: any;
  newConvFirstMessage!: Message;
  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;

  constructor(
    private chatWindowService: ChatWindowService,
    private route: ActivatedRoute,
    private router: Router,
    private chatSerivce: ChatService
  ) {}

  ngOnInit() {
    console.log(this.currentConversation);

    this.handelSubmit().then((res: any) => console.log(res));

    this.chatWindowService.getConversations().subscribe({
      next: (data: any) => {
        this.conversations = data;
        this.currentConversation = this.conversations.find(
          (conv) => conv.id === this.queryParam
        );
        // console.log(this.currentConversation);
        // Set the current conv messages
        this.currentConversationMessages = this.currentConversation?.messages;

        // Getting the authenticated user if there's one
        const userData = window.localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
        }
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
    this.router.navigate(['/user/messages']).then(() => {
      // Reload the page
      // console.log(this.currentConversation);
      window.location.reload();
    });
  };

  onAskClick = () => {
    if (this.user) {
      console.log(this.currentConversation);
      if (this.currentConversation === undefined || !this.currentConversation) {
        let date: string | Date = new Date();
        date = date.toISOString();
        let conversation: any = {
          name: '',
          userId: this.user.id,
          startDate: date,
        };
        if (this.question.length > 4) {
          conversation.name = this.question.substring(0, 10);
        }
        if (!(conversation?.name === '') || !(conversation.userId === '')) {
          this.chatWindowService.createConversation(conversation).subscribe({
            next: (res: any) => {
              this.conversations.push(res);
              this.router
                .navigate([], { queryParams: { ['id']: res.id } })
                .then(() => {
                  console.log(res);
                  // Callback function to be executed after navigation
                  this.handelSubmit().then((res: any) => console.log(res));
                  // window.location.reload();
                })
                .catch((error) => {
                  // Handle any error that occurs during navigation
                  console.error(error);
                });
              return res;
            },
            error: (err: Error) => {
              console.log(err);
            },
          });
        }
      } else {
        console.log('fuck here we go again');
        this.handelSubmit().then((res: any) => console.log(res));
      }
    }
  };

  onDeleteClick = (event: Event, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    const confirm: boolean = window.confirm(
      'Are you sure you want to delete it! 🔴🧺'
    );
    if (confirm) {
      this.chatWindowService.deleteConversation(id).subscribe({
        next: (res) => {
          let newConversations = this.conversations.filter(
            (item) => item.id !== id
          );
          this.conversations = newConversations;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  };

  toggleEditing = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      this.currentConversation !== undefined &&
      this.currentConversation.id === this.queryParam
    )
      this.isEditing = true;

    // Move focus to the input field
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    });
  };

  onEditClick = (event: Event, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      this.currentConversation !== undefined &&
      this.currentConversation?.name !== ''
    ) {
      this.chatWindowService
        .editConversationName(this.currentConversation?.name, id)
        .subscribe({
          next: (res: Conversation | any) => {
            if (!res?.name) {
              res.name = this.currentConversation?.name;
            }

            const updatedConversation = {
              ...(this.currentConversation as Conversation), // Type assertion to Conversation
              name: res?.name as string,
            };

            this.isEditing = false;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  };

  handelSubmit = async (): Promise<void> => {
    //
    const qst = this.question;

    if (qst != null && qst != undefined && qst.length >= 10) {
      if (this.currentConversationMessages) {
        this.currentConversationMessages.push({
          conversationId: this.queryParam,
          userId: this.user.id,
          question: qst,
          date: new Date(),
        });
      } else {
        this.currentConversationMessages = [];
        this.currentConversationMessages.push({
          conversationId: this.queryParam,
          userId: this.user.id,
          question: qst,
          date: new Date(),
        });
      }

      let resp = await this.chatSerivce.getdAnswers(qst);
      resp.subscribe({
        next: (answer: any) => {
          let message!: Message;

          if (
            this.currentConversationMessages !== undefined &&
            this.currentConversationMessages?.length > 1
          )
            this.currentConversationMessages =
              this.currentConversationMessages.map((msg: Message) => {
                if (
                  msg.question == this.question &&
                  msg.conversationId === this.queryParam
                ) {
                  this.question = '';
                  message = { ...msg, answer: answer.content };
                  return { ...msg, answer: answer.content };
                } else {
                  return msg;
                }
              });
          else {
            this.question = '';
            if (
              this.currentConversationMessages &&
              this.currentConversationMessages[0] !== undefined
            ) {
              (this.currentConversationMessages[0] as Message).conversationId =
                this.queryParam;
              (this.currentConversationMessages[0] as Message).answer =
                answer.content;
              message = this.currentConversationMessages[0];
              this.newConvFirstMessage = message;
              console.log('🚒🚒🚒', this.currentConversationMessages, message);
            }
          }

          this.chatWindowService
            .addConversationMessage(message, this.queryParam)
            .subscribe({
              next: (res) => {
                return res;
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  };
}

// if (
//   this.currentConversation != undefined &&
//   (this.currentConversation?.messages === null ||
//     this.currentConversation?.messages.length === 0)
// ) {
//   this.chatWindowService
//     .addConversationMessage(this.newConvFirstMessage, this.queryParam)
//     .subscribe({
//       next: (res) => {
//         console.log('🚍🚍🚍🚍', res);
//         return res;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
// }
