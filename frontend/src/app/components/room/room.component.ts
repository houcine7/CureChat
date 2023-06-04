import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { PeerService } from '../../services/peer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: [
    './room.component.css',
    '../menu-bottom/menu-bottom.component.css',
    '../video-player/video-player.component.css',
  ],
})
export class RoomComponent implements OnInit {
  roomName: string | null;
  currentStream!: MediaStream;
  listUser: Array<any> = new Array(2);
  audioEnabled: boolean = true;
  videoEnabled: boolean = true;
  videoMeeting: any;
  cameraEnabled: any;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private peerService: PeerService,
    private router: Router
  ) {
    this.roomName = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
    console.log('heeere 1');
  }

  ngOnDestroy() {
    this.stopStream();
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
          audio: true,
          video: true,
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
          audio: true,
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
    console.log(this.listUser);
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

  toggleVideoStream = () => {
    const videoTrack = this.currentStream
      .getTracks()
      .find((track) => track.kind === 'video');
    if (videoTrack?.enabled) {
      videoTrack.enabled = false;
      this.videoEnabled = false;
    } else {
      videoTrack!.enabled = true;
      this.videoEnabled = true;
    }
  };

  toggleAudioStream = () => {
    const audioTrack = this.currentStream
      .getTracks()
      .find((track) => track.kind === 'audio');
    if (audioTrack?.enabled) {
      audioTrack.enabled = false;
      this.audioEnabled = false;
    } else {
      audioTrack!.enabled = true;
      this.audioEnabled = true;
    }
  };

  copyMeetingLink = () => {
    let url = document.location.href;
    navigator.clipboard.writeText(url).then(
      function () {
        window.alert('Link Copied!');
      },
      function () {
        window.alert('Copy error');
      }
    );
  };

  stopStream() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setTimeout(() => {
      this.router.navigate(['/']); // Replace 'home page' with the actual route for your home page
    }, 1500);
  }
}
