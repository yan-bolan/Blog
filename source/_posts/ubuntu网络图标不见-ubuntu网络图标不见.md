---
title: ubuntu网络图标不见
date: 2019-11-22 21:48:26.0
updated: 2021-05-14 22:04:04.718
url: https://yayi.site/archives/ubuntu网络图标不见
categories: Linux
tags: 
---


﻿```css
service NetworkManager stop
yayi@ubuntu:~$ sudo service network-manager stop
[sudo] yayi 的密码： 
yayi@ubuntu:~$ sudo rm /var/lib/NetworkManager/NetworkManager.state
yayi@ubuntu:~$ sudo service network-manager start
yayi@ubuntu:~$ 


```