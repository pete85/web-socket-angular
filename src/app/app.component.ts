import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {WebSocketService} from './services/web-socket/web-socket.service';
import {ChatService} from './services/chat-service/chat.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';

export class Message {
  user?: string;
  message?: string;
}

export class User {
  id?: number;
  name?: string;
  phone?: string;
  image?: string;
  roomId?: RoomId;
}

export interface RoomId {
  1?: string;
  2?: string;
  3?: string;
  4?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  subEvent$: Subscription | undefined;
  subEventNGX$: Subscription | undefined;
  subscriptionList = new Subscription();
  title = 'Web Sockets';
  message: string;
  messages: any[];

  roomId: string;
  messageText: string;
  messageArray: Message[] = [];
  phone: string;
  currentUser: any;
  selectedUser: any;
  showScreen: boolean;
  userList: User[] = [
    {
      id: 1,
      name: 'Zbigniew',
      phone: '111',
      image: 'assets/images/user-1.png',
      roomId: {2: 'room-1', 3: 'room-2', 4: 'room-3'}
    },
    {
      id: 2,
      name: 'Ryszard',
      phone: '222',
      image: 'assets/images/user-2.png',
      roomId: {1: 'room-1', 3: 'room-4', 4: 'room-5'}
    },
    {
      id: 3,
      name: 'Marian',
      phone: '333',
      image: 'assets/images/user-3.png',
      roomId: {1: 'room-2', 2: 'room-4', 4: 'room-6'}
    },
    {
      id: 4,
      name: 'Zdzislaw',
      phone: '444',
      image: 'assets/images/user-4.png',
      roomId: {1: 'room-3', 2: 'room-5', 3: 'room-6'}
    }
  ];

  constructor(public dialog: MatDialog,
              private _webSocketService: WebSocketService,
              private _chatService: ChatService) {
  }

  ngOnInit() {
    this._chatService.getMessage().subscribe(
      (response: Message) => {
        // this.messageArray.push(response);
      }
    );
  }

  ngAfterViewInit() {
    this.openDialog();
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find(user => user.phone === phone);
    this.roomId = this.selectedUser?.roomId[this.selectedUser.id];
    this.messageArray = [];

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this._chatService.joinRoom({user: username, roomId: roomId});
  }

  sendMessage(): void {
    this._chatService.sendMessage(
      {
        data: this.currentUser.name,
        room: this.roomId,
        message: this.messageText
      }
    );

    this.messageText = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.login(result.phone);
    });
  }

  login(phone: string) {
    this.currentUser = this.userList.find(user => user.phone === phone.toString());
    this.userList = this.userList.filter((user) => user.phone !== phone.toString());
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
