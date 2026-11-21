+++
title = "web.config aspnet sqlite realtive path"
date = "2022-09-04 10:49:04"
slug = "7568c82b"
aliases = ["/2022/09_04_7568c82b.html"]
+++
sqlite csharp 使用相对路径

By default, the **|DataDirectory|** variable will be expanded as follow:

- For applications placed in a directory on the user machine, this will be the app's (.exe) folder.
- For apps running under ClickOnce, this will be a special data folder created by ClickOnce
- For Web apps, this will be the App_Data folder

Under the hood, the value for **|DataDirectory|** simply comes from a property on the app domain. It is possible to change that value and override the default behavior by doing this:

```sql
AppDomain.CurrentDomain.SetData("DataDirectory", newpath)
```

[referencesource/DbConnectionOptions.cs at e458f8df6ded689323d4bd1a2a725ad32668aaec · microsoft/referencesource (github.com)](https://github.com/Microsoft/referencesource/blob/e458f8df6ded689323d4bd1a2a725ad32668aaec/System.Data.Entity/System/Data/EntityClient/DbConnectionOptions.cs)

### 方案一：

```bash
<add name="SQLiteDB" connectionString="data source = |DataDirectory|KeRi.db" providerName="System.Data.SqlClient"/>
```

使用csahrp 官方的system.data.sqlite 库； 可以识别connectionString中的|DataDirectory| pattern; 



### 方案二：按自己需求处理；

web.config档案：

```bash
<add name="SQLiteDB" connectionString="data source = KeRi.db" providerName="System.Data.SqlClient"/>
<appSettings>
		<add key="Relative" value="false"/>
		<!-- sqlite path use Relative-->

	</appSettings>
```



```csharp

            string cate =  System.Web.Configuration.WebConfigurationManager.AppSettings["Relative"].ToString();
            connectionString = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["SQLiteDB"].ToString();

            if (!Convert.ToBoolean(cate))
            {// Relative path
                get_connstr( );
            }

            

            public void get_connstr() {
            var builder = new SQLiteConnectionStringBuilder(connectionString);
            builder.DataSource = Path.GetFullPath(
                Path.Combine(
                     File.Exists(AppDomain.CurrentDomain.GetData("DataDirectory") as string) ? AppDomain.CurrentDomain.GetData("DataDirectory") as string 
                        ?? AppDomain.CurrentDomain.BaseDirectory : AppDomain.CurrentDomain.BaseDirectory,
                    builder.DataSource));// 构造路径； 如果不存在，使用基本路径；
            connectionString = builder.ToString();
        }
```



---

log4net 配置 sqlite 路径；

用DataDirectory 看否能配置log4net;

相对路径不起作用；

 ![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo20220904120526.png)
