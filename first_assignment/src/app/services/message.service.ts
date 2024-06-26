import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messages:string[] = [];
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
