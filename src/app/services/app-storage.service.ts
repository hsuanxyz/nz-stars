import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  PREFIX = 'app';

  constructor() { }

  setUsername(username: string) {
    localStorage.setItem(`${this.PREFIX}-username`, username);
  }

  getUsername(): string | null {
    return JSON.stringify(localStorage.getItem(`${this.PREFIX}-username`));
  }

  setLabels(labels: string[], username: string) {
    localStorage.setItem(`${this.PREFIX}-${username}/labels`, JSON.stringify(labels));
  }

  getLabels(username: string): string[] | null {
    return JSON.parse(localStorage.getItem(`${this.PREFIX}-${username}/labels`));
  }
}
