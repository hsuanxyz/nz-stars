import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../interfaces/github';

@Pipe({
  name: 'repoSearch'
})
export class RepoSearchPipe implements PipeTransform {

  transform(repos: Array<GithubRepo & { tags: string[] }>, term: string): Array<GithubRepo & { tags: string[] }> {
    if (term) {
      const regex = new RegExp(term, 'ig');
      return repos.filter(repo => `${repo.full_name}${repo.description || ''}`.search(regex) !== -1);
    } else {
      return repos;
    }
  }

}
