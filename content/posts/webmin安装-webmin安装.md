+++
title = "webmin安装"
date = "2019-12-06 09:52:28"
updated = "2021-05-14 22:04:18"
slug = "c051e112"
aliases = ["/2019/12_06_c051e112.html"]
description = "记录CentOS安装Webmin：rpm依赖缺失用yum补perl模块，SSL模式需以https访问，IPv6监听在端口设置中开启并装perl-Socket6。"
[taxonomies]
tags = ["webmin,ipv6,install"]
[extra]
category = "Linux"
categories = ["Linux"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 風.png"
+++
﻿[https://www.cnblogs.com/phpk/p/10514910.html](https://www.cnblogs.com/phpk/p/10514910.html)

webmin-1.930-1.noarch.rpm
[root@localhost yayi]# rpm -ivh webmin-1.930-1.noarch.rpm
警告：webmin-1.930-1.noarch.rpm: 头V4 DSA/SHA1 Signature, 密钥 ID 11f63c51: NOKEY
错误：依赖检测失败：
        perl(Net::SSLeay) 被 webmin-1.930-1.noarch 需要
        perl(Encode::Detect) 被 webmin-1.930-1.noarch 需要
[root@localhost yayi]# yum -y install  perl-Net-SSLeay  perl-Encode-Detect
已加载插件：fastestmirror, langpacks

![在这里插入图片描述](http://img.yayi.site/csdn/20191206095204980.png-watermaskStyle)

防火墙：centos7
[https://www.cnblogs.com/potato-chip/p/11420376.html](https://www.cnblogs.com/potato-chip/p/11420376.html)


Webmin Error: The Web Server is running in SSL mode
加https就行

Is there a way to make Webmin listen on IPv6 IP address instead of IPv4? I'm planning to use IPv6 for Webmin/Virtual min and corresponding domain?

Status: 
Active
Log in or register to post comments
Comments
Submitted by andreychek on Sat, 03/23/2013 - 09:21 Comment #1

Howdy -- in Webmin -> Webmin -> Webmin Configuration -> Ports and Addresses, you can specify there whether or not it listens for IPv6 requests.

Log in or register to post 

ipv6访问不了webmin 关掉再开 
ipv6 webmin 访问在![在这里插入图片描述](https://img-blog.csdnimg.cn/2019120712343231.png)![在这里插入图片描述](http://img.yayi.site/csdn/20191207123415195.png-watermaskStyle)
安装：perl-Socket6