import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  prefix = 'ng-stars';

  constructor(private authService: AuthService) { }

  setLabels(labels: string[]) {
    const username = this.authService.username;
    localStorage.setItem(`${this.prefix}-${username}/labels`, JSON.stringify(labels));
  }

  getLabels(): string[] | null {
    const username = this.authService.username;
    return JSON.parse(localStorage.getItem(`${this.prefix}-${username}/labels`));
  }
}
