+++
title = "vscode ssh 密钥登录"
date = "2020-05-15 23:26:29"
updated = "2021-05-14 22:04:15"
slug = "96cea11e"
aliases = ["/2020/05_15_96cea11e.html"]
description = "记录VSCode Remote SSH密钥登录总走密码的问题：在ssh配置中用IdentityFile指定私钥，且私钥须放在用户主目录下才生效。"
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125559-9e794859e7f25a110df951d0b55e4815.png"
[taxonomies]
tags = ["vscode", "ssh", "密钥"]
+++
﻿我的总是密码登录。
```powershell
  IdentityFile ~/.ssh/rsahuowei
```
配置文件中指定 
不知道为什么，只在在用户目录下，就是工作目录，应该是当前用用户目录。我c 的user username 
其它路径好像不行，好像要什么环境变量配置。我去。