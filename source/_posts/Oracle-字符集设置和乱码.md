---
title: Oracle_字符集设置和乱码
cover: 'https://api.isoyu.com/bing_images.php'
tags: oraclecharset
abbrlink: e209ee18
date: 2023-03-10 20:19:58
---

# 服务端：

使用sql语句;

# 客户端

     1)UNIX环境  
         $NLS_LANG=“simplified chinese”_china.zhs16gbk  
         $export NLS_LANG  
         编辑oracle用户的profile文件  
    2)Windows环境  
         编辑注册表  
         Regedit.exe ---》 HKEY_LOCAL_MACHINE ---》SOFTWARE ---》 ORACLE-HOME

       set nls_lang=AMERICAN_AMERICA.ZHS16GBK

---

如果无法更改客户端环境;

如net: 可以使用重新命名的方式;

暂时没找到可以通过连接字符串或者配置的文件进行修改;

乱码是两个不匹配;

---

Try adding "unicode=true" to the connection string. When unicode flag is set, Microsoft Data Provider for Oracle will use UTF16 mode when making API calls.

[OracleConnection.ConnectionString Property (System.Data.OracleClient) | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/api/system.data.oracleclient.oracleconnection.connectionstring?view=netframework-4.8.1)

在system.data.oracle是可以的;

| Unicode | 'false' | Specifies whether the .NET Framework Data Provider for Oracle uses UTF16 mode API calls. This keyword is ignored except when using Oracle9i client software. |
| ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |

试试unicode= true;

在其它像oracle官方提供的托管manage就不可以;

[Oracle connection strings - ConnectionStrings.com](https://www.connectionstrings.com/oracle/)

[ADO,OLEDB,ODBC,DAO的区别 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1392805#:~:text=OLE%20DB%20%E6%98%AF%E5%BB%BA%E7%AB%8B%E5%9C%A8,%E4%BB%A5%E5%8F%8A%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%9A%E5%8A%A1%E5%AF%B9%E8%B1%A1%E3%80%82)

![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/16784536598591678453659003.png)

![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/16784538493111678453848595.png)

[架構 - ADO.NET | Microsoft Learn](https://learn.microsoft.com/zh-tw/dotnet/framework/data/adonet/ado-net-architecture?source=recommendations)

[Using the Oracle ODBC Driver](https://docs.oracle.com/database/121/ADFNS/adfns_odbc.htm#ADFNS1136)

DO和DAO的最大区别是ADO使用OLEDB接口而非ODBC作为底层数据供应者的。依靠OLEDB，ADO也能够支持对非SQL数据存储的纪录集访问，如

总结：ODBC 和 OLE DB是底层API接口，DAO、RDO、ADO、ADO.NET是高级接口。~~~~

---

待学习：

这些底层库架构与方法学习
