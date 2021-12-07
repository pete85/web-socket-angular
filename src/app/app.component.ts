import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebSocketService} from './services/web-socket/web-socket.service';
import {ChatService} from './services/chat-service/chat.service';
import {Subscription} from 'rxjs';

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

  constructor(private _webSocketService: WebSocketService, private _chatService: ChatService) {
  }

  ngOnInit() {
    this.listenToEvent('test event');
  }

  listenToEventNGX(eventExample: string) {
    // this.subEventNGX$
  }

  listenToEvent(eventExample: string) {
    this.subEvent$ = this._webSocketService.listen(eventExample).subscribe(
      response => {
        console.log('Response: ', response);
      },
      error => {},
      () => {
        this.subscriptionList.add(this.subEvent$);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
