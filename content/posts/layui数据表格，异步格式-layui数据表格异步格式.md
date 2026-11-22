+++
title = "layui数据表格，异步格式"
date = "2019-11-09 14:54:29"
updated = "2021-05-14 22:02:39"
slug = "e44eae33"
aliases = ["/2019/11_09_e44eae33.html"]
description = "layui 数据表格异步加载一直转圈并报 LAY_TABLE_INDEX 赋值错误，因返回数据不符规范，成功状态码须为 code:0，附排查链接。"
[extra]
category = "javaweb"
categories = ["javaweb"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/結城·友奈.png"
+++
﻿返回的数据不符合规范，正确的成功状态码应为："code": 0

[https://blog.csdn.net/weixin_42143048/article/details/88174310](https://blog.csdn.net/weixin_42143048/article/details/88174310)

一直转圈，

TypeError: can't assign to property "LAY_TABLE_INDEX" on "


[https://blog.csdn.net/qq_38698753/article/details/80524899](https://blog.csdn.net/qq_38698753/article/details/80524899)
![在这里插入图片描述](http://img.yayi.site/csdn/20191109154320140.png-watermaskStyle)
![在这里插入图片描述](http://img.yayi.site/csdn/20191109154335549.png-watermaskStyle)
![在这里插入图片描述](http://img.yayi.site/csdn/20191109154416834.png-watermaskStyle)

sevlet 输出 到jsp
http://blog.sina.com.cn/s/blog_4cd29e3201000a1p.html
局部刷新图片

[https://blog.csdn.net/qq_35868412/article/details/80484770](https://blog.csdn.net/qq_35868412/article/details/80484770)