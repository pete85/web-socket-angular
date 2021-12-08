import {Injectable} from '@angular/core';
// import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';
import {Message} from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url = 'http://localhost:3000'; // server path

  // constructor(private _socket: Socket) { }

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<Message>(
      observer => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });

        return () => {
          this.socket.disconnect();
        }
      }
    )
  }



  // sendMessage(msg: string) {
  //   this._socket.emit('message', msg);
  // }
  //
  // getMessage(message: string) {
  //   return this._socket.fromEvent(message).pipe(map((data: any) => data.msg));
  // }
}
