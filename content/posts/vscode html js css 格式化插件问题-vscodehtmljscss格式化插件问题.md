+++
title = "vscode html js css 格式化插件问题"
date = "2021-04-15 13:51:53"
updated = "2021-05-14 22:04:12"
slug = "80d7f7e6"
aliases = ["/2021/04_15_80d7f7e6.html"]
description = "记录VSCode格式化插件破坏HTML的问题：id等属性值含空格时被插件改坏，解决办法是弃用插件或把双引号改成单引号。"
[taxonomies]
tags = ["字符串"]
[extra]
category = "JavaScript"
categories = ["JavaScript"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125432-warteergirls.png"
+++
﻿id  里加了空格。

其它地方 的也是。

要么不要插件。==要么加单引号。而不是双引号==