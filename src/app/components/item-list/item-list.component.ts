import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GithubService } from '../../services/github.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnDestroy {
  data = [];

  addUserSubscription: Subscription;

  constructor(private authService: AuthService, private githubService: GithubService) {
    this.addUserSubscription = this.authService.addUser.subscribe(() => this.getStarredRepo());
  }

  getStarredRepo() {
    this.githubService.getStarred()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
    })
  }

  ngOnDestroy(): void {
    if (this.addUserSubscription) {
      this.addUserSubscription.unsubscribe()
    }
  }
}
