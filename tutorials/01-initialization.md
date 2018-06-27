# 初始化项目

首先我们需要安装 [Angular CLI](https://cli.angular.io/) 它使我们不再需要配置繁琐的开发环境。构建、调试、代理、打包部署等一些列操作...

```base
npm install -g @angular/cli
```

新建一个名为 `nz-stars` Angular 项目设置样式扩展名为 `less`。

```base
ng new nz-stars --style=less
```

切换到 nz-stars 目录使用 `ng add `添加 NG-ZORRO。此命令会自动的为你初始化 NG-ZORRO。

```base
cd nz-stars
ng add ng-zorro-antd
```

添加完成后在命令后运行以下命令, CLI 会自动编译并在浏览器打开 http://localhost:4200

```base
ng serve -o
```

当你在浏览器中看见下面的页面就说明我们成功的创建了一个 NG-ZORRO 项目。

![boot](./screenshots/0-boot.png)


