import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';
import {Message} from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;
  private url = 'http://localhost:3000'; // server path

  constructor() {
    this.socket = io(this.url, { transports : ['websocket', 'polling', 'flashsocket'] });
  }

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    console.log('message: ', data);
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

  getStorage() {
    const storage: string | null = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }
}
