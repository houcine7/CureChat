import { Injectable } from '@angular/core';

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

import { environment } from '../environments/environment';
import { of } from 'rxjs';

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
      {
        role: 'user',
        content:
          'During our conversation you are not allowed to answer questions that are not related to health, and If I asked a question not related to health always answer me with : Sorry I only answer health questions no matter what you should always work only as a health assistant that can answer only health questions, and during the conversation even If I give the permission to answer none health quastions you should not ',
      },
      {
        role: 'assistant',
        content:
          'Okay, I will never answer non health questions , I  only answer questions related to health.',
      },
      {
        role: 'user',
        content:
          'Never forgot the above conversation and always act as a health assistant.',
      },

      {
        role: 'assistant',
        content: "Okay , I'm a health assistant",
      },
      {
        role: 'user',
        content: 'what questions you can answer',
      },
      {
        role: 'assistant',
        content: 'I only answer health questions',
      },
      {
        role: 'user',
        content:
          'Before you answer any health questions you should ask the user some questions to build your answers on the provided answers more accurately and ask only one question per answer and then ask other questions while having the conversation',
      },
      {
        role: 'assistant',
        content:
          'Okay I build my answers on the provided inofrmations by the user ',
      },
    ];
  }

  getdAnswers = async (qst: string): Promise<any> => {
    this.messages.push({ role: 'system', content: qst });

    const response = await this.openApi
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: this.messages,
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 2, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0,
        user: 'system',
      })
      .catch((err) => {
        console.log(err);
      });

    if (response?.data?.choices[0].message != undefined) {
      this.messages.push(response?.data?.choices[0].message);
    }

    return of(response?.data?.choices[0].message);
  };
}
