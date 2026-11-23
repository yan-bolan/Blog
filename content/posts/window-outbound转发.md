+++
title = "window outbound转发"
date = "2023-11-12 22:34:54"
slug = "28d802e2"
aliases = ["/2023/11_12_28d802e2.html"]
description = "整理Windows下拦截转发outbound TCP流量的方案：用虚拟网卡设定IP再监听端口，对比clash改协议方式与Linux的iptables。"
[taxonomies]
tags = ["代理", "clash", "win10"]
[extra]
cover = "https://picsum.photos/400"
+++
需求：

拦截转发outbound的tcp流量。

分不改协议和改协议，clash是改协议。

[请问 windows 下有好用的 ip 转向/重定向工具吗？或者怎样实现？ - V2EX](https://v2ex.com/t/839318)

[win10系统怎么创建虚拟网卡？-CSDN博客](https://blog.csdn.net/EDDJH_31/article/details/82694205)

[windows如何拦截出网TCP流量转向内网的一个简易解决方案_tcp拦截工具_Afterwards_的博客-CSDN博客](https://blog.csdn.net/Afterwards_/article/details/125935493)

目前方案是使用虚拟网卡来实现对应的ip，再监听ip 的端口。

linux工具就比较多，iptables就可以实现、。

虚拟网卡自设定的ip不知道是否对真实的ip是否会有影响（ip冲突之类的），建议自己测试就行。





# 回环网卡

Microsoft Loopback Adapter （微软回环网卡）类似一个虚拟网卡，能够被安装在一个没有网卡或者要用于测试多个宿主环境的 Windows 上。
