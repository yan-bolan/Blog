+++
title = "RDLC滑动条无法滑动"
date = "2023-07-09 12:32:02"
slug = "90e9277b"
aliases = ["/2023/07_09_90e9277b.html"]
description = "排查RDLC滑动条无法滑动：VS2019打开旧rdlc报定义无效，按参考修复并拖动table居中后恢复滑动，但竖向到底后横向仍不能滑，未彻底解决。"
[taxonomies]
tags = ["rdlc"]
[extra]
cover = "https://picsum.photos/400"
+++
使用vs2019打开rdlc文件，将rdlc的table拖动居中;

保存;

保存后发现：打不开 

[VS2019使用旧版RDLC报错解决办法。The definition of this report is not valid or supported..._vs添加rdlc失败_灰机大大的博客-CSDN博客](https://blog.csdn.net/hangsky1990/article/details/120781662)

修改之后;就可以滑动了？？？对比了下文件：

```xml
<?xml version="1.0" encoding="utf-8"?>
<Report xmlns="http://schemas.microsoft.com/sqlserver/reporting/2008/01/reportdefinition" xmlns:rd="http://schemas.microsoft.com/SQLServer/reporting/reportdesigner">
  <AutoRefresh>0</AutoRefresh>--多了这行代码,应该是第一次就显示表头
```

```xml
  <DataSets>
    <DataSet Name="DataSet1">
      <Query> --这个提前了，没什么区别
        <DataSourceName>CimClient</DataSourceName>
        <CommandText>/* Local Query */</CommandText>
      </Query>
      <Fields>
```

删掉了这些

```xml
  <ReportParameters>
    <ReportParameter Name="HttpUrl">
      <DataType>String</DataType>
      <Prompt>ReportParameter1</Prompt>
    </ReportParameter>
  </ReportParameters>
  <Width>30.83442in</Width>

  <rd:ReportID>adaef6f4-9bc8-428a-9e34-647177f11c89</rd:ReportID>
  <rd:ReportUnitType>Cm</rd:ReportUnitType>
```

分析：应该是拖动table居中解决了问题？？？

重新试了一遍：确实是居中

但竖向的滑动条滑动到底部后，横向又滑动不了
