---
title: NET发布portable和winx64区别
tags:
  - NET
cover: 'https://picsum.photos/400'
abbrlink: 5b983bae
date: 2023-05-05 21:01:58
---

**  
Edit - Short Answer**

If you choose `portable`, every time the app starts up it will need to go through JIT compilation on the parts of the application that actually execute. If your application is large, the performance can be impacted.

If you choose `x64`, the application will not slow down from compilation, because that is already done by the publish process on the build machine (your laptop).

1. 第一次启动慢;

2. portable:便携版，没有对特定的平台做优化；因为不知道是哪个平台;





**When you set "Target Runtime" to "Portable" the publishing process includes runtime DLLs in the publish destination**

here will be a `/runtime` subfolder in the publish destination, that will include native/runtime files and dependencies for *multiple* platforms and their combinations. This folder can be several megabytes.

EXAMPLE: let's say, your project uses `SqlClient` nuget. *On Windows* this nuget depends on `sni.dll` native library. So that file will be placed into `/runtimes/win-x64/native/sni.dll` and `/runtimes/win-x86/native/sni.dll` (corresponding versions)

That's just one example, there's many more stuff going on.



[.net - What are differences between Portable and win-x64 when deploying? - Stack Overflow](https://stackoverflow.com/questions/53860621/what-are-differences-between-portable-and-win-x64-when-deploying)
