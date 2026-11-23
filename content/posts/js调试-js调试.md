+++
title = "js调试"
date = "2019-11-13 18:05:07"
updated = "2021-05-14 22:02:33"
slug = "e2be6777"
aliases = ["/2019/11_13_e2be6777.html"]
description = "JS 杂记：按标签或类名批量取改元素、读本地 JSON 的 utf8 编码问题，以及 ajax 不能跨域、jsonp 需服务端回调返回 函数(data)。"
[extra]
category = "JavaScript"
categories = ["JavaScript"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/乃木·園子.png"
[taxonomies]
tags = ["js", "jsonp", "跨域"]
+++
﻿[https://www.cnblogs.com/yuerdong/p/9883951.html](https://www.cnblogs.com/yuerdong/p/9883951.html)

getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
不用一个个改id之类的
通过js创建元素，更改元素。
getElementByClassName()函数的使用方法：
[https://www.runoob.com/jsref/met-document-getelementsbyclassname.html](https://www.runoob.com/jsref/met-document-getelementsbyclassname.html)

别人都改uft8,而我读本地文件json文件时，存时是uf8，现在变成
![在这里插入图片描述](http://img.yayi.site/csdn/2019111319172539.png-watermaskStyle)





js ajax不可以跨域
jsonp 需要 另一端支持回调callback 返回格式是 函数加（data）