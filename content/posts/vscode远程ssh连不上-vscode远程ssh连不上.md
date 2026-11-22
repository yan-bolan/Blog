+++
title = "vscode远程ssh连不上"
date = "2020-06-18 12:47:44"
updated = "2021-05-14 22:04:15"
slug = "f5df4f5b"
aliases = ["/2020/06_18_f5df4f5b.html"]
description = "记录VSCode远程SSH连不上的一个原因：私钥须放在用户主目录的.ssh下，且文件名不能含下划线。"
[taxonomies]
tags = ["ssh,vscode ssh问题"]
[extra]
category = "Linux"
categories = ["Linux"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/三ノ·輪 銀.png"
+++
﻿### 原因之一
要在用户主目录下的.ssh/下 而且文件名==不能是有下划线==！