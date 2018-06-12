import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string;
  addUser = new Subject<string>();

  constructor() { }

  registerUsername(username: string) {
    this.username = username;
    this.addUser.next(username);
  }

}
