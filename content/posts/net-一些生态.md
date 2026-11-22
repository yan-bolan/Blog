+++
title = "net 一些生态"
date = "2022-09-09 22:14:58"
slug = "8736f653"
aliases = ["/2022/09_09_8736f653.html"]
description = "梳理.NET生态：各版本关系、工作流引擎、Topshelf、EF、ABP与furion等快速开发框架，以及NuGet命令行工具与微软架构示例项目。"
[taxonomies]
tags = ["net"]
+++
net 6.0 net 5.0 net.core mono(被微软收购) ， net framework关系； 

# 应用场景类

1. csharp 

2. net 

3. web :asp.net

4. workflow 工作引擎；适用于流程式，责任式，标准式业务流转；OA 处理简单的，BPM大型；概念比较模糊；
   
   Windows Workflow Foundation: net framwork的引擎；
   
   **Workflow-Core**: 轻量级
   
   elsa-core： 有界面设计器；
   
   商业版一大堆；知乎下面一大堆自卖自夸的；
   
   - Saga Transactions  分散式交易模式

5. Topshelf windows 服务简化; 

# 架构

[.NET Application Architecture - Reference Apps (github.com)](https://github.com/dotnet-architecture)

[dotnet-architecture/eShopOnWeb: 是一个示例参考应用程序，演示了Microsoft提供支持的单体架构。(github.com)](https://github.com/dotnet-architecture/eShopOnWeb)

[dodyg/practical-aspnetcore: 是ASP.NET Core的示例项目(github.com)](https://github.com/dodyg/practical-aspnetcore)

[jasontaylordev/NorthwindTraders: Northwind Traders is a sample application built using ASP.NET Core and Entity Framework Core. (github.com)](https://github.com/jasontaylordev/NorthwindTraders)

[基于.NET Core的优秀开源项目合集 (qq.com)](https://mp.weixin.qq.com/s/f24EKmjbMKoRPH_EQkmm-w)

架构示例

# 项目

github上已经有诸多模板型项目；

# 框架类

1. 微软的ORM ：EF框架

# 工具类

nuget:一个包管理库；

1. Sharprompt 交互性命令库；
2. CliWrap 
   - Airtight abstraction over `System.Diagnostics.Process` 调用其它进程执行命令；封装库
3. command_line :  命令行参数解析；
4. nsis打包工具; 开源。因为其它收费

# 建议

[编写高质量C#代码必备技巧（下） - 个人技术笔记 (aihailan.com)](https://aihailan.com/archives/2429#more-2429) 只有实际应用的时候才会体会；

# 快速开发框架

1. ASP.NET Boilerplate Project（ABP）框架： asp.net? 好像也可以 vue,angular等; 
   
   <mark>可以阅读一下文档</mark> 感觉与微软邦定很深

2. furion 这是中国的; 配合admin后台，也是差不多; 

基本都是基于web方式; 可能客户端的UI实在太差;很难做到好看; 性能可能会好;

[ABP中文文档 - 52ABP框架- 是一个.NET 快速开发平台，基于ABP+VUE或ABP+Angular的开发框架](https://www.52abp.com/Wiki/abp-cn/latest/#:~:text=ABP%E6%98%AF%E2%80%9CASP.NET%20Boilerplate,%E5%9F%BA%E7%A1%80%E6%A1%86%E6%9E%B6%E5%92%8C%E9%A1%B9%E7%9B%AE%E6%A8%A1%E6%9D%BF%E3%80%82)

# 工具

[本站千星開源項目——.NET萬能工具：Masuit.Tools_2.5.9版本發布，支持到最新.NET7_懶得勤快的博客_互聯網分享精神](https://masuit.com/55?t=vkf8ckq82wao)

一般般;
