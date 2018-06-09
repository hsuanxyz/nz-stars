# NG ZORRO ANTD - Github Stars(教程)

## 开始之前

这是一篇介绍 NG-ZORRO 的入门教程，我们会一步一步的带你完成下面的应用。

TODO 最终应用截图


在开始本教程之前，我们需要你具备以下的基础知识：

- 包管理工具 `npm` 或者 `yarn` 的安装及使用方式。
- HTML、CSS 和 JavaScript 的中级知识。
- TypeScript 与 Angular 入门。

## 0 - 初始化项目

首先我们需要安装 [Angular CLI](https://cli.angular.io/) 它使我们不再需要配置繁琐的开发环境。构建、调试、代理、打包部署等一些列操作...

```base
npm install -g @angular/cli
```

新建一个名为 `nz-stars` Angular 项目设置样式扩展名为 `less`，并且生成路由模块。

```base
ng new nz-stars --style=less --routing
```

切换到 nz-stars 目录使用 `ng add `添加 NG-ZORRO。此命令会自动的为你初始化 NG-ZORRO。

```base
cd nz-stars
ng add ng-zorro-antd
```

运行项目, 在浏览器打开 http://localhost:4200

```base
ng serve -o # open your browser on http://localhost:4200/
```

当你在浏览器中看见下面的页面就说明我们可以继续下一步了

TODO 引导页截图

## 1 - 布局


这里我们会用 `ng generate` 命令，来快速生成组件。NG-ZORRO 现在有 **300+** 预设模板，你可以在[官网](https://ng.ant.design)中的任何一个组件DEMO中找到对于的命令拷贝按钮。

在命令行中输入下面的命令。

```base
ng g ng-zorro-antd:layout-fixed-sider -p app --styleext='less' --name=layout
```

**发生了什么**？我们使用 NG-ZORRO 提供的 `layout-fixed-sider` 模板生成一个叫做 `layout` 的侧边栏固定布局组件。并且为你声明在了 `app.module.ts` 中。

然后我们修改我们的 `app.component.html` 代码，替换成我们生成的 `layout` 组件。

***app.component.html***

```html
<app-layout></app-layout>
```

现在你的应用应该像下面这样。没错在 cli 的帮助下，我们的开发工作变得越来越轻松

![1-layout](screenshots/1-layout.png)


## 2 - 添加组件

不管使用声明框架，我们都绕不开组件。特别在入门阶段很多同学对组件的认知都停留在 **复用性** 上，认为只有需要复用的功能才会分离成组件，其实不然。我认为在组件规划上 [关注点分离](https://zh.wikipedia.org/wiki/%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB) 应该我们首要考虑的目标。一个复杂的页面上通常包含多个业务逻辑。我们应该根据逻辑的复杂度和业务的关联性来进行组件拆分。这样我们在开发和今后维护时，只需要关注一小部分，而不至于担心其他逻辑。下面我们根据这个原则将来创建项目的组件：

- 用户面板
- 标签管理
- 搜索框
- 项目列表

### 2-0 打扫新房

让我们清理 `layout` 组件，为接下来的组件腾出位置。

**layout.component.html**

```html
<nz-layout class="layout">
  <nz-sider [nzWidth]="350" class="side">
    <div class="user-pane-wrap">
      <!--TODO 用户面板-->
    </div>
    <div class="tags-wrap">
      <!--TODO 标签管理-->
    </div>
  </nz-sider>
  <nz-layout class="content">
    <nz-header class="header">
      <div class="search-bar-wrap">
        <!--TODO 搜索框-->
      </div>
    </nz-header>
    <nz-content class="main">
      <div class="item-list-wrap">
        <!--TODO 项目列表-->
      </div>
    </nz-content>
    <nz-footer class="footer">
      Github Stars Manager Implement By <a href="https://ng.ant.design/">NG-ZORRO</a>
    </nz-footer>
  </nz-layout>
</nz-layout>

```

**layout.component.less**

```less
<nz-layout class="layout">
  <nz-sider [nzWidth]="350" class="side">
    <div class="user-pane-wrap">
      <!--TODO 用户面板-->
    </div>
    <div class="tags-wrap">
      <!--TODO 标签管理-->
    </div>
  </nz-sider>
  <nz-layout class="content">
    <nz-header class="header">
      <div class="search-bar-wrap">
        <!--TODO 搜索框-->
      </div>
    </nz-header>
    <nz-content class="main">
      <div class="item-list-wrap">
        <!--TODO 项目列表-->
      </div>
    </nz-content>
    <nz-footer class="footer">
      Github Stars Manager Implement By <a href="https://ng.ant.design/">NG-ZORRO</a>
    </nz-footer>
  </nz-layout>
</nz-layout>
```
