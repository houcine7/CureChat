import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  events = ['new-user', 'bye-user'];
  cbEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private socket: Socket) {
    this.socket.emit('hello', 'hello');
    this.listener();
  }

  listener = () => {
    this.events.forEach((evenName) => {
      this.socket.on(evenName, (data: any) =>
        this.cbEvent.emit({
          name: evenName,
          data,
        })
      );
    });
  };

  joinRoom = (data: any) => {
    this.socket.emit('join', data);
  };
}

// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root',
// })
// export class WebSocketService {
//   socket!: Socket;

//   constructor() {}

//   setupSocketConnection() {
//     this.socket = io('http://localhost:3000');
//     this.socket.emit('my message', 'Hello there from Angular.');
//     this.socket.on('my broadcast', (data: string) => {
//       console.log(data);
//     });
//     this.socket.on('new-user', (data: any) => {
//       console.log(data);
//     });
//     this.socket.on('bye-user', (data: any) => {
//       console.log(data);
//     });

//     this.socket.on('join', (data: any) => {
//       console.log(data);
//     });
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   }

//   joinRoom = (data: any) => {
//     this.socket.emit('join', data);
//   };
// }
