# 标签管理

## Interface

```base
$ ng g interface interface/repo-tags
```

## 增删标签

这里我们要为每一个 item 添加一个增删标签的组件，在命令后输入以下命令(注意: 这里使用 `--path` 参数指的了组件路径):

```base
$ ng g ng-zorro-antd:tag-control -p app --styleext='less' --name=item-tags --path=src/app/components
```

本章我们会完成标签的增删查功能，因为 GitHub 没有自定义标签的功能，所以我需要编写一个服务储存与用户相关联的标签。

## 使用 localStorage

这里我们使用 [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 在本地存取用户标签。

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

## 添加标签

### 使用可编辑标签组件

TODO 为列表 item 添加一个带添加移除的标签组件

### 修改储存数据结构

TODO 使用标签作为 key, 对应的 repo 数组作为 value

### 显示标签

TODO 在左侧显示当前用户标签

## 移除标签

TODO 在列表 item 上移除标签，当标签对应 repo length 为 0 时移除次标签

## 通过标签筛选

TODO 是通过管道吗？还是缓存完整列表通过服务完成？
