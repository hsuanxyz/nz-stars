import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Tag } from '../../interfaces/repo-tags'
import { AuthService } from '../../services/auth.service';
import { GithubService } from '../../services/github.service';
import { Subscription } from 'rxjs';
import { GithubRepo } from '../../interfaces/github';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'],
})
export class ItemListComponent implements OnDestroy {
  data: Array<GithubRepo & { tags: string[] }> = [];
  loading = false;
  addUserSubscription: Subscription;

  @Input() search: string;
  @Input() selectedTags: Tag[];

  constructor(private authService: AuthService, private githubService: GithubService, private tagsService: TagsService) {
    this.addUserSubscription = this.authService.addUser.subscribe(() => this.getStarredRepo());
  }

  getStarredRepo() {
    this.loading = true;
    this.tagsService.getTags()
    .then(tags => {
      this.githubService.getStarred()
      .subscribe(res => {
        this.data = res.map(repo => {
          return {
            ...repo,
            tags: tags.repos[repo.id] || []
          };
        });
        this.loading = false;
      });
    });
  }

  trackByFn(index, item) {
    return item.id || index;
  }

  ngOnDestroy(): void {
    if (this.addUserSubscription) {
      this.addUserSubscription.unsubscribe();
    }
  }
}
