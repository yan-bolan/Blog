+++
title = "RDLC教程"
date = "2023-03-29 21:37:07"
slug = "7f6e80f3"
aliases = ["/2023/03_29_7f6e80f3.html"]
[taxonomies]
tags = ["RDLC"]
[extra]
cover = "https://picsum.photos/400"
+++
1. 安装nuget和扩展;

2. 新建项目类型：要选Report项目

3. 打开Tool添加 

# 群组

只显示一行的问题？

[Get started with Report Viewer controls - SQL Server Reporting Services (SSRS) | Microsoft Learn](https://learn.microsoft.com/en-us/sql/reporting-services/application-integration/integrating-reporting-services-using-reportviewer-controls-get-started?view=sql-server-ver16)

Microsoft.ReportViewer.Runtime.Common ：2015?

Microsoft.ReportViewer.Common:2010?

Microsoft.ReportViewer.WebForms:2010? winfom

Microsoft.ReportingServices.ReportViewerControl.WebForms:asp.net & webfrom?

- 一些问题

[部署C# ReportViewer遇到的坑 - 从未被超越 - 博客园 (cnblogs.com)](https://www.cnblogs.com/zxtceq/p/8302390.html)

# 概念

Redistributable 的意思是允许任意分发给他人。。
Redistributable 为没有安装 Visual Studio 的电脑安装 runtime 环境，使得能在其上运行 Visual Studio 编写的程序。

简单来说，Redistributable 包含 runtime， 所以需要某一runtime环境的时候，装 Redistributable 就好了。

————————————————
版权声明：本文为CSDN博主「slowlight93」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/slowlight93/article/details/42970223

# 官方预览版频道

**Preview Release Candidate Builds** If you'd like to have early access to release candidate builds before they are published to the VS Gallery, we’re making available to give customers an opportunity to provide feedback prior to finalizing releases. To access the release candidate of the extensions in Visual Studio, you may do so by creating a “private gallery” and entering the following settings.

- Navigate to Tools > Options and then select Extensions and Updates under General.
- Under "Additional Extension Galleries", enter the following details:
- Name: Microsoft BI VSIX Preview
- URL: http://aka.ms/VSIX2022

After entering these settings, your "Extensions and Updates" dialog will show updates for the extension when there is a new release candidate that you can install to provide feedback for a day or two before the VS Gallery VSIX is updated.

![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16808777315391680877730682.png)

[Get started with Report Viewer controls - SQL Server Reporting Services (SSRS) | Microsoft Learn](https://learn.microsoft.com/en-us/sql/reporting-services/application-integration/integrating-reporting-services-using-reportviewer-controls-get-started?view=sql-server-ver16)

1. ```
   Install-Package Microsoft.ReportingServices.ReportViewerControl.WebForms
   ```

2. 

# 异常

system.data.design.internalexception

因为没装ManagedDataAccess 包：nuget 驱动包

          <Connection AppSettingsObjectName="Web.config" AppSettingsPropertyName="ConnectionString" ConnectionStringObject="" IsAppSettingsProperty="true" Modifier="Assembly" Name="ConnectionString (Web.config)" ParameterPrefix=":" PropertyReference="AppConfig.System.Configuration.ConfigurationManager.0.ConnectionStrings.ConnectionString.ConnectionString" Provider="Oracle.ManagedDataAccess.Client" />

> 它需要连我的数据库？？

1.Microsoft.ReportingServices.ReportViewerControrol.webforms:用于aspx的控件; SQL Server Reporting Services

2.Oracle.ManagedDataAccess:用于xsd文件数据库代码生成;

3. 关闭专案，重新打开aspx: 不然一直显示创建失败;

# [报表查看器控件 （Visual Studio） |微软学习 (microsoft.com)](https://learn.microsoft.com/en-us/previous-versions/ms251671(v=vs.140))

分服务端（server）？ 和客户端;

RDL: 

RDLC: 客户端

# git 反一些文件

有问题；只能nuget全部重新安装一遍。。。。。

# 

- A data source instance has not been supplied for the data source 'DataSet1'.

# 数据源

设置数据源ID:ObjectDataSource

SelectMethod: xsd文件中查询方法：可以自定义查询方法

```xml
      <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" BackColor="" InternalBorderStyle="Solid" InternalBorderColor="204, 204, 204" InternalBorderWidth="1px" ToolBarItemBorderStyle="Solid" ToolbarDividerColor="" ToolBarItemBorderColor="" ToolBarItemBorderWidth="1px" ToolBarItemPressedBorderStyle="Solid" ToolBarItemPressedBorderColor="51, 102, 153" ToolBarItemPressedBorderWidth="1px" ToolbarHoverBackgroundColor="" ToolBarItemHoverBackColor="" HighlightBackgroundColor="" ToolBarItemPressedHoverBackColor="153, 187, 226" SplitterBackColor="" ToolbarForegroundDisabledColor="" LinkDisabledColor="" ToolbarForegroundColor="" LinkActiveColor="" ToolbarHoverForegroundColor="" LinkActiveHoverColor="" PrimaryButtonBackgroundColor="" PrimaryButtonForegroundColor="" PrimaryButtonHoverBackgroundColor="" PrimaryButtonHoverForegroundColor="" SecondaryButtonBackgroundColor="" SecondaryButtonForegroundColor="" SecondaryButtonHoverBackgroundColor="" SecondaryButtonHoverForegroundColor="" ClientIDMode="AutoID">
            <LocalReport ReportPath="report1.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource Name="DataSet1" DataSourceId="ObjectDataSource1"></rsweb:ReportDataSource>
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asphttps://c-sharpcorner.com/UploadFile/a72401/rdlc-report-generation-using-dataset/:ObjectDataSource runat="server" SelectMethod="GetData" TypeName="DataSetTableAdapters.BPM_PROC_PARAMTableAdapter" ID="ObjectDataSource1"></asp:ObjectDataSource>
```

![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16809166895251680916688668.png)

[RDLC Report Generation using Dataset](https://c-sharpcorner.com/UploadFile/a72401/rdlc-report-generation-using-dataset/)[RDLC Report Generation using Dataset](https://c-sharpcorner.com/UploadFile/a72401/rdlc-report-generation-using-dataset/)

![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16809192765371680919275852.png)

![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16809193245821680919324558.png)

# ![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/16809201955261680920194984.png)

2015没有问题 选择数据源 ;

还是用vs2010吧;浪费时间; 都不更新了;或者用收费的;

# 

# 样式：
