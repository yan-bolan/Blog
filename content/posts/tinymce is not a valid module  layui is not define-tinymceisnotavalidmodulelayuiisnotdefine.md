+++
title = "tinymce is not a valid module  layui is not define"
date = "2019-11-11 13:19:16"
updated = "2021-05-14 22:04:01"
slug = "a9c8def1"
aliases = ["/2019/11_11_a9c8def1.html"]
description = "排查tinymce与layui模块未定义报错：IDEA部署Tomcat根路径差异致脚本加载失败，将项目输出直接复制到webapps的ROOT目录解决。"
[extra]
category = "前端"
categories = ["前端"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/結城·友奈.png"
+++
﻿路径问题
![在这里插入图片描述](http://img.yayi.site/csdn/2019111113180333.png-watermaskStyle)
不管是 ../ 还是./
我这里都不会404， 但偏偏就是undefine.....

![在这里插入图片描述](http://img.yayi.site/csdn/20191111131917569.png-watermaskStyle)



idea 到tomcat 的部署

因为我的idea是9090根目录没有Demo项目名
所以存在一些./和/的区别 ，404，太多无法解决

所以干脆将，tomcat的ROOT 改为我的，

要改的话就在这里webapps/root/里面文件改，不然idea的 可能也会404，而且，不需要idea编译打包，再复制，再开tomcat这样麻烦。-

对比副本webapps就知道区别了。


直接将demo 中的target 下的项目复制到你tomcat下就行了。不需要建立war包