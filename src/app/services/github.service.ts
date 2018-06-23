import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import * as parse from 'parse-link-header';

import { AuthService } from './auth.service';

import { from, of } from 'rxjs';
import { concatAll, mergeMap, reduce } from 'rxjs/operators';
import { GithubRepo, GithubUser } from '../interfaces/github';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  API_URL = 'https://api.github.com';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUserInfo(username) {
    return this.http.get<GithubUser>(`${this.API_URL}/users/${username}`);
  }

  getStarred(index: number = 1) {
    return this.http.get<GithubRepo[]>(
      `${this.API_URL}/users/${this.authService.username}/starred?per_page=100&page=${index}`,
      { observe: 'response' }
    ).pipe(
      mergeMap((res: HttpResponse<GithubRepo[]>) => {
        const link = parse(res.headers.get('Link'));
        if (index === 1 && link && link.next && link.last) {
          const page = parseInt(link.last.page, 10);
          const observables = [];
          for (let i = 1; i < page; i++) {
            observables.push(this.getStarred(i + 1));
          }
          return from([of(res.body), ...observables]).pipe(concatAll());
        } else {
          return from(of(res.body));
        }
      }),
      reduce((total: GithubRepo[], current: GithubRepo[]): GithubRepo[] => [...total, ...current])
    );
  }
}
