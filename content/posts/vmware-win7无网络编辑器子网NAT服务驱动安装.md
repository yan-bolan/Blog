+++
title = "vmware_win7无网络编辑器子网NAT服务驱动安装"
date = "2022-12-03 21:23:12"
slug = "de25e9bb"
aliases = ["/2022/12_03_de25e9bb.html"]
description = "排查Win7虚拟机无网络：VMnet8出现169开头IP说明问题在宿主机，需在虚拟网络编辑器重建NAT并配子网掩码与DHCP，服务随之自动启动。"
[taxonomies]
tags = ["vmware", "nat", "win7"]
[extra]
cover = "https://tva1.sinaimg.cn/large/0072Vf1pgy1foxlnmr18gj31hc0u01ar.jpg"
+++
1. 在实体机上
   
   使用驱动精灵修好了网络问题;多半驱动问题；装驱动离线版本；

2. 虚拟机无网
   
   vmare，使用驱动精灵没有用; 手动安装vmare的网络驱动，不行
   
   以为是iso有问题，换了纯净ISO，不行;
   
   切到桥接模式，win7 有反应，不再是已拨出的状态;
   
   查看网络配置器，以前有重置过;  再重置一次，不行;
   
   查看host机的ipconfig; 发现vmare net 8 的ip是169开头，这是属于未分配ip的现象;
   
   基本来看问题出在外部，不在虚拟机iso的问题;
   
    增加一个NAT 网络，配置子网，和掩码，和DHCP; （不配，网络是会有问题的）;
   
   ![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/16700743301111670074329364.png)

---

或者网络配置重置过; 没有net;

如里网络重置过; 需要在网络编辑器中进行编辑增加nat 8; 并填写子网和子网掩码，网关;等信息，不然 nat service 开起来也没有

解决方法如下：(<mark>20221203 不需要手动开启，在网络编辑器中有配置net就会自动开</mark>启)
1、在本地电脑(不是虚拟机)上按下Win+R打开运行，输入services.msc按回车；
2、将VMware DHCP Service和VMware NAT Service服务设置为自动启动，并开启服务；

---

[VMware虚拟机三种网络模式详解与配置 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/345954703)

网卡VMware Network Adapter VMnet8呢？原来我们的VMware Network Adapter VMnet8虚拟网卡主要是为了实现主机与虚拟机之间的通信。
