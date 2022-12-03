---
title: http.sys代理Delegation net 反向代理应用层
cover: 'https://api.isoyu.com/bing_images.php'
tags: 代理 yarp
abbrlink: 820ce945
date: 2022-11-06 17:36:10
---

# winserver

端口转发：可以使用netsh命令行进行;(管理员权限)

类似于nginx的七层转发，好像没有;

微软的文章：

[Http.sys Delegation](https://microsoft.github.io/reverse-proxy/articles/httpsys-delegation.html)

提出这个特征：要求winserver 2019 和win10以上

Http.sys delegation requires:

- ASP.NET Core 6+
- [ASP.NET Core's Http.sys server](https://docs.microsoft.com/aspnet/core/fundamentals/servers/httpsys)
- Windows Server 2019 or Windows 10 (build number 1809) or newer.

基于这个特性：微软出了一个 `YARP`: Yet Another Reverse Proxy

支持net core

path匹配

https://microsoft.github.io/reverse-proxy/articles/header-routing.htmlhttps://microsoft.github.io/reverse-proxy/articles/header-routing.html

好像重写url功能？

https://microsoft.github.io/reverse-proxy/articles/transforms.html

启用log进行诊断

[Diagnosing YARP-based proxies](https://microsoft.github.io/reverse-proxy/articles/diagnosing-yarp-issues.html)[Diagnosing YARP-based proxies](https://microsoft.github.io/reverse-proxy/articles/diagnosing-yarp-issues.html)

[GitHub - microsoft/reverse-proxy: A toolkit for developing high-performance HTTP reverse proxy applications.](https://github.com/microsoft/reverse-proxy)

```json
 "Urls": "http://localhost:80",//在以exe运行时是不能绑定同一端口的;在iis上是由http.sys进行绑定的
```

 Http.sys delegation 委托只能目的地？

它好像使用的是Kestrel这个是各平台;

https.sys这个只能在window平台使用

HTTP.sys isn't compatible with the [ASP.NET Core Module](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/aspnet-core-module?view=aspnetcore-6.0) and can't be used with IIS or IIS Express. 就是不能在IIS上用;

[asp.net - C# web application -&gt; proxy all requests -&gt; return content from another web application (Reverse proxy) - Stack Overflow](https://stackoverflow.com/questions/48424510/c-sharp-web-application-proxy-all-requests-return-content-from-another-web)

自己实现：

`DelegatingHandler`

了解一下

```csharp
X-Forwarded-Host标头
```

[ASP.NET Core高性能服务器HTTP.SYS - Artech - 博客园](https://www.cnblogs.com/artech/p/inside-asp-net-core-6-33.html)

参考范例

[AspNetCore.Docs/aspnetcore/fundamentals/servers/httpsys/samples at main · dotnet/AspNetCore.Docs · GitHub](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/fundamentals/servers/httpsys/samples)

得先注册，使用netsh,<mark> 程序以管理员权限启动时会自动注册</mark>，但好像查不到

netsh只能查到这里的HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\HTTP\Parameters
