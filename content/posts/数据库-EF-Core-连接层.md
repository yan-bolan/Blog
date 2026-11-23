+++
title = "数据库 EF Core 连接层"
date = "2022-09-09 18:57:54"
slug = "b8fc92bb"
aliases = ["/2022/09_09_b8fc92bb.html"]
description = "整理EF Core数据库连接层入门：对比EF6与三种开发模式，介绍PMC迁移命令、Oracle工厂与连接池，并给出增删改查示例。"
[taxonomies]
tags = ["ef", "c#", "oracle"]
+++
[EF框架概念及三种模式 - 吾蒸笼 - 博客园](https://www.cnblogs.com/wuzhenglong/p/6477366.html)

1. 了解EF 
   
   EF 6 ([深入了解Entity Framework框架及访问数据的几种方式 - Crazy Struggle - 博客园](https://www.cnblogs.com/1312mn/p/9239419.html))
   
   EF Core (见官网：好像是Model first 的教程)
   
   一个NET. frameWork
   
   一个Core
   
   对于三种方式：无论哪种，都要备份数据库（你有把握可以不备份，或者你选择不影响数据库的方式下动作）；优先是通过代码改数据库结构的；（而你数据库权限又大，删库跑路）
   
   了解一下这些名词；以及微软（生态太差了；全是英文）

2. 入门
   
   [入门 - EF Core | Microsoft Docs](https://docs.microsoft.com/zh-cn/ef/core/get-started/overview/first-app?tabs=visual-studio)
   
   EF core是 基于命令行的；
   
   在 visual studio 在package console 操作；
   
   Install-Package Microsoft.EntityFrameworkCore.Tools ： [EF Core 的 PMC 工具](https://docs.microsoft.com/zh-cn/ef/core/cli/powershell)用于操作 ： add migration ,remove migration 等；
   
   ```powershell
   Get-Help about_EntityFrameworkCore -- 得到一切
   ```
   
    migration：指：？

# 示例

## oracle

### Factory

工厂和连接池可以减少访问；

对业务访问量小的就不用考虑了；

如果你业务有不同数据库的考虑就使用工厂模式读取配置这个方式；

[OracleClientFactory Class](https://docs.oracle.com/database/121/ODPNT/OracleClientFactoryClass.htm#ODPNT2638)

```csharp
// C#

using System;
using System.Data;
using System.Data.Common;
using Oracle.DataAccess.Client;

class FactorySample
{
  static void Main()
  {
    string constr = "user id=scott;password=tiger;data source=oracle";

    DbProviderFactory factory =
            DbProviderFactories.GetFactory("Oracle.DataAccess.Client");

    DbConnection conn = factory.CreateConnection();

    try
    {
      conn.ConnectionString = constr;
      conn.Open();

      DbCommand cmd = factory.CreateCommand();
      cmd.Connection = conn;
      cmd.CommandText = "select * from emp";

      DbDataReader reader = cmd.ExecuteReader();
      while (reader.Read())
        Console.WriteLine(reader["EMPNO"] + " : " + reader["ENAME"]);
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
      Console.WriteLine(ex.StackTrace);
    }
  }
}
```

### 使用

见官网教程；

1. 配置这块：使用appsettings.json; 这个文件要设置成在build 会copy to output dir; 不然build后没有这个文件；

```json
{
  "BlogCateLog": "H:\ \\YuriBlog",
  "editor": "C:\\Program Files\\MarkText\\MarkText.exe",
  "Connstr": "Data Source =",
  //"NpgsqlConnstr": "Data Source = postgres://postgres:postgrespw@localhost:55000"
  "NpgsqlConnstr": "Server=127.0.0.1;Port=55000;Database=postgres;User Id=postgres;Password=postgrespw;"
} 
```

2. Model类这块：
   
   我设计了从配置文件里读入连接字符串；建议使用依赖注入模式；
   
   ```csharp
     public BloggingContext()
           {
               var folder = Environment.SpecialFolder.LocalApplicationData;
               var path = Environment.GetFolderPath(folder);
               DbPath = System.IO.Path.Join(path, "blogging.db");
               MyService myService = ServiceProviderFactory.ServiceProvider.GetRequiredService<MyService>();
               Connstr = myService.getConnstr("NpgsqlConnstr");
               //Connstr = myService.getConnstr("Connstr");
           }
   
           // The following configures EF to create a Sqlite database file in the
           // special "local" folder for your platform.
           protected override void OnConfiguring(DbContextOptionsBuilder options)
               => options.UseNpgsql(Connstr);
           //=> options.UseOracle(Connstr);
           //=> options.UseOracle($"Data Source={DbPath}");
   
           //https://docs.microsoft.com/zh-cn/ef/core/cli/powershell
       }
   ```

3. 访问操作：
   
   1. 业务架构简单的，需求，稳定性的；使用实体型；
      
      即使用 orm操作对象；orm已经在安全性方面有了准备（sql注入）；
      
      [DbContext Lifetime, Configuration, and Initialization - EF Core | Microsoft Docs](https://docs.microsoft.com/en-us/ef/core/dbcontext-configuration/)了解；如果与外界隔离无视安全的；可以自实现；写原生sql的好处；业务及性能及维运都有好处，程式也会简洁；
      
      其实只有最适合的；只不是把工作转嫁到了另一方面；
   
   2. raw sql 写原生sql；如果两种方式都想实现的话；使用[Executing Raw SQL Queries using Entity Framework Core | Learn Entity Framework Core](https://www.learnentityframeworkcore.com/raw-sql) 
      
      ```csharp
          //主要是从database拿到连接执行sql
          #region rawsql
                  //db.Database.ExecuteSqlRaw("sql"  );
                  //db.Blogs.FromSqlRaw();//https://www.learnentityframeworkcore.com/raw-sql
                  //db.Database.GetDbConnection().CreateCommand();
                  #endregion
      ```

            不建议同一业务内两种模式；因为同一业务可能是逻辑差不多的，两个就得两种维护；

## 更换数据库

1. <mark>先add migration 或者删除旧的remove migration 等；不然不同的数据库生成的sql无法执行的问题；</mark>
   
   如pg 到oracle  ：删除旧的migratin文件；

# 了解底层转换原理

由于数据库与语言有差异；在转换的时候可能并不是你要的结果；

如在Linq时：null 如何判定？where等值对null的处理;？

以及一些数据库有特别的类型；





# 操作

[Entity Framework 多種刪除 | 我，傑夫。開發人 (wordpress.com)](https://jeffprogrammer.wordpress.com/2016/12/06/entity-framework-%E5%A4%9A%E7%A8%AE%E5%88%AA%E9%99%A4/)



第一個是常見的寫法：

### Remove()

| 1<br><br>2<br><br>3 | `TestModel` `object` `= context.TestModel.Single(x => x.Name ==` `"John"``);`<br><br>`context.TestModel.Remove(``object``);`<br><br>`context.SaveChanges();` |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |

.  
第二個方式是改變 EntityState 狀態：

### EntityState.Deleted

| 1<br><br>2<br><br>3 | `TestModel` `object` `= context.TestModel.Single(x => x.Name ==` `"John"``);`<br><br>`context.Entry(``object``).State = EntityState.Deleted;`<br><br>`context.SaveChanges();` |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

.  
或者使用套件 **[Entity Framework Extended Library](https://github.com/loresoft/EntityFramework.Extended)**。就可以使用以下的寫法來刪除資料。<mark> 要安装库啊</mark>

### Delete()

| 1   | `context.TestModel.Delete(x => x.Id == ID);` |
| --- | -------------------------------------------- |

或是

| 1   | `context.TestModel.Where(x => x.Id == ID).Delete();` |
| --- | ---------------------------------------------------- |



[c# - Delete a single record from Entity Framework? - Stack Overflow](https://stackoverflow.com/questions/17723276/delete-a-single-record-from-entity-framework)





```csharp
RemoveRange 移除多个1- For multiple records
```



```javascript
db.People.RemoveRange(db.People.Where(x => x.State == "CA"));
db.SaveChanges();
```

```csharp
context.ExecuteStoreCommand("DELETE FROM YOURTABLE WHERE CustomerID = {0}", customerId);
```
