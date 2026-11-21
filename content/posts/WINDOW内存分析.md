+++
title = "WINDOW内存分析"
date = "2023-09-15 22:58:26"
slug = "6c4b239d"
aliases = ["/2023/09_15_6c4b239d.html"]
[taxonomies]
tags = ["Net"]
[extra]
cover = "https://picsum.photos/400"
+++
[Windows系统上的VirtualAlloc, HeapAlloc和malloc，new的区别_sesiria的博客-CSDN博客](https://blog.csdn.net/sesiria/article/details/78454953)

![](https://img-blog.csdn.net/20171106101409612?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc2VzaXJpYQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

---

之前有遇到过bitmap 和画笔 非托管内存泄露 ; 用Windbg无法分类显示的是unknown

可能使用的是`VirtualAlloc` 绕过所有的堆直接从 windows虚拟内存管理器中申请内存

[c# - What is WinDbg <unknown> Memory? - Stack Overflow](https://stackoverflow.com/questions/39425998/what-is-windbg-unknown-memory)

根本不知道哪个地方没释放：下断点也会很多命中; 

当时还好net 没有显式调用dispose时，GC终结器会释放，（然后并没有：只能显示调用GC，并显示调用GC等待完成）

使用VMMAP查看：分配的bitmap 是gdidll

使用DOtmemony 看是 可终结的对象较多; 之前被误导是字符串过多（当时确实是字符串操作较多，但其实都释放了）

[Automatic Inspections | dotMemory Documentation (jetbrains.com)](https://www.jetbrains.com/help/dotmemory/2023.2/Inspections.html#finalized_objects)

![16948245215031694824520688.png](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16948245215031694824520688.png)

[WHAT IS：设备上下文（DC，Device Context）_kylemong的博客-CSDN博客](https://blog.csdn.net/KyleMong/article/details/6665363#:~:text=DC%EF%BC%88Device%20Context%EF%BC%89%EF%BC%8C%E4%B8%AD%E6%96%87,%E7%9B%B8%E4%BF%A1%E4%BD%A0%E7%BB%8F%E5%B8%B8%E7%94%A8%E5%88%B0%E3%80%82)

 Adevice context is a structure that defines a set of graphic objects and theirassociated attributes, as well as the graphic modes that affect output. Thegraphic objects include a pen for line drawing, a brush for painting andfilling, a bitmap for copying or scrolling parts of the screen, a palette fordefining the set of available colors, a region for clipping and otheroperations, and a path for painting and drawing operations.  

设备上下文是一个 Windows 数据结构，其中包含有关设备（如显示器或打印机）绘图属性的信息。 所有绘图调用都通过设备上下文对象进行，该对象封装用于绘制线条、形状和文本的 Windows API。 设备上下文允许在 Windows 中进行与设备无关的绘图。 设备上下文可用于绘制到屏幕、打印机或元文件

虽然当时没分析出来：其实是Graphics 没释放; 可能Graphics跟DC有关

[Analyze GC Roots | dotMemory Documentation (jetbrains.com)](https://www.jetbrains.com/help/dotmemory/Analyzing_GC_Roots.html#pinning-handle)

CLR provides a helpful mechanism for releasing unmanaged resources: the finalization pattern. The `System.Object` type declares a virtual method `Finalize` (also called the finalizer) that is called by the Garbage Collector before the object's memory is reclaimed. Typically, you override this method in order to release unmanaged resources. Any object that has a finalizer is put to the Finalization queue (in dotMemory these objects have Finalization Queue root). When a garbage collection takes place, the GC finds such object in the Finalization queue but doesn't run its finalizer directly. Instead, the GC puts the object to the F-reachable queue (the F-Reachable Queue root in dotMemory) and runs the finalizer in a separate Finalization thread (all of these is done for the sake of performance as the finalizer can potentially run any amount of code). On the next GC, the object in the F-reachable queue is garbage collected. The described pattern has drawbacks, and that's why dotMemory offers a special [Finalizable objects](https://www.jetbrains.com/help/dotmemory/Inspections.html#finalized_objects) inspection.CLR 提供了一种有用的机制来释放非托管资源：终结模式。该类型声明一个虚拟方法（也称为终结器），垃圾收集器在回收对象的内存之前调用该方法。通常，您可以重写此方法以释放非托管资源。任何具有终结器的对象都会被放入终结队列（在 dotMemory 中，这些对象具有终结队列根）。当垃圾收集发生时，GC 在终结队列中找到此类对象，但不会直接运行其终结器。相反，GC 将对象放入 F-reachable 队列（dotMemory 中的 F-Reachable 队列根）并在单独的 Finalization 线程中运行终结器（所有这些都是为了性能而完成，因为终结器可能会运行任何代码量）。在下一次 GC 时，F-reachable 队列中的对象将被垃圾回收。所描述的模式有缺点，这就是为什么 dotMemory 提供特殊的可终结对象检查的原因。

Note that due to the nature of memory profiling, dotMemory always runs a full GC before taking a snapshot. That's why you won't find objects with the Finalization Queue root in snapshots taken via dotMemory. This root type is possible only in raw memory dumps.请注意，由于内存分析的性质，dotMemory 在拍摄快照之前始终运行完整 GC。这就是为什么在通过 dotMemory 拍摄的快照中找不到具有 Finalization Queue 根的对象。此根类型仅在原始内存转储中可用。

使用Windbg

```bash
!FinalizeQueue
SyncBlocks to be cleaned up: 0
Free-Threaded Interfaces to be released: 0
MTA Interfaces to be released: 0
STA Interfaces to be released: 0
----------------------------------
generation 0 has 1 finalizable objects (057c3050->057c3054)
generation 1 has 0 finalizable objects (057c3050->057c3050)
generation 2 has 904 finalizable objects (057c2230->057c3050)
Ready for finalization 1048 objects (057c3054->057c40b4)
Statistics for all finalizable objects (including all objects ready for finalization):
      MT    Count    TotalSize Class Name

072b5fa4       26         1144 System.Drawing.BufferedGraphics
01f65340       35         1260 System.Windows.Forms.Internal.WindowsFont
01ded864       11         1540 System.Windows.Forms.Label
01deb398        9         1584 System.Windows.Forms.Button
081894bc       15         1920 System.Data.DataColumn
01d7ea14       40         2400 System.Windows.Forms.Control+ControlNativeWindow
055cee8c      590        14160 System.Drawing.Bitmap
01f641e8      590        18880 System.Drawing.Graphics
01f663a4      399        28728 System.Windows.Forms.Internal.DeviceContext
```

590个Bitmap与590个Graphics

generation 2 has 904 finalizable objects说明存在很久了







https://bbs.kanxue.com/thread-206911-1.htm

https://m.sohu.com/a/476930064_121124360/?pvid=000115_3w_a
