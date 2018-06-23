import { Injectable } from '@angular/core';

import localForage from "localforage";

import { AuthService } from './auth.service';
import { RepoTags } from "../interfaces/repo-tags";

import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tagsCache: {
    tags: RepoTags,
    username: string
  };

  tagChange = new Subject<RepoTags>();

  get hasCache(): boolean {
    return this.tagsCache && this.tagsCache.username === this.authService.username
  }

  constructor(private authService: AuthService) {
  }


  getTags(): Promise<RepoTags> {
    const username = this.authService.username;

    // 如果有缓存则使用缓存
    if (this.hasCache) {
      return Promise.resolve(this.tagsCache.tags);
    }

    return localForage.getItem(`{${username}/tags`)
    .then((tags: RepoTags) => {
      this.tagsCache = {
        tags,
        username
      };
      return Promise.resolve(tags);
    })
  }

  addTag(tag: string, repoId: number) {
    const username = this.authService.username;
    return this.getTags().then(tags => {
      const newTags: RepoTags = tags ? tags : { repos: {}, tags: [] };
      const tagIndex = newTags.tags.findIndex(item => item.name === tag);

      if (newTags.repos[repoId]) {
        newTags.repos[repoId].push(tag);
      } else {
        newTags.repos[repoId] = [tag];
      }

      if (tagIndex !== -1) {
        newTags.tags[tagIndex].repos.push(repoId);
        newTags.tags[tagIndex].count++;
      } else {
        newTags.tags.push({
          name: tag,
          repos: [repoId],
          count: 1
        })
      }
      this.tagsCache = {
        tags: newTags,
        username
      };
      this.tagChange.next(newTags);
      return localForage.setItem(`{${username}/tags`, newTags);
    })
  }

  removeTag(tag: string, repoId: number) {
    const username = this.authService.username;
    return this.getTags().then(tags => {
      const newTags: RepoTags = tags ? tags : { repos: {}, tags: [] };
      const tagIndex = newTags.tags.findIndex(item => item.name === tag);

      if (newTags.repos[repoId]) {
        const tagIndexInRepo = newTags.repos[repoId].indexOf(tag);
        newTags.repos[repoId].splice(tagIndexInRepo, tagIndexInRepo !== -1 ? 1 : 0);
      } else {
        newTags.repos[repoId] = [];
      }

      if (tagIndex !== -1) {
        const repoIndexInTag = newTags.tags[tagIndex].repos.indexOf(repoId);
        const count = newTags.tags[tagIndex].count;
        newTags.tags[tagIndex].repos.splice(repoIndexInTag, repoIndexInTag !== -1 ? 1 : 0);
        newTags.tags[tagIndex].count = repoIndexInTag !== -1 ? count - 1 : count;
      } else {
        newTags.tags.push({
          name: tag,
          repos: [],
          count: 0
        })
      }
      this.tagsCache = {
        tags: newTags,
        username
      };
      this.tagChange.next(newTags);
      return localForage.setItem(`{${username}/tags`, newTags);
    })
  }

}
