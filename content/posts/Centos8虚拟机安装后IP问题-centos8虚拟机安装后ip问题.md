+++
title = "Centos8虚拟机安装后IP问题"
date = "2020-05-17 20:30:50"
updated = "2021-05-14 22:01:16"
slug = "e76bfc3c"
aliases = ["/2020/05_17_e76bfc3c.html"]
description = "CentOS 8虚拟机无IP排查：系统废弃network.service改用NetworkManager，执行nmcli c up ens33激活网卡解决。"
[taxonomies]
tags = ["linux", "vmware"]
[extra]
category = "Linux"
categories = ["Linux"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125432-warteergirls.png"
+++
﻿忘记截图了。

[https://www.jb51.net/article/173041.htm](https://www.jb51.net/article/173041.htm)


方法：激活网卡的3种方式（相当于ifup）：

（1）# nmcli c up ens33


就可以了
一、CentOS 7和CentOS 8网络配置区别：

VMware Workstation 15 Pro中安装了CentOS 8.0.1905，但在配置IP地址过程中发现没有了network.service，并且/etc/sysconfig/network-scripts目录中也没有任何脚本文件，CentOS 7中同时支持network.service和NetworkManager.service（简称NM）2种方式配置网络，而在CentOS 8中已经废弃network.service，必须通过NetworkManager.service配置网络。


还是不要尝新的好