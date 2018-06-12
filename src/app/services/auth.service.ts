import { Injectable } from '@angular/core';
import { AppStorageService } from './app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string;

  constructor(private appStorageService: AppStorageService) { }

  /** 注册用户 */
  registerUsername(username: string) {
    this.username = username;
    this.appStorageService.setUsername(username);
  }

  /** 在首次进入 app 调用，恢复到之前的用户 */
  recovery() {
    this.registerUsername(this.appStorageService.getUsername());
  }
}
