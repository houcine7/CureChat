import { Injectable } from '@angular/core';

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { MessageRole, OpenaiMessage } from '../components/models/OpenaiMessage';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  openApi!: OpenAIApi;
  messages: ChatCompletionRequestMessage[];

  constructor() {
    // initialize configurtions and openai api
    const configuratation = new Configuration({
      apiKey: environment.apikey,
    });
    this.openApi = new OpenAIApi(configuratation);
    // initiate messages
    this.messages = [
      {
        role: 'system',
        content: 'You are a helpful assistant',
      },
      {
        role: 'system',
        content: 'please answer only questions related to health',
      },
    ];
  }

  getdAnswers = async (qst: string): Promise<any> => {
    this.messages.push({ role: 'user', content: qst });
    const response = await this.openApi
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: this.messages,
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0,
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(response?.data?.choices[0].message);

    if (response?.data?.choices[0].message != undefined) {
      this.messages.push(response?.data?.choices[0].message);
    }

    return of(response?.data?.choices[0].message);
  };
}
