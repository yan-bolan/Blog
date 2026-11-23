+++
title = "WINDBG学习"
date = "2024-07-31 21:07:29"
slug = "9c2ee053"
aliases = ["/2024/07_31_9c2ee053.html"]
description = "WinDbg分析IIS进程dump笔记：procdump按32/64位抓取，.loadby sos clr加载SOS，!analyze -v修DAC不匹配。"
[taxonomies]
tags = ["iis", "windbg", "dump"]
[extra]
cover = "https://picsum.photos/400"
+++
https://learn.microsoft.com/en-us/troubleshoot/developer/webapps/iis/health-diagnostic-performance/troubleshoot-high-cpu-in-iis-app-pool

If you need to identify which application pool is associated with a particular w3wp.exe process, open an Administrative Command Prompt, switch into the %windir%\System32\inetsrv folder cd %windir%\System32\inetsrv and run appcmd list wp. This will show the process identifier (PID) of the w3wp.exe process in quotes. You can match that PID with the PID available in Task Manager.
如果需要确定哪个应用程序池与特定 w3wp.exe 进程关联，请打开管理命令提示符，切换到%windir%\System32\inetsrv文件夹cd %windir%\System32\inetsrv并运行appcmd list wp 。这将在引号中显示 w3wp.exe 进程的进程标识符 (PID)。您可以将该 PID 与任务管理器中可用的 PID 相匹配。
cd %windir%\System32\inetsrv

https://crushonme.github.io/wiki/IISLogs/  %systemroot%\system32\inetsrv\APPCMD list site <SiteName>

 同一个应用程序池也会有多个SITE

`!threads`来获取进程中托管线程的列表。还有非托管的？

```bash
!threads
```

64和32位问题很麻烦。

64位的任务管理器抓取32位程序会有问题。

尽量用procdump，也分64和32位。-ma完整

[数据库管理工具 --- WinDbg](http://www.windbg.org/)

SOS问题

仅在 Linux 或 macOS 上需要通过`dotnet-sos`工具安装 SOS。如果您使用较旧的调试工具，Windows 上也可能需要它。最新版本的[Windows 调试器](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/debugger-download-tools)（>= WinDbg 或 cdb 版本 10.0.18317.1001）会自动从 Microsoft 扩展库加载 SOS。

[软件诊断研究所|软件诊断、取证和预测的结构和行为模式。软件诊断库。 --- Software Diagnostics Institute | Structural and Behavioral Patterns for Software Diagnostics, Forensics and Prognostics. Software Diagnostics Library. (dumpanalysis.org)](https://www.dumpanalysis.org/)

命令备忘录:

[Crash Dump Analysis Poster v3.0 (HTML version)](https://www.dumpanalysis.org/CDAPoster.html)

[Windbg程序调试系列1-Mex扩展使用总结 - Eric zhou - 博客园 (cnblogs.com)](https://www.cnblogs.com/tianqing/p/9369693.html)

这个扩展很久没更新了。

.loadby sos mscorwks

[windbg分析dump-解决mscorwks不匹配 - 杰哥很忙 - 博客园 (cnblogs.com)](https://www.cnblogs.com/Jack-Blog/p/13769497.html)

1. 另一个常见的原因是导出dump的计算机和分析dump文件的计算机的`.net framework`环境不一致。

一般情况，使用windbg自带的命令【.loadby sos clr】即可自动加载，使用【.chain】查看加载是否成功。

**Host computer running a 32-bit version of Windows** If your host computer is running a 32-bit version of Windows, use the 32-bit debugging tools. (This situation applies to both x86-based and x64-based targets.)  
**运行 32 位版本 Windows 的主机**如果您的主机运行 32 位版本 Windows，请使用 32 位调试工具。 （这种情况适用于基于 x86 和基于 x64 的目标。）

**x64-based host computer running a 64-bit version of Windows** If your host computer uses an x64-based processor and is running a 64-bit version of Windows, the following rules apply:  
**运行 64 位版本 Windows 的基于 x64 的主机**如果您的主机使用基于 x64 的处理器并且运行 64 位版本的 Windows，则适用以下规则：

- If you are analyzing a dump file, you can use either the 32-bit debugging tools or the 64-bit debugging tools. (It is not important whether the dump file is a user-mode dump file or a kernel-mode dump file, and it is not important whether the dump file was made on an x86-based or an x64-based platform.)  
  如果要分析转储文件，可以使用 32 位调试工具或 64 位调试工具。 （转储文件是用户模式转储文件还是内核模式转储文件并不重要，并且转储文件是在基于 x86 的平台还是基于 x64 的平台上生成的并不重要。）

- If you are performing live kernel-mode debugging, you can use either the 32-bit debugging tools or the x64 debugging tools. (This situation applies to both x86-based and x64-based targets.)  
  如果要执行实时内核模式调试，则可以使用 32 位调试工具或 x64 调试工具。 （这种情况适用于基于 x86 和基于 x64 的目标。）

- If you are debugging live user-mode code that is running on the same computer as the debugger, use the 64-bit tools for debugging 64-bit code and 32-bit code running on WOW64. To set the debugger for 32-bit or 64-bit mode, use the .effmach command.  
  如果您正在调试与调试器在同一台计算机上运行的实时用户模式代码，请使用 64 位工具来调试在 WOW64 上运行的 64 位代码和 32 位代码。要将调试器设置为 32 位或 64 位模式，请使用 .effmach 命令。

- If you are debugging live 32-bit user-mode code that is running on a separate target computer, use the 32-bit debugging tools.  
  如果要调试在单独的目标计算机上运行的实时 32 位用户模式代码，请使用 32 位调试工具。

This very complete [explanation by Doug Stewart](http://blogs.msdn.com/b/dougste/archive/2009/02/18/failed-to-load-data-access-dll-0x80004005-or-what-is-mscordacwks-dll.aspx) helped me in this situation.  
[道格·斯图尔特（Doug Stewart）的这个非常完整的解释](http://blogs.msdn.com/b/dougste/archive/2009/02/18/failed-to-load-data-access-dll-0x80004005-or-what-is-mscordacwks-dll.aspx)在这种情况下帮助了我。

Summary: 概括：

- Get the mscordacwks.dll from the original system.  
  从原始系统获取 mscordacwks.dll。
- Rename it to something like `mscordacwks_AAA_AAA_2.0.50727.xxxx.dll` (depending on your architecture and the specific framework version) - e.g. `mscordacwks_x86_x86_2.0.50727.3607.dll` for the specific case in the question.  
  将其重命名为`mscordacwks_AAA_AAA_2.0.50727.xxxx.dll` （取决于您的体系结构和特定框架版本） - 例如`mscordacwks_x86_x86_2.0.50727.3607.dll`对于问题中的具体情况。
- Copy that file into the directory of `windbg.exe`.  
  将该文件复制到`windbg.exe`的目录中。

[WinDbg提示：无法加载数据访问DLL --- WinDbg Tip:Failed to load data access DLL (poppastring.com)](https://www.poppastring.com/blog/windbg-tipfailed-to-load-data-access-dll)

说实话，上面的方法确实是解决这个问题的外科手术方法，并且对我有用，但是，您可以通过简单地运行**!analyze –v**命令来应用更多的强力。如果您指向 Microsoft 的符号服务器，它会自动代表您下拉并加载适当的 DAC 版本。

[Index of /x64 (wellisolutions.de)](https://sos.debugging.wellisolutions.de/x64/)

 !analyze -v复制输出到notepad++分析一下x86和x64导出差异

64位的procdump导 iis 32位显示 SOS.DLL is not loaded for managed code. Analysis might be incomplete

本机有使用scoop的安装，procdump 默认使用的是scoop

```bash
!ClrStack2 (!ck2) - Prints the stack trace of a managed thread

Usage:
    !ClrStack2 [-t <id>] [-l] [-m] [-na] 
        -t|-tid <id>    : Look up the thread with system thread id = <id>
        -l              : Hide source lines
        -m              : Show only managed method stack frames
        -na             : Don't process action rules

    !ClrStack2 [-l] [-m] [-na] [<thread_number>] 
        -l               : Hide source lines
        -m               : Show only managed method stack frames
        -na              : Don't process action rules
        thread_number    : Thread number

    !ClrStack2 [-?|-h] 
        -?|-h|-help    : Display this help text

Current Owner: mexfeedback

Command is overloaded. Maybe you wanted one of these commands:
!D:\分析工具\mexdebuggerex\Mex\x86\mex.dll.ClrStack2
!D:\分析工具\mexdebuggerex\Mex\x86\mex.dll.clrstack2
!D:\分析工具\mexdebuggerex\Mex\x86\mex.dll.ck2
0:049> !ClrStack2 
DbgId ThreadId Apartment Kind   CLR          GC Mode    GC Suspending?
   49     213c MTA       Worker v4.8.9256.00 Preemptive no

SP IP Function Source
```

.cordll -ve -u -l

显示变量值

```bash
.dso
```

```bash
~*e !ck2
```

~*e代表切换每一个线程执行!ck2 这个命令

这个MEX插件可以直接打印HttpWebRequest请求，时间都有

```bash
SP IP Function Source
DbgId ThreadId Apartment Kind   CLR          GC Mode    GC Suspending?
   31     3778 MTA       Worker v4.7.4101.00 Preemptive no

HttpWebRequest
--------------
Address                         0x000000000a8fd064
Uri                             http://xx.xx.xx/api/SSO/VerifyToken
Verb                            POST
ServicePoint                    http://xx.x.x
ServicePoint ConnectionLimit    2147483647
ServicePoint CurrentConnections 1
Timeout                         00:01:40
Duration?                       00:00:16.2500000
```

do2do2 查看对象

!mex.aspxpagesext  查看所有的Asp.Net请求

# 符号

.reload 更新。 或者使用工作空间 !sympath 检查 

.symfix 是 Windows 调试器（例如 WinDbg）中的一个命令，它用于自动设置符号路径，使其指向 Microsoft 的符号存储区。这对于调试驱动程序或其他 Windows 组件时非常有用。让我们来看看具体的用法和参数：

.symfix：这个命令会自动将符号路径设置为指向 Microsoft 符号存储区。如果你之前已经设置了符号路径，使用 .symfix 会替换现有的路径。如果你想要追加路径而不是替换，可以使用 .symfix+。
.symfix+：这个命令会在现有的符号路径基础上追加新的路径。你可以指定一个本地目录作为符号缓存，也可以使用默认的目录。
例如，如果你想要设置一个新的符号路径，让它指向 Microsoft 的符号存储区，可以这样操作：

3: kd> .symfix c:\myCache

这会将符号路径设置为 cache*c:\myCache;SRV*，其中 SRV* 表示 Microsoft 符号存储区。如果你想要追加路径而不是替换，可以使用 .symfix+：

3: kd> .symfix+ c:\myCache

哦，你是想了解关于 .sympath+ 命令的信息对吧？没问题，我来解释一下！

.sympath 是 Windows 调试器（例如 WinDbg）中的一个命令，用于设置或更改符号路径。符号路径指定调试器查找符号文件的位置。让我们来看看具体的用法和参数：

.sympath：这个命令会设置或更改符号路径。如果你之前已经设置了符号路径，使用 .sympath 会替换现有的路径。如果你想要追加路径而不是替换，可以使用 .sympath+。
.sympath+：这个命令会在现有的符号路径基础上追加新的路径。你可以指定一个完整的路径，也可以提供多个路径，用分号分隔。如果省略路径，将显示当前的符号路径。
例如，如果你想要设置一个新的符号路径，让它指向某个目录，可以这样操作：

0:000>.sympath D:\symbols

这会将符号路径设置为 D:\symbols。如果你想要追加路径而不是替换，可以使用 .sympath+：

0:000>.sympath+ G:\worksymbols

这会将现有的符号路径追加为 D:\symbols;G:\worksymbols。
