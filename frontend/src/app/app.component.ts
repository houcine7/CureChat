import { Component } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private socketService: WebSocketService) {}
  ngOnInit() {
    // this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    // this.socketService.disconnect();
  }
}
