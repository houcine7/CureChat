import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  peer: any;

  constructor() {
    this.peer = new Peer(undefined as any, {
      host: 'localhost',
      port: 3001,
    });
  }
}
