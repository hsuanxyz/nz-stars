import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  API_URL = 'https://api.github.com';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserInfo(username) {
    return this.http.get<any>(`${this.API_URL}/users/${username}`);
  }

  getStarred() {
    return this.http.get<any>(`${this.API_URL}/users/${this.authService.username}/starred`);
  }
}
