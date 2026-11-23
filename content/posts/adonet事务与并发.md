+++
title = "adonet事务与并发"
date = "2023-05-02 22:14:32"
slug = "f37cac54"
aliases = ["/2023/05_02_f37cac54.html"]
description = "介绍ADO.NET测试开放式并发冲突的一法：表加时间戳列，查询返回时间戳，更新时比对库中时间戳与原值是否一致以判冲突，附官方文档。"
[taxonomies]
tags = ["数据访问", "c#", "dotnet"]
[extra]
cover = "https://picsum.photos/400"
+++
## 测试是否存在开放式并发冲突

测试是否存在开放式并发冲突的方法有若干种。 其中一种涉及到在表中包含时间戳列。 数据库通常会提供时间戳功能，该功能可用于标识上次更新记录的日期和时间。 当使用这种方法时，将在表定义中包含时间戳列。 每当更新记录时，时间戳都将得到更新，以反映当前的日期和时间。 在测试是否存在开放式并发冲突时，对表内容的任何查询都会返回时间戳列。 当试图执行更新时，数据库中的时间戳值将与所修改行中包含的原始时间戳值进行比较。 如果两者匹配，则会执行更新，并用当前时间更新时间戳列以反映更新。 如果两者不匹配，则发生了开放式并发冲突。



[开放式并发 - ADO.NET | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/framework/data/adonet/optimistic-concurrency)
