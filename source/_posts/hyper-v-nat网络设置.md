---
title: hyper-v nat网络设置
tags:
  - nat
  - 防火墙
cover: https://tuapi.eees.cc/api.php?category=dongman&type=302
date: 2024-11-09 13:06:07
---

先检查这个ip有没有在网卡上。如果ip不在网卡上，是不会报错的。

第二才是检查是不是动态范围端口，也是不会报错的这个。





使用internal ping 不通虚拟机

win/11 防火墙阻止ping icmp 。公共防火墙关掉就好了

Win11公用网络换成专用网络的技巧

powershell 列出：

Get-NetNat 

Microsoft KM-TEST Loopback Adapter

添加多个ip 就行和掩码，尽量同一子网，不用填网关，

多个ip会有问题：

 netsh proxy : 监听指定ip 的端口没有生效

**netstat -ano** 没找到有对应listen 端口

3306 没有监听成功.

原来之前我本机一直有安装mysql ~~所以其实loopback 一直指向本机。意味着混~~。

如果环路reciver=localhost,send =localhost 。所以指同一个主机。tcp ip 时failed，127.0.0.1 不一样的。docker 应该是监听了0.0.0.0,所以再会连到

```
net stop winnat
```

停止 WinNAT 服务。这时协议为 TCP 的 excludedportrange 会被自动重置为 80 - 80 等范围

再监听3306

 netsh int ip delete excludedportrange protocol=tcp numberofports=1 startport=3306

One more reason not mentioned here, is that listening port may be in the [excluded port range](https://serverfault.com/questions/1045527/how-do-i-find-out-why-certain-ports-are-excluded-and-delete-the-exclusion). I stumbled at this issue and spent some time to find out the reason.  
这里没有提到的另一个原因是监听端口可能在[排除的端口范围](https://serverfault.com/questions/1045527/how-do-i-find-out-why-certain-ports-are-excluded-and-delete-the-exclusion)内。我偶然发现了这个问题，并花了一些时间找出原因。

The `netsh interface portproxy add` works fine, the `netsh interface portproxy show all` lists the added rule, but the proxy is not actually working, e.g. `netstat -an | findstr <LPORT>` outputs nothing.  
`netsh interface portproxy add`工作正常， `netsh interface portproxy show all` 列出了添加的规则，但代理实际上并未工作，例如`netstat -an | findstr <LPORT>`不输出任何内容。

To find out the list of the excluded ports, run `netsh int ip show excludedportrange protocol=tcp`. If your listening port is in the excluded port range, you then may try to un-exclude the range, or just choose another port.  
要找出排除端口的列表，请运行 `netsh int ip show excludedportrange protocol=tcp` 。如果您的侦听端口位于排除的端口范围内，您可以尝试取消排除该范围，或者只是选择其他端口。

```bash
 netsh int ip show excludedportrange protocol=tcp

Protocol tcp Port Exclusion Ranges

Start Port    End Port
----------    --------
        80          80
      1210        1309
      1310        1409
      1410        1509
      1522        1621
      1622        1721
      1822        1921
      1992        2091
      2190        2289
      2550        2649
      2869        2869
      2948        3047
      3127        3226
      3227        3326
      3390        3489
```

So, in summary:

`docker run -d -p 12345 private/container`

will result in something like `127.0.0.1:72234->12345/tcp`, but

`docker run -d -p 123.10.12.123:12345 public/container`

you can use `-p IP:host_port:container_port` or `-p IP::port` according to

![](https://docs.docker.com/favicons/docs@2x.ico)[Docker Documentation – 5 Jan 18](https://docs.docker.com/engine/userguide/networking/default_network/binding/ "01:31AM - 05 January 2018")

![](https://docs.docker.com//favicons/docs@2x.ico)

### [Bind container ports to the host](https://docs.docker.com/engine/userguide/networking/default_network/binding/)

The information in this section explains binding container ports within the Docker default bridge. This is a bridge network named bridge created automatically when you install Docker. Note: The Docker...

--- 

netsh中没有报错

你在使用 Windows 时是否会遇到这样的问题：某个端口在 `netstat -ano` 中并没有显示被占用，但是即使使用管理员权限仍然无权绑定该端口？这是因为 Windows 有一些端口是被保留的，即 `excludedportrange`，而该问题可以通过调整 `dynamicport` 解决。

## [](https://blog.caomingjun.com/excludedportrange-and-dynamicport-in-windows/#excludedportrange "excludedportrange")excludedportrange

在 PowerShell 中运行命令 `netsh int ipv4 show excludedportrange protocol=tcp`，你会得到类似这样的输出：

| 1  <br>2  <br>3  <br>4  <br>5  <br>6  <br>7  <br>8  <br>9  <br>10  <br>11  <br>12  <br>13 | ```<br>协议 tcp 端口排除范围开始端口    结束端口----------    --------     50000       50059     *     54364       54463     54664       54763     54764       54863     58922       59021     59022       59121     60791       60890* - 管理的端口排除。<br>``` |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

> `ipv4` 可以替换为 `ipv6`，`tcp` 可以替换为 `udp`。

这列出了 Windows 中被保留的端口，这些端口是不能被用户绑定的，如果尝试绑定这些端口，会得到类似这样的错误：

了端口（比如 Hyper-V？）

为什么会出现保留端口?  
为什么排除一个系统的保留端口执行的是 "netsh interface ipv4 add excludeportrange ..." 而不是 "netsh interface ipv4 delete excludeportrange ..."?  
"netsh interface ipv4 show excludedportrange protocol=tcp" 中的 "Administered port exclusions" 是啥意思？

尽量不要调整dynamic 动态端口

netsh int ipv4 add excludedportrange protocol=tcp startport=1099 numberofports=1

[【转】解决 Windows 10 端口被 Hyper-V 随机保留（占用）的问题 - SpringCore - 博客园](https://www.cnblogs.com/fanqisoft/p/17071121.html)

netsh int ipv4 add excludedportrange protocol=tcp startport=1430 numberofports=1

星号代表不会被保留。没有星号代表会被保留
