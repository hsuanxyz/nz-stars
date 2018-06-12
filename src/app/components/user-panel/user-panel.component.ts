import { Component, OnInit } from '@angular/core';
import { GithubService } from "../../services/github.service";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.less']
})
export class UserPanelComponent implements OnInit {

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.githubService.registerUsername('hsuanxyz');
    this.githubService.getUserInfo()
    .subscribe(user => {
      console.log(user)
    })
  }

}
