+++
title = "git合并commit"
date = "2023-07-27 21:30:18"
slug = "af721f80"
aliases = ["/2023/07_27_af721f80.html"]
description = "用 git rebase 变基重放提交整合分叉历史或 squash 合并重复 commit，已推到仓库外、他人可能基于其开发的提交切勿变基。"
[taxonomies]
tags = ["git"]
[extra]
cover = "https://picsum.photos/400"
+++
Figure 36. 通过合并操作来整合分叉的历史

其实，还有一种方法：你可以提取在 `C4` 中引入的补丁和修改，然后在 `C3` 的基础上应用一次。 在 Git 中，这种操作就叫做 **变基（rebase）**。 你可以使用 `rebase` 命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。

[Git - 变基 (git-scm.com)](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)



教程是不同的分支;

对于同一分支也是可以的 ：多人开发，不建议; 尽量在本地合并再push; 即远程仓库不可变





### 变基的风险

呃，奇妙的变基也并非完美无缺，要用它得遵守一条准则：

**如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基。**







[一文搞懂 git rebase - 掘金 (juejin.cn)](https://juejin.cn/post/7038093620628422669)



### 场景三

1. - 你开发的一个需求产品反复更改,导致你的commit记录多次重复功能点

2. - 在日常开发中,难免有重复的commit提交记录.这时候我们想优化一下提交记录该如何做呢
- 当前分支状态节点如下图所示:







[git - How to perform rebase (squash) using tortoisegit - Stack Overflow](https://stackoverflow.com/questions/12528854/how-to-perform-rebase-squash-using-tortoisegit)
