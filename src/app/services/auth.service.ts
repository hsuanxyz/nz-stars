import { Injectable } from '@angular/core';
import { AppStorageService } from './app-storage.service';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string;
  addUser = new Subject<string>();

  constructor(private appStorageService: AppStorageService) { }

  /** 注册用户 */
  registerUsername(username: string) {
    this.username = username;
    this.appStorageService.setUsername(username);
    this.addUser.next(username);
  }

  /** 在首次进入 app 调用，恢复到之前的用户 */
  recovery() {
    this.registerUsername(this.appStorageService.getUsername());
  }
}
