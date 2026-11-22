+++
title = "hugo wercker"
date = "2020-06-18 21:22:10"
updated = "2021-05-14 22:01:30"
slug = "aa1d213f"
aliases = ["/2020/06_18_aa1d213f.html"]
description = "Wercker 持续集成构建 Hugo 的踩坑：hugo-build 版本号去引号、主题托管到 GitHub、git token 配在环境变量。"
[taxonomies]
tags = ["hugo,themes"]
[extra]
category = "网络"
categories = ["网络"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/東郷·美森.png"
+++
﻿### /hugo-build  No directory found
```yml
box: debian
build:
  steps:
    - arjen/hugo-build:
        version: "0.17"
        theme: herring-cove
        flags: --buildDrafts=true
        ```
        2020
版本去掉引号。
### 主题not found
Error: module "tokiwa" not found;

主题也可加到github上

### 看官方文档 
[https://devcenter.wercker.com/administration/environment-variables/creating-env-vars/](https://devcenter.wercker.com/administration/environment-variables/creating-env-vars/)

### yml 格式不要写错
$git——token 是在wercker 设置 环境那里k-v值