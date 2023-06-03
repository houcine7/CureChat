import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { PeerService } from '../../services/peer.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  roomName!: string;
  currentStream!: any;
  listUser: Array<any> = [];
  private socket!: Socket;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private peerService: PeerService
  ) {
    this.roomName = route.snapshot.paramMap.get('id')!;
    this.socket = io('http://localhost:3000');
    this.socket.on('hello', (data: any) => {
      // Handle the received data
      console.log(data);
    });

    // Emit an event to the server
    this.socket.emit('hello', { message: 'Hello, server!' });
  }

  ngOnInit(): void {
    // this.checkMediaDevices();
    // this.initPeer();
    // this.initSocket();
    // this.webSocketService.hello();
    // this.webSocketService.onHello().subscribe((res) => console.log(res));
    console.log('hello');
    // this.webSocketService.receiver.subscribe((res) => console.log(res));
  }

  // initPeer = () => {
  //   const { peer } = this.peerService;
  //   peer.on('open', (id: any) => {
  //     const body = {
  //       idPeer: id,
  //       roomName: this.roomName,
  //     };

  //     this.webSocketService.joinRoom(body);
  //   });

  //   peer.on(
  //     'call',
  //     (callEnter: any) => {
  //       console.log('calling ...📞');
  //       callEnter.answer(this.currentStream);
  //       console.log(this.currentStream);
  //       callEnter.on('stream', (streamRemote: any) => {
  //         this.addVideoUser(streamRemote);
  //       });
  //     },
  //     (err: Error) => {
  //       console.log('*** ERROR *** Peer call ', err);
  //     }
  //   );
  // };

  // initSocket = () => {
  //   this.webSocketService.cbEvent.subscribe((res) => {
  //     console.log(res);
  //     if (res.name === 'new-user') {
  //       const { idPeer } = res.data;
  //       this.sendCall(idPeer, this.currentStream);
  //     }
  //   });
  // };

  // checkMediaDevices = () => {
  //   if (navigator && navigator.mediaDevices) {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         audio: false,
  //         video: true,
  //       })
  //       .then((stream) => {
  //         this.currentStream = stream;
  //         this.addVideoUser(stream);
  //       })
  //       .catch(() => {
  //         console.log('*** ERROR *** Not permissions');
  //       });
  //   } else if (navigator.mediaDevices.getDisplayMedia) {
  //     navigator.mediaDevices
  //       .getDisplayMedia({
  //         video: true,
  //       })
  //       .then((stream) => {
  //         this.currentStream = stream;
  //         this.addVideoUser(stream);
  //       })
  //       .catch(() => {
  //         console.log('*** ERROR *** Not permissions');
  //       });
  //   } else {
  //     console.log('*** ERROR *** Not media devices');
  //   }
  // };

  // addVideoUser = (stream: any) => {
  //   this.listUser.push(stream);
  //   const unique = new Set(this.listUser);
  //   this.listUser = [...unique];
  // };

  // sendCall = (idPeer: string, stream: any) => {
  //   const newUserCall = this.peerService.peer.call(idPeer, stream);
  //   if (!!newUserCall) {
  //     newUserCall.on('stream', (userStream: any) => {
  //       this.addVideoUser(userStream);
  //     });
  //   }
  // };
}
