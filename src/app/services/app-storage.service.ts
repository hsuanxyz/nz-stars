import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  PREFIX = 'app';

  constructor(private authService: AuthService) { }

  setUsername(username: string) {
    localStorage.setItem(`${this.PREFIX}-username`, username);
  }

  getUsername(): string | null {
    return JSON.stringify(localStorage.getItem(`${this.PREFIX}-username`));
  }

  setLabels(labels: string[]) {
    const username = this.authService.username;
    localStorage.setItem(`${this.PREFIX}-${username}/labels`, JSON.stringify(labels));
  }

  getLabels(): string[] | null {
    const username = this.authService.username;
    return JSON.parse(localStorage.getItem(`${this.PREFIX}-${username}/labels`));
  }
}
