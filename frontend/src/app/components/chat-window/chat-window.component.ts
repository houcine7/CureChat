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
  currentConversationMessages: Array<Message> = [];
  errorMessage!: Error;
  queryParam: string = '';
  currentConversation!: Conversation | undefined;
  question: string = '';
  isEditing: boolean = false;
  editId: string = '';
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
    console.log('heeere');

    //this.handelSubmit().then((res: any) => console.log(res));

    this.chatWindowService.getConversations().subscribe({
      next: (data: any) => {
        this.conversations = data;
        this.currentConversation = this.conversations.find(
          (conv) => conv.id === this.queryParam
        );
        // console.log(this.currentConversation);
        // Set the current conv messages
        this.currentConversationMessages =
          this.currentConversation?.messages !== undefined &&
          this.currentConversation.messages != null
            ? this.currentConversation?.messages
            : [];

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
      console.log(params);

      this.queryParam = params['id']; // Get the value of the 'id' parameter
    });
  }

  handelNavigate = (id: string): void => {
    this.router.navigateByUrl('/user/messages?id=' + id);

    this.chatWindowService.getConversations().subscribe({
      next: (data: any) => {
        this.conversations = data;
        this.currentConversation = this.conversations.find(
          (conv) => conv.id === this.queryParam
        );
        // console.log(this.currentConversation);
        // Set the current conv messages
        this.currentConversationMessages =
          this.currentConversation?.messages !== undefined &&
          this.currentConversation.messages != null
            ? this.currentConversation?.messages
            : [];

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
  };
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
      if (this.currentConversation === undefined) {
        let date: string | Date = new Date();
        date = date.toISOString();

        let conversation: any = {
          name: '',
          userId: this.user.id,
          startDate: date,
        };

        console.log(this.question);

        if (this.question.length >= 10) {
          console.log('>=10');

          conversation.name = this.question.substring(0, 10);

          if (!(conversation?.name === '') || !(conversation.userId === '')) {
            this.chatWindowService.createConversation(conversation).subscribe({
              next: (res: any) => {
                console.log(res);
                this.currentConversation = res.id;
                this.conversations.push(res);

                this.router
                  .navigate([], { queryParams: { ['id']: res.id } })
                  .then(async () => {
                    console.log(res);
                    // Callback function to be executed after navigation
                    this.handelSubmit();
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
          this.handelSubmit().then((res: any) => console.log(res));
        }
      } else {
        this.handelSubmit();
      }
    }
  };

  onDeleteClick = (id: string) => {
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

  toggleEditing = (id: string) => {
    if (
      this.currentConversation !== undefined &&
      this.currentConversation.id === this.queryParam
    )
      this.isEditing = true;
    this.editId == id;

    // Move focus to the input field
  };

  onEditClick = (id: string) => {
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
            this.conversations = this.conversations.map((c) => {
              if (c.id == id) {
                return updatedConversation;
              } else {
                return c;
              }
            });

            this.isEditing = false;
            this.editId == '';
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

    console.log(qst);

    if (qst != null && qst != undefined && qst.length >= 10) {
      this.currentConversationMessages.push({
        userId: this.user.id,
        question: qst,
        date: new Date(),
      });
    }

    let resp = await this.chatSerivce.getdAnswers(qst);

    resp.subscribe({
      next: (answer: any) => {
        let message!: Message;

        const lastMessage = this.currentConversationMessages.pop();

        (lastMessage as Message).answer = answer?.content;

        this.currentConversationMessages.push(lastMessage as Message);

        console.log('before');

        this.chatWindowService
          .addConversationMessage(lastMessage as Message, this.queryParam)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.question = '';
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
  };
}
