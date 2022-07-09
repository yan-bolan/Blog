---
title: linux 端口占用lsof 网卡
date: 2020-05-16 18:20:43.0
updated: 2021-05-14 22:02:43.031
url: https://yayi.site/archives/linux端口占用lsof网卡
categories: 
tags: vm docker,网卡,端口占用
---


﻿lsof -i:端口号
list open file
神奇的方法

vm 虚拟机安装docker 后，vm ssh 连上了docker 的网卡。
方法：删除vm的网络适配器网卡，再新添加就可以了