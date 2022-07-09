---
title: thinkphp日志
date: 2019-11-16 09:40:08.0
updated: 2021-05-14 22:03:58.865
url: https://yayi.site/archives/thinkphp日志
categories: php
tags: 
---


﻿首先你要导入这个日志类，否则类找不到
然后看开发手册
日志还要给权限
linux mkdir(): Permission denied
[http://www.thinkphp.cn/topic/42633.html](http://www.thinkphp.cn/topic/42633.html)
我的是控制器里写文件，我直接给了application 777权限
runtime 777

具体情况，输出路径看看，运行者权限。。。