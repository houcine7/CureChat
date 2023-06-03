import { EventEmitter, Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket!: Socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    this.socket.emit('m', 'Hello there from Angular.');
  }

  disconnect() {
    console.log('TRYING Disconnecting...');

    if (this.socket) {
      console.log('Disconnecting...');

      this.socket.disconnect();
    }
  }

  // events = ['new-user', 'bye-user'];
  // cbEvent: EventEmitter<any> = new EventEmitter<any>();
  // receiver = this.socket.fromEvent<string>('hello');
  // constructor(private socket: Socket) {
  //   this.socket.emit('hello', { msg: 'hello' });
  //   console.log(this.socket);
  // this.listener();
  // }
  // listener = () => {
  //   this.events.forEach((evenName) => {
  //     this.socket.on(evenName, (data: any) =>
  //       this.cbEvent.emit({
  //         name: evenName,
  //         data,
  //       })
  //     );
  //   });
  // };
  // joinRoom = (data: any) => {
  //   console.log(this.socket);
  //   this.socket.emit('join', data);
  // };
  // // emit event
  // hello() {
  //   this.socket.emit('hello');
  // }
  // // listen event
  // onHello() {
  //   return this.socket.fromEvent('hello');
  // }
}
