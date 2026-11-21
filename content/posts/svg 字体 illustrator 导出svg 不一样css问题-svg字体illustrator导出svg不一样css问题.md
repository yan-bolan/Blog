+++
title = "svg 字体 illustrator 导出svg 不一样css问题"
date = "2021-04-17 13:12:25"
updated = "2021-05-14 22:03:58"
slug = "7e4dfc13"
aliases = ["/2021/04_17_7e4dfc13.html"]
[extra]
category = "前端"
categories = ["前端"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/乃木·園子.png"
+++
﻿illustrator 导出svg，用的是同一字体 ，导出到网页，不一样。

原来是原本css文件中中加了serif;line-height: 1.8;等。加上就可以了

我的加font-family没有用。

因此直接写svg标签在html里，而不是img 引入方式。解决字体问题。

后来发现，字体颜色不对。fill="#233300" 来修改颜色。

默认bold加粗