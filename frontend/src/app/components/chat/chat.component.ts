import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

type ChatMessage = {
  id: number;
  quastion: string;
  date: Date;
  answer?: string;
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  showChatBox: boolean;
  showChatIcon: boolean;
  questionFormGroup!: FormGroup;
  chatMessages!: ChatMessage[];

  constructor(private chatSerivce: ChatService, private fb: FormBuilder) {
    this.showChatBox = false;
    this.showChatIcon = true;

    this.questionFormGroup = this.fb.group({
      question: this.fb.control(null),
    });

    //this.chatSerivce.getdAnswers('');
  }

  ngOnInit(): void {
    this.chatMessages = [
      {
        id: 1,
        quastion: 'I have a headache what should I do as a treatement ',
        date: new Date(),
      },
    ];
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
    let idMsg = this.chatMessages.length + 1;

    if (qst != null && qst != undefined && qst.length >= 10) {
      this.chatMessages.push({
        id: idMsg,
        quastion: qst,
        date: new Date(),
      });
      this.questionFormGroup.setValue({ question: null });

      let resp = await this.chatSerivce.getdAnswers(qst);
      resp.subscribe({
        next: (answer: any) => {
          this.chatMessages = this.chatMessages.map((msg: ChatMessage) => {
            if (msg.id == idMsg) {
              return { ...msg, answer: answer.content };
            } else {
              return msg;
            }
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  };
}
