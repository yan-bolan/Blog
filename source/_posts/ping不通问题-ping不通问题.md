---
title: ping不通问题
date: 2020-03-19 12:08:26.0
updated: 2021-05-14 22:02:13.798
url: https://yayi.site/archives/ping不通问题
categories: 
cover: https://cdn.jsdelivr.net/gh/TangxinGH/picbed/img/动漫/結城友奈は勇者である/三ノ·輪 銀.png
tags: 
---


﻿vm要桥接模式。

两台机子ping不通：中间是否有路由器或者防火墙。

机子上的防火墙：要关掉，
![在这里插入图片描述](http://img.yayi.site/csdn/20200319120427434.png-watermaskStyle)
使用中的字样
ping是ip协议中的ICMP包，在入站规则中可以看到：
![在这里插入图片描述](http://img.yayi.site/csdn/20200319120538878.png-watermaskStyle)
![在这里插入图片描述](http://img.yayi.site/csdn/2020031912055033.png-watermaskStyle)
绿色表示通过。

单向ping得通的话有可能是一台机子有防火墙。