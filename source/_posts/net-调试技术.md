---
title: net 调试技术
date: 2022-09-17 12:29:22
tags:
---

#工具

ide 层面

sysinternals套件:74个windows工具

> [Process Explorer](https://technet.microsoft.com/en-us/sysinternals/bb896653)进程浏览器，查看进程的详细信息包括CPU，GPU，IO，线程，句柄，内存
> 
> [AutoRuns](https://technet.microsoft.com/en-us/sysinternals/bb963902) windows启动程序管理
> 
> [Process Monitor](https://technet.microsoft.com/en-us/sysinternals/bb896645)实时显示文件系统，注册表，网络活动，进程或线程活动，资料收集事件。
> 
> [PsTools](https://technet.microsoft.com/en-us/sysinternals/bb896649)
> 
> [TcpView](https://technet.microsoft.com/en-us/sysinternals/bb897437)
> 
>  [ProcDump](http://technet.microsoft.com/zh-cn/sysinternals/dd996900.aspx) 
> 
>  [VMMap](http://technet.microsoft.com/zh-cn/sysinternals/dd535533.aspx) VMMap 是进程虚拟和物理内存分析实用工具。

## 线程调试；

# 内核调试

[《Windows内核分析》专题-索引目录 - OneTrainee - 博客园 (cnblogs.com)](https://www.cnblogs.com/onetrainee/p/11675224.html)

# windbg

[如何在 C# 程序中注入恶意 DLL ？ (qq.com)](https://mp.weixin.qq.com/s/XO5Ec3M111_2xiOUy7f0-w)

将线程注入到c#进程中； DbgBreakPoint（）函数：int 3 中断函数：将当前进程的所有线程进行中断；
