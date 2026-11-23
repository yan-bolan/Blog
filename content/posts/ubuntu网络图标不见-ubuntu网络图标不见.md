+++
title = "ubuntu网络图标不见"
date = "2019-11-22 21:48:26"
updated = "2021-05-14 22:04:04"
slug = "f8a0d332"
aliases = ["/2019/11_22_f8a0d332.html"]
description = "解决Ubuntu网络图标消失：停止network-manager服务，删除NetworkManager.state状态文件后重启服务即可恢复。"
[extra]
category = "Linux"
categories = ["Linux"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311124333-The-executioner-and-her-way-of-life.jpg"
[taxonomies]
tags = ["linux", "ubuntu"]
+++
﻿```css
service NetworkManager stop
yayi@ubuntu:~$ sudo service network-manager stop
[sudo] yayi 的密码： 
yayi@ubuntu:~$ sudo rm /var/lib/NetworkManager/NetworkManager.state
yayi@ubuntu:~$ sudo service network-manager start
yayi@ubuntu:~$ 


```