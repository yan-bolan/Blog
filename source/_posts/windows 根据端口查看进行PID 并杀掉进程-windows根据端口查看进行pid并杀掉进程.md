---
title: windows 根据端口查看进行PID 并杀掉进程
url: 'https://yayi.site/archives/windows根据端口查看进行pid并杀掉进程'
cover: 'https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/乃木·園子.png'
abbrlink: b51b12a5
date: 2019-11-16 08:38:33
updated: 2021-05-14 22:04:25
categories:
tags:
---


﻿ 首先用netstat -ano | find “端口号”查出进程号
2. takslist 查询当前的进行
3. . 如何杀死进程呢  tasklist /pid ${xx}


https://www.cnblogs.com/qianjinyan/p/10772540.html
发现不行呢，权限不够，用管理员权限运行cmd，发现又报错了，说要强制执行才可以，加上-F