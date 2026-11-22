+++
title = "net_using_找不到"
date = "2023-10-09 20:42:10"
slug = "fdb6fcb9"
aliases = ["/2023/10_09_fdb6fcb9.html"]
description = "排查C#报CS0246找不到类型：引用的程序集框架版本高于目标框架所致，升级net4.0至4.5或安装匹配的System.Net.Http包解决。"
[taxonomies]
tags = ["csharp", "net", "using", "依赖"]
[extra]
cover = "https://picsum.photos/400"
+++
报错：

using directive is unnecessary the type or namespace cannot be found

参考方法：

[Compiler Error CS0246 - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/cs0246)

我的属于：

- Did you reference the assembly that was built against a higher framework version than the target framework of the program? Or did you reference the project that is targeting a higher framework version than the target framework of the program? For example, you work on the project that is targeting .NET Framework 4.6.1 and use the type from the project that is targeting .NET Framework 4.7.1. Then you get error CS0246.

- 引用的程序集是否针对比程序的目标框架版本更高的框架版本而生成？ 或者，引用的项目所面向的框架版本是否高于程序的目标框架版本？ 例如，你在处理面向 .NET Framework 4.6.1 的项目，但使用的是面向 .NET Framework 4.7.1 的项目中的类型。 这样就显示错误 CS0246。

我这里有一个警告：

因為它在架構組件 "System.Net.Http, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" 上有間接相依性，但此組件無法在目前設為目標的架構中解析。".NETFramework,Version=v4.0"。若要解決此問題，請移除參考 "com.x.x, Version=3.1.2.3, Culture=neutral, processorArchitecture=MSIL"，或將應用程式的目標重定為包含 "System.Net.Http, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" 的架構版本。

>  意思是这个x.x组件有依赖system.net.http, 而当前是net 4.0。方法是删除此依赖或改到包括system.net.http 2.0的版本;

我这里将net 4.0改成4.5，然后重新删除依赖，再添加。或者使用nuget安装适合net4.0（应该是Net standard 2.0?）的system.net.http.dll的2.0版本

思考：

1. 本机是vs2019 是 net 4.0同样的代码拷贝到别一台机器，用vs2022打开报这样的问题？感觉是与机子环境有关？有什么办法打印祥细的MSBuild log? 找到一些蛛丝马迹？

2. 有一些则是将bin文件重新添加进专案即可？

```bash
msbuild -v:diag xx.cspoj
```

-verbosity:`level`

[MSBuild Command-Line Reference - MSBuild | Microsoft Learn](https://learn.microsoft.com/en-us/visualstudio/msbuild/msbuild-command-line-reference?view=vs-2022)

从输出的结果看：看不懂。下面是能正常运行找到的。

```cmd
 C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.0\System.Net.Http.dll
                  CopyLocal=false
                  FrameworkFile=true
                  FusionName=System.Net.Http, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a
                  HintPath=..\packages\com.x.x.3.1.2.3\lib\com.x.x.dll
                  ImageRuntime=v4.0.30319
                  OriginalItemSpec=com.x.x, Version=3.1.2.3, Culture=neutral, processorArchitecture=MSIL
                  Private=True
                  ReferenceSourceTarget=ResolveAssemblyReference
                  ResolvedFrom={TargetFrameworkDirectory}
                  Version=2.0.0.0
```

可能是环境安装了什么

另一台机子则没有什么有用的信息

```cmd
ram Files\Microsoft Visual Studio\2022\Professional\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets(2302,5): warning MSB3268: 無法解析主要參考
```

---

建议使用MSBuild log viewer工具查看log （需要MSBuild 15.3及以上，vs2017以上）

[MSBuild Log Viewer](https://msbuildlog.com/)

加 /bl

---

- [System.Net.Http.dll 是一个用于支持 .NET Framework 4.5 及以上版本，以及 .NET Core 和 .NET Standard 的程序包，它不依赖于其他程序包](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http?view=net-7.0)[1](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http?view=net-7.0)[2](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http.httpclient?view=net-7.0)。它是最新的版本，提供了一些新的功能和改进。
- [Microsoft.Net.Http.dll 是一个用于支持 .NET Framework 4.0 和一些便携式类库的程序包，它依赖于 Microsoft.Bcl 和 Microsoft.Bcl.Build 等其他程序包](https://cloud.tencent.com/developer/ask/sof/71839)[3](https://bing.com/search?q=System.Net.Http.dll+%E5%92%8C+Microsoft.Net.Http.dll+%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F)[4](https://cloud.tencent.com/developer/ask/sof/71839)[。它已经被弃用，不再更新](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http?view=net-7.0)[5](http://www.contoso.com/)。
- [如果您的项目是基于 .NET Framework 4.5 及以上版本的，那么建议您使用 System.Net.Http.dll 程序包，因为它已经过测试和优化，而且可以避免一些版本冲突或绑定重定向的问题](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http.httpclient?view=net-7.0)[2](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http.httpclient?view=net-7.0) 。
- [如果您的项目是基于 .NET Framework 4.0 或一些便携式类库的，那么您可能需要使用 Microsoft.Net.Http.dll 程序包，因为它提供了对 HttpClient 的支持，但是您可能需要手动配置一些绑定重定向或引用](https://cloud.tencent.com/developer/ask/sof/71839)[4](https://cloud.tencent.com/developer/ask/sof/71839) 。
- [如果您的项目是基于 .NET Core 或 .NET Standard 的，或者您使用了一些依赖于 .NET Standard 2.0 的 NuGet 包，那么您可能需要使用 System.Net.Http.dll 程序包，因为它提供了一些新的功能和改进，而且可以保证跨平台的兼容性](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http?view=net-7.0)[1](https://learn.microsoft.com/zh-tw/dotnet/api/system.net.http?view=net-7.0) 。

希望这些信息对您有所帮助。如果您还有其他问题，请随时与我联系。😊

[您好，这是 Bing。我可以帮您了解关于 System.Net.Http.dll 的历史。System.Net.Http.dll 是一个提供现代 HTTP 应用程序编程接口的库，包括允许应用程序通过 HTTP 消费 Web 服务的 HTTP 客户端组件，以及可由客户端和服务器用于解析 HTTP 头的 HTTP 组件](https://www.nuget.org/packages/System.Net.Http/)[1](https://www.nuget.org/packages/System.Net.Http/)。关于 System.Net.Http.dll 的一些历史事实如下：

- [System.Net.Http.dll 最早出现在 .NET Framework 4.5 中，作为 .NET Framework 中自带的一个程序集](https://www.nuget.org/packages/System.Net.Http/)[2](https://www.nuget.org/packages/System.Net.Http/4.0.0)[3](https://wikidll.com/microsoft-corporation/systemnethttp-dll)。
- [System.Net.Http.dll 随后也被包含在 .NET Core 和 .NET Standard 中，作为 .NET 平台上的一个标准 API](https://www.nuget.org/packages/System.Net.Http/)[2](https://www.nuget.org/packages/System.Net.Http/4.0.0)[4](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclienthandler?view=net-7.0)。
- [System.Net.Http.dll 在不同的平台和版本中可能有一些差异和变化，例如在 .NET Core 2.1 中引入了 SocketsHttpHandler 类，作为 HttpClientHandler 的默认实现](https://www.nuget.org/packages/System.Net.Http/)[5](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpversionpolicy?view=net-7.0)[6](https://www.nuget.org/packages/Microsoft.Identity.Client/)。
- System.Net.Http.dll 也可以作为一个 NuGet 包来安装和使用，这样

https://cloud.tencent.com/developer/ask/sof/71839

根据下面的描述，旧的 System.Net.Http 包 (2.0 包)是为了支持 Microsoft.Http.Net 而被弃用的遗留包： 传统包，System.Net.Http现在包含在'Microsoft.Net.Http‘包中。 它们的存在是为了在以前的.NET版本和可移植类库中提供 HttpClient 。 在这种情况下，您应该使用 Microsoft.Net.Http 。

](https://cloud.tencent.com/developer/ask/sof/71839)

<mark>"HttpClient最初是一个NuGet包(带外)，在4.5中也被添加到了.NET框架中(在盒子里)。</mark>







---

有点奇怪：net4.0没有自带，

net4.5及以上会向下兼容：Using this version instead of original version "2.0.0.0" in "D: bin\Debug\com.x.x.dll" because there is a more recent version of this framework file.
