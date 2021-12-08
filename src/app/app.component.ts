import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebSocketService} from './services/web-socket/web-socket.service';
import {ChatService} from './services/chat-service/chat.service';
import {Subscription} from 'rxjs';

export class Message {
  user?: string;
  message?: string;
}

export class User {
  id: number;
  name: string;
  phone?: string;
  image?: string;
  roomId?: any;
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
export class AppComponent implements OnInit, OnDestroy {

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
  currentUser: User;
  selectedUser: any;
  userList: User[] = [
    {id: 1, name: 'Zbigniew', phone: '534768234', image: '', roomId: {2: 'room-1', 3: 'room-2', 4: 'room-3'}},
    {id: 2, name: 'Ryszard', phone: '598345676', image: '', roomId: {1: 'room-1', 3: 'room-4', 4: 'room-5'}},
    {id: 3, name: 'Marian', phone: '565992334', image: '', roomId: {1: 'room-2', 2: 'room-4', 4: 'room-6'}},
    {id: 4, name: 'Zdzislaw', phone: '509345666', image: '', roomId: {1: 'room-3', 2: 'room-5', 3: 'room-6'}}
  ];

  constructor(private _webSocketService: WebSocketService, private _chatService: ChatService) {
    this._chatService.getMessage().subscribe(
      (response: Message) => {
        this.messageArray.push(response);
      }
    );
  }

  ngOnInit() {
    // this.listenToEvent('test event');
    // this.listenToEventNGX('test event NGX');
    this.currentUser = this.userList[0];
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


  // listenToEventNGX(eventExample: string) {
  //   this.subEventNGX$ = this._chatService.getMessage(eventExample).subscribe(
  //     response => {
  //       console.log('Response NGX: ', response);
  //     },
  //     error => {},
  //     () => {
  //       this.subscriptionList.add(this.subEventNGX$);
  //     }
  //   );
  // }

  // listenToEvent(eventExample: string) {
  //   this.subEvent$ = this._webSocketService.listen(eventExample).subscribe(
  //     response => {
  //       console.log('Response: ', response);
  //     },
  //     error => {},
  //     () => {
  //       this.subscriptionList.add(this.subEvent$);
  //     }
  //   );
  // }

  // sendEvent(message: string) {
  //   this._chatService.sendMessage(message);
  // }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
