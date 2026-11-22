+++
title = "mysql导入报错 [Err] 1273 - Unknown collation ‘utf8mb4_0900_ai_ci‘"
date = "2019-11-16 07:57:57"
updated = "2021-05-14 22:02:51"
slug = "f2eff8f"
aliases = ["/2019/11_16_f2eff8f.html"]
description = "解决MySQL导入报1273未知排序规则utf8mb4_0900_ai_ci：先查服务器排序规则，再替换SQL文件中的字符集，Navicat设置无效。"
[extra]
category = "数据库"
categories = ["数据库"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/結城·友奈2.png"
+++
首先查看你服务器的字符排序规则
然后把对应的sql文件中，替换成相应的字符集
我在na vcat中设置好像没有用

![在这里插入图片描述](http://img.yayi.site/csdn/20191116075739823.png-watermaskStyle)