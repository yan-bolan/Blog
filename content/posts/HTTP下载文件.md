+++
title = "HTTP下载文件"
date = "2023-07-06 21:34:23"
slug = "da92f61f"
aliases = ["/2023/07_06_da92f61f.html"]
description = "笔记HTTP下载文件：响应头设Content-Disposition、ASP.NET改form提交；ajax返回文件不弹下载，需借Blob创建标签触发请求。"
[taxonomies]
tags = ["http", "web", "xhr", "form", "aspnet"]
[extra]
cover = "https://picsum.photos/400"
+++
下载文件：

1.表头设定context-disp....

2.asp.net加上postbackurl属性，改成postback方式：可以看到控制台是form提交的方式;

xhr的方式是ajax方式，虽然返回了文件，但是浏览器无响应弹出下载的文件;

即使是使用了js的ajax下载blob也是创建html标签触发一个doc请求类型







Blob:

ajax:试着

[如何使用 jq 接收 blob 数据 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903830837002254)
