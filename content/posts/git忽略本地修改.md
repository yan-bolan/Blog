+++
title = "git忽略本地修改"
date = "2024-02-23 20:34:15"
slug = "ee0ff368"
aliases = ["/2024/02_23_ee0ff368.html"]
[taxonomies]
tags = ["git", "协同"]
[extra]
cover = "https://picsum.photos/400"
+++
[Git 小技巧 - 忽略不想要提交的本地修改 | Mengqi's blog (mengqi92.github.io)](https://mengqi92.github.io/2020/07/17/hide-files-from-git/)



这里简单区分一下：

- .gitignore
  - **说明**：显式地阻止提交文件。
  - **优势**：.gitignore 文件本身提交至远程仓库，全组共享忽略文件配置。
  - **局限**：如果项目已经存在远程仓库，即使被加入 .gitignore，仍然可以进行修改并提交。本地的修改会显示在 `git status` 结果中。
- .git/info/exclude
  - **说明**：显式地阻止提交文件。
  - **优势**：exclude 文件本身不会提交至远程仓库，因此适合放一些个人定制的 「gitignore」 项目。
  - **局限**：和 .gitignore 存在同样地局限。文件若已存在远程仓库，则本地修改仍可以提交至远程仓库。本地的修改会显示在 `git status` 结果中。
- <mark>assume-unchanged</mark>
  - **说明**：声明本地远程都**不会修改**这个文件。
  - **优势**：git 直接跳过这些文件的处理以提升性能。文件不会出现在 `git status`。
  - **局限**：不适合本地或远程需要修改的文件。本地会忽略掉之后远程文件的修改。
- <mark>skip-worktree</mark>
  - **说明**：声明忽略文件的本地修改。
  - **优势**：本地可以对文件做一些个人定制。文件不会出现在 `git status`。
  - **局限**：拉取远程文件更新，或切换分支时有可能出现冲突，需要撤销忽略后手动解决冲突。

建议先分清楚再决定用哪种





## 忽略本地修改

在一个多人协作的 Git 仓库里，有些情况下远程仓库中可能会存放一些 IDE 或者 Build 工具的配置文件，以方便所有参与的同学获得一致的体验。当然这些文件会从大局出发，加入的通常都是比较通用的配置项，不一定能完全满足你个人的需求。一旦你自己对这些文件做了个人定制，它们就会被 Git 识别为本地修改，不但本地的 `git status` 或 `change list` 一直会进行恼人的提醒，而且每次 `git add` 文件时还要小心翼翼的避开。

那么，有没有方法告诉 Git 我们可以忽略这些文件的本地修改呢？答案是有的，你只需要下面这条命令：

```
git update-index --skip-worktree /path/to/file
```

执行这条命令后，Git 就会忽略本地对这个文件的所有修改。现在可以放心大胆地 `git add .`/`git add -u` 啦!

这条命令相比 `.gitignore` 的方式，省去了修改 `.gitignore` 文件，否则还要再想办法忽略本地对 `.gitignore` 的修改……

### [](https://mengqi92.github.io/2020/07/17/hide-files-from-git/#%E5%89%AF%E4%BD%9C%E7%94%A8 "副作用")副作用

这种方式也有一个副作用，那就是在拉取远程分支时，由于本地和远程文件存在不一致的更新，会导致冲突的问题。
