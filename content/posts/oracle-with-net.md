+++
title = "oracle with net"
date = "2022-10-28 20:16:42"
slug = "85ef870d"
aliases = ["/2022/10_28_85ef870d.html"]
description = "整理.NET用ODP.NET连Oracle的要点：ODAC多版本冲突与policy重定向、DllPath配置和非托管DLL搜索顺序，附配置文件示例。"
[extra]
cover = "https://tva1.sinaimg.cn/large/0072Vf1pgy1foxk78xqdoj31kw0w0dzz.jpg"
+++
oracle 

ODAC  

# Oracle Data Access Components

net 程序可以通过它接入程序；但经常会出现问题；

安装文档：

[ODAC 11.2.0.1.2 Installation Instructions (oracle.com)](https://www.oracle.com/database/technologies/install-odac-112012-windows.html)

说明issue的处理：当机器上存在多个版本时，参考odp.net文档；

而且policy会重定向，而且会装进GAC;

- Consult the release notes first for any known issues or limitations.
- Check if the Oracle data access components were properly downloaded by comparing the download size to the one listed on the download page.
- If you have more than one Oracle Home installed on the same machine (e.g. Oracle 10g Release 2 client and Oracle 11g Release 2 client), by installing the Oracle 11.2.0.1 client, OUI will establish this client as the Oracle Home all your existing applications will use. For more information on using Multiple Oracle Homes, consult the [ODP.NET documentation.](https://download.oracle.com/docs/html/E15167_01/InstallODP.htm#sthref89)
- It's highly recommended that ODP.NET be installed to a new Oracle Home. Installing ODP.NET on top of an existing Oracle home may break existing Oracle applications. This installation contains ODP.NET 11.2.0.1.2 and Oracle Client 11.2.0.1. If you do install on top of an existing Oracle Home, make sure to stop all the Windows services for that Oracle Home (e.g. OracleMTSRecoveryService).
- This installation provides policy configuration files that can redirect existing 10.2 and 11.1 ODP.NET applications to the current ODP.NET version. The policy files are located in the ORACLE_HOME\odp.net\PublisherPolicy\2.x directory. In addition, the installation of ODP.NET will place ODP.NET policy DLLs into the GAC so that existing applications can start using the newly installed ODP.NET version immediately. However, if this is not desired, be sure to remove the policy DLLs from the GAC.
- Installing ODP.NET into a new Oracle Home means that you will not have access to any of the Oracle Data Source aliases from your previous installation. To be able to use these existing data source attributes, copy the tnsnames.ora file in the ORACLE_HOME\network\admin directory from your previous Oracle Home installation to the same directory in your new installation. Or you may create the connection aliases manually by following the [Connection Setup Quick Start](https://www.oracle.com/database/technologies/install-odac-112012-windows.html#setup) earlier.
- If errors indicating that "MSVCR80.dll is not found" are observed, install the Visual C++ 2005 runtime libraries.

# 下面是安装ODP文档：

[Installing Oracle Data Provider for .NET](https://docs.oracle.com/html/E15167_01/InstallODP.htm#sthref89)

大概意思是说：在net2.0中可以指定路径

## Configuration File Support

For customers who have numerous applications on a computer that depends on a single version of ODP.NET, the Windows Registry settings for a given version of ODP.NET may not necessarily be applicable for all applications that use that version of ODP.NET. To provide more granular control, ODP.NET Configuration File Support allows developers to specify ODP.NET configuration settings in an application config, `web.config`, or a `machine.config` file.

If a computer does not require granular control beyond configuration settings at the ODP.NET version level, there is no need to specify ODP.NET configuration settings through configuration files.

The following is an example of a `web.config` file for .NET Framework 2.0:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <oracle.dataaccess.client>
    <settings>
      <add name="DllPath"               value="C:\oracle\bin"/>
      <add name="FetchSize"             value="131072"/>
      <add name="PromotableTransaction" value="promotable"/>
      <add name="StatementCacheSize"    value="10"/>
      <add name="TraceFileName"         value="C:\odpnet2.trc"/>
      <add name="TraceLevel"            value="63"/>
      <add name="TraceOption"           value="1"/>
    </settings>
  </oracle.dataaccess.client>
</configuration>
```

<?xml version="1.0" encoding="utf-8" ?>

<configuration>
  <oracle.dataaccess.client>
    <settings>
      <add name="DllPath"               value="C:\oracle\bin"/>
      <add name="FetchSize"             value="131072"/>
      <add name="PromotableTransaction" value="promotable"/>
      <add name="StatementCacheSize"    value="10"/>
      <add name="TraceFileName"         value="C:\odpnet2.trc"/>
      <add name="TraceLevel"            value="63"/>
      <add name="TraceOption"           value="1"/>
    </settings>
  </oracle.dataaccess.client>
</configuration>

## Search Order for Unmanaged DLL

英语不好：简单翻译一下：

   `ODP.NET包含了托管与未托管；虽然使用dllpath配置参数进行配置，每个应用可以指定 依赖从哪个位置加载；但如果 oaclehome目录与程序所使用的版本不同，会报版本不匹配异常（是不是有点熟悉？）`

ODP.NET consists of managed and unmanaged binaries. Through the use of the `DllPath` configuration parameter, each application can specify the `ORACLE_BASE\\ORACLE_HOME``\bin` location that the dependent unmanaged Oracle Client binaries are loaded from. However, the `ORACLE_BASE\\ORACLE_HOME` must have the same ODP.NET version installed as the version that the application uses. Otherwise, a version mismatch exception is thrown.

The `Oracle.DataAccess.dll` searches for dependent unmanaged DLLs (such as Oracle Client) based on the following order:

1. Directory of the application or executable.

2. `DllPath` setting specified by application config or `web.config`.

3. `DllPath` setting specified by `machine.config`.

4. `DllPath` setting specified by the Windows Registry.
   
   `HKEY_LOCAL_ MACHINE\Software\Oracle\``ODP.NET\``version``\DllPath`

5. Directories specified by the Windows `PATH` environment variable.

The `DllPath` registry value takes effect on all supported Windows operating systems, except Windows 2000. On Windows 2000, ODP.NET relies on the application directory and Windows `PATH` for loading dependent unmanaged DLLs.

Upon installation of ODP.NET, Oracle Universal Installer sets the `DllPath` Windows Registry value to the `ORACLE_BASE\\ORACLE_HOME``\bin` directory where the corresponding dependent DLLs are installed. Developers must provide this configuration information on an application-by-application basis.

When a new ODP.NET version is installed, default values are set in the Windows Registry for the new version. Because the policy DLLs redirect all ODP.NET references to this new ODP.NET version, applications use the default values. Developers can provide a config or `web.config` file specific to the application to prevent this redirection. The configuration file settings always apply to the application, regardless of whether or not patches or new versions are installed later.

ODP.NET Configuration File Support is only available for version 10.2.0.4 and later.

[Table of Contents (oracle.com)](https://docs.oracle.com/html/E15167_01/toc.htm)

[Getting Started with ODP.Net Core (oracle.com)](https://www.oracle.com/webfolder/technetwork/tutorials/obe/db/dotnet/ODPNET_Core_get_started/index.html)



instant client 只适用于node,python 等连接；并没有net 可以用，所使用oracle,dataacess.dll是要一定要安装客户端的；

 



一些文档：

[Configuring Oracle Data Provider for .NET](https://docs.oracle.com/en/database/oracle/oracle-data-access-components/19.3/odpnt/InstallConfig.html)

[Configuring Oracle Data Provider for .NET](https://docs.oracle.com/en/database/oracle/oracle-data-access-components/19.3/odpnt/InstallConfig.html)

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
	<configSections>
		<section name="oracle.unmanageddataaccess.client" type="OracleInternal.Common.CustomSectionHandler, Oracle.DataAccess, Version=4.122.19.1, Culture=neutral, PublicKeyToken=89b483f429c47342" />
	</configSections>
	
	<startup>
		<supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.8" />
	</startup>
	<oracle.unmanageddataaccess.client>
		<settings>
			<add name="DllPath" value="C:\oracle\bin"/>
			<add name="FetchSize" value="131072"/>
			<add name="PromotableTransaction" value="promotable"/>
			<add name="StatementCacheSize" value="10"/>
			<add name="TraceFileName" value="C:\odpnet2.trc"/>
			<add name="TraceLevel" value="63"/>
			<add name="TraceOption" value="1"/>
		</settings>
	</oracle.unmanageddataaccess.client>
	
</configuration>
```
