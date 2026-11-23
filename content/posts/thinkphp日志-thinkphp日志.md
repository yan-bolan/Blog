+++
title = "thinkphp日志"
date = "2019-11-16 09:40:08"
updated = "2021-05-14 22:03:58"
slug = "8c82bc09"
aliases = ["/2019/11_16_8c82bc09.html"]
description = "记录ThinkPHP日志写入失败的处理：先导入日志类，Linux下mkdir权限被拒时给application与runtime目录放权，并核对路径与权限。"
[extra]
category = "php"
categories = ["php"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 風.png"
[taxonomies]
tags = ["php", "thinkphp", "权限"]
+++
﻿首先你要导入这个日志类，否则类找不到
然后看开发手册
日志还要给权限
linux mkdir(): Permission denied
[http://www.thinkphp.cn/topic/42633.html](http://www.thinkphp.cn/topic/42633.html)
我的是控制器里写文件，我直接给了application 777权限
runtime 777

具体情况，输出路径看看，运行者权限。。。