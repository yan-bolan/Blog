+++
title = "linux 端口占用lsof 网卡"
date = "2020-05-16 18:20:43"
updated = "2021-05-14 22:02:43"
slug = "a68d8b9f"
aliases = ["/2020/05_16_a68d8b9f.html"]
description = "用 lsof -i:端口号 查端口占用；VM 装 Docker 后 SSH 误连 Docker 网卡，删除 VM 网络适配器再重新添加即可恢复。"
[taxonomies]
tags = ["vm docker,网卡,端口占用"]
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125432-warteergirls.png"
+++
﻿lsof -i:端口号
list open file
神奇的方法

vm 虚拟机安装docker 后，vm ssh 连上了docker 的网卡。
方法：删除vm的网络适配器网卡，再新添加就可以了