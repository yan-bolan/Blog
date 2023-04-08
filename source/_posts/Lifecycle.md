---
title: lifecycle
tags: net
abbrlink: 55011c36
date: 2023-03-18 22:14:58
---

---

### Lifecycle

Http.sys => HttpRuntime => HttpApplicationFactory => HttpApplication => Http Handler  
HttpRuntime  
Global.asax  
Http Context

改用 [OWIN](https://blog.darkthread.net/blog/about-owin/) 作為 ASP.NET 底層核心，擺脫對 System.Web 的依賴，讓 ASP.NET 可以在 IIS 以外的 Web Server 執行。最先做到 OWIN 相容的是 Web API 及 SignalR，最明顯特色是可以輕易改用 Console Appliation 跑 WebAPI 或 SignalR 服務，而 OWIN 精神現今已融合進 ASP.NET Core。

Harmony 可以在執行階段對 .NET 方式進行修補(Patch)、置換或加料(Decorate)， 

在 [System.Reflection.Emit 命名空間](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.emit?WT.mc_id=DOP-MVP-37580)有一套 API 可動態生成 CIL 程式碼，

先把時間拉回 ASP.NET 2.0 時代，最直覺做法是建個 OracleConnection、OracleCommand，加上 OracleParameter 傳入日期參數 (提醒：勿直接用參數組 SQL 字串搞出 SQL Injection 漏洞，

[好 LINQ，不用嗎？-黑暗執行緒 (darkthread.net)](https://blog.darkthread.net/blog/linq-fun/)

了解一下底层;

[.Net Ecosystem (微軟開發生態系) | The Skeptical Software Engineer (sdwh.dev)](https://sdwh.dev/posts/2022/01/Dot-Net-Ecosystem/)

`Dapper` 是 .NET/C# 平台非常优秀的 `微型 ORM` 框架，主要是为 `ADO.NET` 操作对象提供拓展能力，推崇原生 `sql` 操作法。

standard operating procedure
