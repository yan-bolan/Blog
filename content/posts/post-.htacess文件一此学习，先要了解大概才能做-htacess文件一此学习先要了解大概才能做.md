+++
title = ".htacess文件一此学习，先要了解大概才能做"
date = "2020-06-17 15:35:02"
updated = "2021-05-14 22:01:27"
slug = "htacess文件一此学习，先要了解大概才能做-htacess文件一此学习先要了解大概才能做"
description = "初学.htaccess文件：RewriteRule与Redirect permanent两种301重定向写法，需先开启重写支持，附在线编辑工具与防盗链参考。"
[taxonomies]
tags = [".htaccess"]
[extra]
category = "网络"
categories = ["网络"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/三ノ·輪 銀.png"
+++
﻿## 文件.htaccess

### 重定向方法



重定向方法：

#两个方法
#RewriteEngine On
#RewriteRule ^/ http://localhost:8080/blog [R=301,L]

二：

<Files ~ "^\.(htaccess|htpasswd)$">
deny from all
</Files>
Redirect permanent http://localhost:8080/ http://localhost:8080/blog
order deny,allow

### 首先要开启：

https://blog.csdn.net/wujiangwei567/article/details/40627143?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase

### 一些工具

在线编辑工具：

http://www.htaccesseditor.com/sc.shtml#a_redirect

[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-c3e4B3Fg-1592379219274)(https://img.vim-cn.com/31/94f34451659b14f01c788ad57497940ac88630.png)]





### 一些功能 

比如防盗链：

https://blog.csdn.net/u012717614/article/details/56485129