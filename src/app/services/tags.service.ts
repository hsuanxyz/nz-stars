import { Injectable } from '@angular/core';

import * as localForage from 'localforage';

import { AuthService } from './auth.service';
import { RepoTags } from '../interfaces/repo-tags';

import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tagsCache: {
    repoTags: RepoTags,
    username: string
  };

  tagChange = new Subject<RepoTags>();

  get hasCache(): boolean {
    return this.tagsCache && this.tagsCache.username === this.authService.username;
  }

  constructor(private authService: AuthService) {
  }


  getTags(): Promise<RepoTags> {
    const username = this.authService.username;

    // 如果有缓存则使用缓存
    if (this.hasCache) {
      return Promise.resolve(this.tagsCache.repoTags);
    }

    return localForage.getItem(`${username}/tags`)
    .then((repoTags: RepoTags) => {
      this.tagsCache = {
        repoTags: repoTags ? repoTags : { repos: {}, tags: [] },
        username
      };
      return Promise.resolve(this.tagsCache.repoTags);
    });
  }

  addTag(tag: string, repoId: number) {
    const username = this.authService.username;
    return this.getTags().then(repoTags => {
      const newRepoTags: RepoTags = repoTags ? repoTags : { repos: {}, tags: [] };
      const tagIndex = newRepoTags.tags.findIndex(item => item.name === tag);

      if (newRepoTags.repos[repoId]) {
        newRepoTags.repos[repoId].push(tag);
      } else {
        newRepoTags.repos[repoId] = [tag];
      }

      if (tagIndex !== -1) {
        newRepoTags.tags[tagIndex].repos.push(repoId);
        newRepoTags.tags[tagIndex].count = newRepoTags.tags[tagIndex].repos.length;
      } else {
        newRepoTags.tags.push({
          name: tag,
          repos: [repoId],
          count: 1
        });
      }
      this.tagsCache = {
        repoTags: newRepoTags,
        username
      };
      this.tagChange.next(newRepoTags);
      return localForage.setItem(`${username}/tags`, newRepoTags);
    });
  }

  removeTag(tag: string, repoId: number) {
    const username = this.authService.username;
    return this.getTags().then(repoTags => {
      const newRepoTags: RepoTags = repoTags ? repoTags : { repos: {}, tags: [] };
      const tagIndex = newRepoTags.tags.findIndex(item => item.name === tag);

      if (newRepoTags.repos[repoId]) {
        const tagIndexInRepo = newRepoTags.repos[repoId].indexOf(tag);
        newRepoTags.repos[repoId].splice(tagIndexInRepo, tagIndexInRepo !== -1 ? 1 : 0);
      } else {
        newRepoTags.repos[repoId] = [];
      }

      if (tagIndex !== -1) {
        const repoIndexInTag = newRepoTags.tags[tagIndex].repos.indexOf(repoId);

        if (repoIndexInTag !== -1) {
          newRepoTags.tags[tagIndex].repos.splice(repoIndexInTag, 1);
          newRepoTags.tags[tagIndex].count = newRepoTags.tags[tagIndex].repos.length;
        }

        if (repoIndexInTag !== -1 && newRepoTags.tags[tagIndex].count === 0) {
          newRepoTags.tags.splice(tagIndex, 1);
        }
      }

      this.tagsCache = {
        repoTags: newRepoTags,
        username
      };

      this.tagChange.next(newRepoTags);
      return localForage.setItem(`${username}/tags`, newRepoTags);
    });
  }

}
