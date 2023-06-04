import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { PeerService } from '../../services/peer.service';
import { VideoMeetingService } from 'src/app/services/video-meeting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  roomName: string | null;
  currentStream: any;
  cameraEnabled: Observable<boolean>;
  listUser: Array<any> = new Array(2);

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private peerService: PeerService,
    private videoMeeting: VideoMeetingService
  ) {
    this.roomName = route.snapshot.paramMap.get('id');
    this.cameraEnabled = this.videoMeeting.cameraEnabled$;
    console.log(this.cameraEnabled);
  }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
    console.log('heeere 1');
  }

  initPeer = () => {
    const { peer } = this.peerService;
    peer.on('open', (id: string) => {
      const body = {
        idPeer: id,
        roomName: this.roomName,
      };

      this.webSocketService.joinRoom(body);
    });

    peer.on(
      'call',
      (callEnter: any) => {
        console.log('hellooooow');

        callEnter.answer(this.currentStream);
        callEnter.on('stream', (streamRemote: any) => {
          console.log('hadadfadfa');
          this.addVideoUser(streamRemote);
        });
      },
      (err: any) => {
        console.log('*** ERROR *** Peer call ', err);
      }
    );
  };

  initSocket = () => {
    this.webSocketService.cbEvent.subscribe((res) => {
      if (res.name === 'new-user') {
        const { idPeer } = res.data;
        this.sendCall(idPeer, this.currentStream);
      }
    });
  };

  checkMediaDevices = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: this.cameraEnabled ? true : false,
        })
        .then((stream) => {
          this.currentStream = stream;
          this.addVideoUser(stream);
        })
        .catch(() => {
          console.log('*** ERROR *** Not permissions');
        });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia({
          video: true,
        })
        .then((stream) => {
          this.currentStream = stream;
          this.addVideoUser(stream);
        })
        .catch(() => {
          console.log('*** ERROR *** Not permissions');
        });
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  };

  addVideoUser = (stream: any) => {
    if (this.listUser.length < 3) this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  };

  sendCall = (idPeer: string, stream: any) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    if (!!newUserCall) {
      newUserCall.on('stream', (userStream: any) => {
        this.addVideoUser(userStream);
      });
    }
  };
}
