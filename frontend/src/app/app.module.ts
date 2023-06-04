import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeroCardsComponent } from './components/hero-cards/hero-cards.component';
import { ChatComponent } from './components/chat/chat.component';
import { CardPresntationComponent } from './components/card-presntation/card-presntation.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { MeetingHomeComponent } from './components/meeting-home/meeting-home.component';
import { RoomComponent } from './components/room/room.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MenuBottomComponent } from './components/menu-bottom/menu-bottom.component';
import { WebSocketService } from './services/web-socket.service';
import { PeerService } from './services/peer.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeroComponent,
    HeroCardsComponent,
    ChatComponent,
    CardPresntationComponent,
    ChatWindowComponent,
    MeetingHomeComponent,
    RoomComponent,
    VideoPlayerComponent,
    MenuBottomComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [WebSocketService, PeerService, AngularFireStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
