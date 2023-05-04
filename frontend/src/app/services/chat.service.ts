import { Injectable } from '@angular/core';

import { Configuration, OpenAIApi } from 'openai';

import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  openApi!: OpenAIApi;

  constructor() {
    // initialize configurtions

    const configuratation = new Configuration({
      apiKey: environment.apikey,
    });

    console.log(environment.apikey);
    console.log('--------------------------------');
    console.log(configuratation);

    this.openApi = new OpenAIApi(configuratation);
  }

  getdAnswers = async (qst: string): Promise<any> => {
    const response = await this.openApi
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: qst }],
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

    return of(response);
  };
}
