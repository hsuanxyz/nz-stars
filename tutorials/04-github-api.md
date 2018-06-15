# 使用 GitHub API

## 添加服务

为了保持组件逻辑的清晰，我们将与视图无关的逻辑写在服务里面。比如共享的数据、API请求、数据的预处理等。

在我们添加服务之前，我们需要先对现在的目录结构进行调整。把服务与组件放在不同的文件夹中方便维护。在 `src/app` 下新建两个分别名为 `services` `components` 的文件夹。

然后将之前的组件全部移动到 `components` 内 (如果你使用的 IDE 没有重构功能，你还需要修改 `app.module.ts` 中的组件路径)。之后我们 `src` 的目录结构应该像下面这样：

```base
src
├── components
│   ├── item-list
│   ├── labels-filter
│   ├── layout
│   ├── search-bar
│   └── user-panel
├── services
├── app-routing.module.ts
├── app.component.html
├── app.component.less
├── app.component.spec.ts
├── app.component.ts
└── app.module.ts
```

下面我们就向 `services` 文件夹中添加我们所需的服务。

## 调用 GitHub API

除了我们定义的标签之外，其他数据都来源于 Github，我们现在新建一个服务用于处理它的请求。在控制台输入：

```base
ng g s services/github
```

Angualr CLI 会在 `services` 下创建一个 `github.service.ts` 文件。值得注意的是在 Angualr6 中，你不需要在模块中的 `providers` 字段中声明服务。相反，现在是在服务中的 `Injectable` 声明模块。默认会声明 `root` 模块，也就是说你在应用的任何地方都可以使用它。

为了处理 `http` 请求，我们需要将 `HttpClient` 类注入到 `GithubService` 中，就像下面这样：

**github.service.ts**

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }
}
```

接下来前往 [https://developer.github.com/v3](https://developer.github.com/v3/?) 查看需要使用的API。我们主要会用到下面的 REST API:

- GET - [users/:username](https://developer.github.com/v3/users/#get-a-single-user) 获取用户信息
- GET - [users/:username/starred](https://developer.github.com/v3/activity/starring/#list-repositories-being-starred) 获取用户收藏的仓库

之后添加 `getUserInfo` 与 `getStarred` 两个请求方法。

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  API_URL = 'https://api.github.com';
  
  constructor(private http: HttpClient) { }

  getUserInfo(username) {
      return this.http.get(`${this.API_URL}/users/${username}`);
    }
  
  getStarred(username) {
    return this.http.get(`${this.API_URL}/users/${username}/starred`);
  }
}
```

## 绑定用户

现在我们修改 `UserPanelComponent` 组件，为他添加输入用户名以及显示用户信息的功能。

这里我们需要用到 NG-ZORRO 的 `nz-modal` 组件创建一个弹出框供用户输入用户名，之后再调用 `GithubService` 服务从线上获取用户信息。

**user-panel.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

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

  constructor(private githubService: GithubService) {
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
      } else {
        this.user = null;
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }
}
```

**user-panel.component.html**

```html
<nz-avatar nzIcon="anticon anticon-user" [nzSrc]="user?.avatar_url"></nz-avatar>
<div class="username">{{user?.login}}</div>
<div class="add-user">
  <a (click)="openModal()">{{user ? '切换' : '添加用户'}}</a>
</div>
<nz-modal [(nzVisible)]="isVisible" nzTitle="绑定用户" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()" [nzOkLoading]="isLoading">
  <input type="text" nz-input placeholder="输入你的 GitHub 用户名" [(ngModel)]="username">
</nz-modal>
```

效果如下图

![bind-user](./screenshots/bind-user.gif)

## 跨组件通信

现在我们面临一个问题。我们如何在 `UserPanelComponent` 组件添加用户之后，通知其它组件作出响应呢？如果仅仅是一个控制某些值的组件我们可以通过 `@Output` 向外发出事件。但是这里的 `user` 关系到整个应用的状态。

所以我们可以在这种情况下使用 RxJs 的 `Subject` 来将值发送给它的订阅者。

首先我们添加 Authentication 服务，这里只是象征意义的使用它。在真实的应用中，这个服务大多用于储存当前用户信息、管理用户权限、管理 token 的问题。

在控制台输入以下命令生成 `AuthService`:

```base
ng g s services/auth
```

并且添加如下内容:

**auth.service.ts**

```ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string;
  addUser = new Subject<string>();

  constructor() { }

  registerUsername(username: string) {
    this.username = username;
    this.addUser.next(username);
  }

}
```
