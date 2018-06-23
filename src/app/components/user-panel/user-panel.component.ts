import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { AuthService } from '../../services/auth.service';
import { GithubUser } from '../../interface/github';

@Component({
  selector   : 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls  : [ './user-panel.component.less' ]
})
export class UserPanelComponent implements OnInit {

  isVisible = false;
  isLoading = false;
  user: GithubUser;
  username: string;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(private githubService: GithubService, private authService: AuthService) {
  }

  ngOnInit() {

  }

  openModal() {
    this.isVisible = true;
    setTimeout(() => {
      this.userInput.nativeElement.focus();
      this.userInput.nativeElement.setSelectionRange(0, this.username ? this.username.length : 0);
    }, 100);
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
