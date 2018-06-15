# 添加服务

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

从上面的 API 可以看到，我们的 `username` 在一个完整的应用流程里面是固定的，因此我们编写一个 `registerUsername` 方法来寄存用户名。添加一个储存 API 地址的常量。

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  API_URL = 'https://api.github.com';
  username: string;
  
  constructor(private http: HttpClient) { }

  registerUsername(username: string) {
    this.username = username;
  }
}
```

之后添加 `getUserInfo` 与 `getStarred` 两个请求方法。

```ts
getUserInfo() {
    return this.http.get(`${this.API_URL}/users/${this.username}`);
  }

getStarred() {
	return this.http.get(`${this.API_URL}/users/${this.username}/starred`);
}
```

现在你可以尝试在某个组件里注入 `GithubService` 服务，并调用里面的方法，查看数据返回。

## 持久化储存

我们不希望用户每次进入都需要重新输入用户名，同时我们还需要储存用户自定义的标签。所以我们需要编写一个服务来管理这些本地数据。

在控制台输入以下命令生成 `AppStorageService` 服务:

```base
ng g s services/app-storage
```

这里我们使用 [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 储存本地数据，并且给每个 `key` 添加一个前缀避免命名冲突。同时以用户名作为作用域储存用户标签。
为文件添加以下方法：

**app-storage.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  PREFIX = 'app';

  constructor() { }

  setUsername(username: string) {
    localStorage.setItem(`${this.PREFIX}-username`, username);
  }

  getUsername(): string | null {
    return JSON.stringify(localStorage.getItem(`${this.PREFIX}-username`));
  }

  setLabels(labels: string[], username: string) {
    localStorage.setItem(`${this.PREFIX}-${username}/labels`, JSON.stringify(labels));
  }

  getLabels(username: string): string[] | null {
    return JSON.parse(localStorage.getItem(`${this.PREFIX}-${username}/labels`));
  }
}
```

有的同学可能会发现这个服务里面的多个方法依赖了 `username`, 但是如同上面说的，在我们的应用里面用户名是相对固定的。难道我们给这个服务也添加一个 `registerUsername` 方法保存用户名吗？有没有什么更好的办法呢？

## Authentication 认证

接着上小结提出的问题，我们添加 Authentication 服务来解决这个问题。在真实的应用中，这个服务大多用于储存当前用户信息、管理用户权限、管理 token 的问题。也就说用在咱们这个不需要管理权限的应用里面是不合适的，但是为了更贴近真实环境，我们还是打算这么做。

在控制台输入以下命令生成 `AuthService`:

```base
ng g s services/auth
```

并且添加如下内容:

**auth.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string;

  constructor() { }

  registerUsername(username: string) {
    this.username = username;
  }

}
```

现在我们修改其他文件内容，让 `AuthService` 管理整个应用的用户信息。

**github.service.ts**

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  API_URL = 'https://api.github.com';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserInfo() {
    return this.http.get(`${this.API_URL}/users/${this.authService.username}`);
  }

  getStarred() {
    return this.http.get(`${this.API_URL}/users/${this.authService.username}/starred`);
  }
}
```

**app-storage.service.ts**

```ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  PREFIX = 'app';

  constructor(private authService: AuthService) { }

  setUsername(username: string) {
    localStorage.setItem(`${this.PREFIX}-username`, username);
  }

  getUsername(): string | null {
    return JSON.stringify(localStorage.getItem(`${this.PREFIX}-username`));
  }

  setLabels(labels: string[]) {
    const username = this.authService.username;
    localStorage.setItem(`${this.PREFIX}-${username}/labels`, JSON.stringify(labels));
  }

  getLabels(): string[] | null {
    const username = this.authService.username;
    return JSON.parse(localStorage.getItem(`${this.PREFIX}-${username}/labels`));
  }
}
```

之后在 `AppComponent` 中调用 `getUsername` 方法从历史保存中获取用户名。

**app.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AppStorageService } from "./services/app-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private appStorageService: AppStorageService) {
  }

  ngOnInit() {
    const username = this.appStorageService.getUsername();
    if (username) {
      this.authService.registerUsername(username);
    }
  }
}
```

## 使用服务实现跨组件通信

完成了上面的 `AuthService` 服务后，我们面临着一个问题。**如何知道用户在何时被添加呢？**

在实际的开发中我们经常遇到类似的问题，比如切换用户的时候，经常需要多个组件做出相应的处理。面对这样的问题，我们尝试各种解决办法，甚至动用 `setTimeout` `setInterval`。

在这种情况我们可以使用 RxJs 的 `Subject` 来将值发送给它的订阅者。

修改以下文件:

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
