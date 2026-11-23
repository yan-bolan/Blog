+++
title = "Java web项目Linux下部署的中文乱码问题"
date = "2019-11-16 10:48:59"
updated = "2021-05-14 22:02:23"
slug = "d0831334"
aliases = ["/2019/11_16_d0831334.html"]
description = "记录Java Web项目Linux部署中文乱码的编码差异：读文件用UTF-8而response输出用GB2312，与Windows相反；文中未给出明确解法。"
[extra]
category = "javaweb"
categories = ["javaweb"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/三ノ·輪 銀.png"
[taxonomies]
tags = ["java", "linux", "encoding"]
+++
﻿linux 读文件用的是 uft8, 输出到response 时用的是GB2312
window。。。 GB2312, ....UFT-8  
????waht