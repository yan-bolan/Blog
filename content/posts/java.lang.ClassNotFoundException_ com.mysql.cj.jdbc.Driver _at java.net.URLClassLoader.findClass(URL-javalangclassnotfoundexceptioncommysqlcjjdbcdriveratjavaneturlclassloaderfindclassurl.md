+++
title = "java.lang.ClassNotFoundException com.mysql.cj.jdbc.Driver     at java.net.URLClassLoader.findClass(URL"
date = "2019-10-16 22:50:35"
updated = "2021-05-14 22:02:23"
slug = "1559ec4"
aliases = ["/2019/10_16_1559ec4.html"]
description = "JavaWeb 报 MySQL 驱动类找不到，因缺 mysql-connector-java 包，按数据库版本从 Maven 仓库取依赖写入 pom.xml。"
[extra]
category = "javaweb"
categories = ["javaweb"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 樹.png"
+++
﻿如果是少jar包的话，idea,
![在这里插入图片描述](http://img.yayi.site/csdn/20191016224859650.png-watermaskStyle)
打开cmd查看你的mysql版本
添加maven管理
浏览器打开：[mysql，包，仓库](http://mvnrepository.com/artifact/mysql/mysql-connector-java)
下载对应版本包
或者：
![在这里插入图片描述](http://img.yayi.site/csdn/20191016225234465.png-watermaskStyle)

复制：
![在这里插入图片描述](http://img.yayi.site/csdn/20191016225525196.png-watermaskStyle)
到你项目的pom中