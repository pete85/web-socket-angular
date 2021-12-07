import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _socket: Socket) { }

  sendMessage(msg: string) {
    this._socket.emit('message', msg);
  }

  getMessage() {
    return this._socket.fromEvent('message').pipe(map((data: any) => data.msg));
  }
}
