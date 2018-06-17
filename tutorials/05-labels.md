# 标签管理

本章我们会完成标签的增删查功能，因为 GitHub 没有自定义标签的功能，所以我需要编写一个服务并使用 [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 储存与用户相关联的标签。

在命令行输入以下命令创建一个 `LabelService` 服务:

```base
ng g s services/label
```

编辑 `LabelService`，添加一个 `prefix` 属性用于指定 `localStorage` key 的前缀，这是避免命名冲突的最佳实践；然后注入 `AuthService` 服务，用于获取当前用户名，以区分不同用户的标签。

**label.service.ts**

```ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  prefix = 'ng-stars';
  
  constructor(private authService: AuthService) { }
}
```

然后添加 `setLabels` 与 `getLabels` 方法，以用户名作为作用域存取标签。

**label.service.ts**

```ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  prefix = 'ng-stars';

  constructor(private authService: AuthService) { }

  setLabels(labels: string[]) {
    const username = this.authService.username;
    localStorage.setItem(`${this.prefix}-${username}/labels`, JSON.stringify(labels));
  }

  getLabels(): string[] | null {
    const username = this.authService.username;
    return JSON.parse(localStorage.getItem(`${this.prefix}-${username}/labels`));
  }
}
```
