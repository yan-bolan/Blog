+++
title = "“Failed to load response data“ django@xframe_options_exempt 网站不许 Firefox 显示被嵌入的网页"
date = "2021-04-06 17:48:00"
updated = "2021-05-14 22:00:57"
slug = "eacc72e0"
aliases = ["/2021/04_06_eacc72e0.html"]
description = "排查Django站点Ajax响应在浏览器中加载失败：实为X-Frame点击劫持防护拦截嵌入，给视图加xframe_options_exempt注解后恢复。"
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311124333-The-executioner-and-her-way-of-life.jpg"
+++
﻿# python django ajax

chrome 显示 failed to xxx 。以为ajax 数据量大。

1. 设置ajax 的timeout 没有用
2. 换firefox 网站不许 Firefox 显示被嵌入的网页 。哦。（firefox nb）
3. django 的官方 xframe_options_exempt [在view的视图方法上注解](https://docs.djangoproject.com/en/3.1/ref/clickjacking/)
4. ![在这里插入图片描述](http://img.yayi.site/csdn/20210406174917938.png-watermaskStyle)

5. ok.安全问题。