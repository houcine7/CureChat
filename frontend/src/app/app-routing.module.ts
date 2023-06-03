import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { MeetingHomeComponent } from './components/meeting-home/meeting-home.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: HeroComponent,
      },
    ],
  },
  {
    path: 'user/messages',
    component: ChatWindowComponent,
  },
  {
    path: 'meeting',
    component: MeetingHomeComponent,
  },
  {
    path: 'meeting/:id',
    component: RoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
