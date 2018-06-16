import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector   : 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls  : [ './user-panel.component.less' ]
})
export class UserPanelComponent implements OnInit {

  isVisible = false;
  isLoading = false;
  user: any;
  username: string;

  constructor(private githubService: GithubService, private authService: AuthService) {
  }

  ngOnInit() {

  }

  openModal() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isLoading = true;
    this.githubService.getUserInfo(this.username)
    .subscribe(res => {
      if (res.id) {
        this.user = res;
        this.isVisible = false;
        this.authService.registerUsername(this.username);
      } else {
        this.user = null;
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }
}
