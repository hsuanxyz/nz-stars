import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  API_URL = 'https://api.github.com';
  username: string;

  constructor(private http: HttpClient) { }

  registerUsername(username: string) {
    this.username = username;
  }

  getUserInfo() {
    return this.http.get(`${this.API_URL}/users/${this.username}`);
  }

  getStarred() {
    return this.http.get(`${this.API_URL}/users/${this.username}/starred`);
  }
}
