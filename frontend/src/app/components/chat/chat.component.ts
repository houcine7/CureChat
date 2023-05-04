import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  showChatBox: boolean;
  showChatIcon: boolean;
  questionFormGroup!: FormGroup;

  constructor(private chatSerivce: ChatService, private fb: FormBuilder) {
    this.showChatBox = false;
    this.showChatIcon = true;

    this.questionFormGroup = this.fb.group({
      question: this.fb.control(null),
    });

    //this.chatSerivce.getdAnswers('');
  }

  handelIconClick(): void {
    this.showChatBox = true;
    this.showChatIcon = false;
  }

  handelCloseBtnClick(): void {
    this.showChatBox = false;
    this.showChatIcon = true;
  }

  handelSubmit = async (): Promise<void> => {
    //
    const qst = this.questionFormGroup.value.question;

    if (qst != null && qst != undefined && qst.length >= 10) {
      let resp = await this.chatSerivce.getdAnswers(qst);
      resp.subscribe({
        next: (answer: any) => {
          console.log(answer);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  };
}
