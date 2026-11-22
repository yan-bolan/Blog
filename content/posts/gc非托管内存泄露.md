+++
title = "gc非托管内存泄露"
date = "2023-09-10 10:26:18"
slug = "43959cba"
aliases = ["/2023/09_10_43959cba.html"]
description = ".NET GC 无法自动释放非托管资源，须实现 Dispose 显式清理并抑制终结器，推荐用 SafeHandle 包装句柄而非自写终结器，以防内存泄露。"
[taxonomies]
tags = ["net"]
[extra]
cover = "https://picsum.photos/400"
+++
[实现 Dispose 方法 - .NET | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/standard/garbage-collection/implementing-dispose)

```csharp
public void Dispose()
 {
 Dispose(disposing: true);//调用之后就不需要再调用后面
 GC.SuppressFinalize(this);//请求公共语言运行时不要调用指定对象的终结器。
 }
```

对于应用创建的大多数对象，可以依赖 [.NET 垃圾回收器](https://learn.microsoft.com/zh-cn/dotnet/standard/garbage-collection/)来进行内存管理。 但是，如果创建包含非托管资源的对象，则当你使用完非托管资源后，必须显式释放这些资源。 最常用的非托管资源类型是包装操作系统资源的对象，如文件、窗口、网络连接或数据库连接。 <mark>虽然垃圾回收器可以跟踪封装非托管资源的对象的生存期，但无法了解如何发布并清理这些非托管资源。</mark>

如果你的类型使用非托管资源，则应执行以下操作：

- 实现[清理模式](https://learn.microsoft.com/zh-cn/dotnet/standard/garbage-collection/implementing-dispose)。 这要求你提供 [IDisposable.Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 实现以启用非托管资源的确定性释放。 当不再需要此对象（或其使用的资源）时，类型使用者可调用 [Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose)。 [Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 方法立即释放非托管资源。

- 在类型使用者忘记调用 [Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 的情况下，请提供一种方法来释放非托管资源。 有两种方法可以实现此目的：
  
  - 使用安全句柄包装非托管资源。 这是推荐采用的方法。 安全句柄派生自 [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/zh-cn/dotnet/api/system.runtime.interopservices.safehandle) 抽象类，并包含可靠的 [Finalize](https://learn.microsoft.com/zh-cn/dotnet/api/system.object.finalize) 方法。 在使用安全句柄时，只需实现 [IDisposable](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable) 接口并在 [Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.runtime.interopservices.safehandle.dispose) 实现中调用安全句柄的 [IDisposable.Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 方法。 如果未调用安全句柄的 [Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 方法，则垃圾回收器将自动调用安全句柄的终结器。
    
    —或—
  
  - 定义[终结器](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/finalizers)。 当类型使用者无法调用 [IDisposable.Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 以确定性地释放非托管资源时，终止会启用对非托管资源的非确定性释放。
    
     警告
    
    对象终止是一项复杂且易出错的操作，建议你使用安全句柄而不是提供你自己的终结器。

然后，类型使用者可直接调用 [IDisposable.Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 实现以释放非托管资源使用的内存。 在正确实现 [Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 方法时，安全句柄的 [Finalize](https://learn.microsoft.com/zh-cn/dotnet/api/system.object.finalize) 方法或 [Object.Finalize](https://learn.microsoft.com/zh-cn/dotnet/api/system.object.finalize) 方法的重写会在未调用 [Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose) 方法的情况下阻止清理资源。

---

大概意思是说要显示调用dispose，dispose会通知 终结器线程 去处理：终结器线程会通过线程、进程交流 与对应的线程去释放;

参考com组件的STA单线程套间

终结器（以前称为析构器）用于在垃圾回收器收集类实例时执行任何必要的最终清理操作。 在大多数情况下，通过使用 [System.Runtime.InteropServices.SafeHandle](https://learn.microsoft.com/zh-cn/dotnet/api/system.runtime.interopservices.safehandle) 或派生类包装任何非托管句柄，可以免去编写终结器的过程。

类似C++析构函数

在使用时，显示调用Dispose()方法，可以及时的释放资源，同时通过移除Finalize()方法的执行，提高了性能；如果没有显示调用Dispose()方法，垃圾回收器也可以通过析构函数来释放非托管资源，垃圾回收器本身就具有回收托管资源的功能，从而保证资源的正常释放，只不过由垃圾回收器回收会导致非托管资源的未及时释放的浪费

[GC垃圾回收，GC.WaitForPendingFinalizers() - 禅道 - 博客园 (cnblogs.com)](https://www.cnblogs.com/yy1234/p/13883779.html)

**由于垃圾回收是异步的，CLR有一个专用的线程负责垃圾回收，因此，即使调用GC.Collect，也并不是实时的调用了Finalize，因此要保证确实调用了析构方法，可以使用语句GC.WaitForPendingFinalizers()。**

```csharp
 GC.Collect();//异步，
 GC.WaitForPendingFinalizers();//确保释放
```

[.NET 垃圾回收 | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/standard/garbage-collection/)

[Dispose](https://learn.microsoft.com/zh-cn/dotnet/api/system.idisposable.dispose?view=net-7.0)由于必须显式调用 方法，因此始终存在不释放非托管资源的危险，

---

GDI

[.NET 程序的 GDI 句柄泄露的再反思-51CTO.COM](https://www.51cto.com/article/762164.html)

GDIView工具不是很准







---

[Using UMDH to Find a User-Mode Memory Leak - Windows drivers | Microsoft Learn](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/using-umdh-to-find-a-user-mode-memory-leak)
