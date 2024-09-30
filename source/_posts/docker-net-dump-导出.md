---
title: docker net dump 导出
tags:
  - dump
  - net
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
abbrlink: 94d365fa
date: 2024-09-28 19:45:38
---



[Docker 中的 .NET 异常了怎么抓 Dump - 一线码农 - 博客园 (cnblogs.com)](https://www.cnblogs.com/huangxincheng/p/17505313.html)



procedump 

或者dotnet-dump



[通过dotnet-dump分析生产环境docker容器部署的应用问题 - a1010 - 博客园 (cnblogs.com)](https://www.cnblogs.com/gmmy/p/15797427.html)

清华源

```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
deb https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
# deb-src https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
```



chmod +x dotnet-dump

`   clrthreads`

setthread xxx



在 Linux 和 macOS 上，此命令需要目标应用程序和 `dotnet-dump` 使用同一 `TMPDIR` 环境变量。 否则，该命令将超时。

`dotnet-dump` 全局工具是在未涉及任何本机调试器的情况下收集和分析 Windows、Linux 和 macOS 转储的方法。 在 `lldb` 无法正常运行的平台（如 Alpine Linux）上，此工具非常重要。 借助 `dotnet-dump` 工具，可以运行 SOS 命令来分析崩溃和垃圾回收器 (GC)，但它不是本机调试器，因此不支持显示本机堆栈帧之类的操作。

所以功能比较少。。。。。

## dotnet-dump collect 没有监听参数 事件？
