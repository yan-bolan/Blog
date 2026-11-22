+++
title = "Nodejs win7下安装"
date = "2023-10-10 21:54:50"
slug = "c3b6c751"
aliases = ["/2023/10_10_c3b6c751.html"]
description = "记录Win7安装Node.js的限制：官方仅支持到13，14.5.3可解压二进制包并配环境变量运行，更高版本易缺dll不建议尝试。"
[taxonomies]
tags = ["nodejs", "win7"]
[extra]
cover = "https://picsum.photos/400"
+++
win7只支持到node 13; 

14则不行

目前测试14.5.3可以通过解压二进制包的方法，再挂个环境变量可以解决。

如果你传使用14及以上的其它版本，可能会遇到找不到xxx.dll的方法。建议不要浪费时间
