---
title: net_using_找不到
tags:
  - csharp
  - net
  - using
  - 依赖
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
abbrlink: fdb6fcb9
date: 2023-10-09 20:42:10
---

报错：

using directive is unnecessary the type or namespace cannot be found



参考方法：

[Compiler Error CS0246 - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/cs0246)

我的属于：

- Did you reference the assembly that was built against a higher framework version than the target framework of the program? Or did you reference the project that is targeting a higher framework version than the target framework of the program? For example, you work on the project that is targeting .NET Framework 4.6.1 and use the type from the project that is targeting .NET Framework 4.7.1. Then you get error CS0246.

- 引用的程序集是否针对比程序的目标框架版本更高的框架版本而生成？ 或者，引用的项目所面向的框架版本是否高于程序的目标框架版本？ 例如，你在处理面向 .NET Framework 4.6.1 的项目，但使用的是面向 .NET Framework 4.7.1 的项目中的类型。 这样就显示错误 CS0246。
  
  

我这里有一个警告：

因為它在架構組件 "System.Net.Http, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" 上有間接相依性，但此組件無法在目前設為目標的架構中解析。".NETFramework,Version=v4.0"。若要解決此問題，請移除參考 "com.x.x, Version=3.1.2.3, Culture=neutral, processorArchitecture=MSIL"，或將應用程式的目標重定為包含 "System.Net.Http, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" 的架構版本。



>  意思是这个x.x组件有依赖system.net.http, 而当前是net 4.0。方法是删除此依赖或改到包括system.net.http 2.0的版本;



我这里将net 4.0改成4.5，然后重新删除依赖，再添加。



思考：

1. 本机是vs2019 是 net 4.0同样的代码拷贝到别一台机器，用vs2022打开报这样的问题？感觉是与机子环境有关？有什么办法打印祥细的MSBuild log? 找到一些蛛丝马迹？

2. 有一些则是将bin文件重新添加进专案即可？



```bash
msbuild -v:diag xx.cspoj
```

-verbosity:`level`

[MSBuild Command-Line Reference - MSBuild | Microsoft Learn](https://learn.microsoft.com/en-us/visualstudio/msbuild/msbuild-command-line-reference?view=vs-2022)



从输出的结果看：看不懂。下面是能正常运行找到的。

```cmd
 C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.0\System.Net.Http.dll
                  CopyLocal=false
                  FrameworkFile=true
                  FusionName=System.Net.Http, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a
                  HintPath=..\packages\com.innolux.extens.3.1.2.3\lib\com.innolux.extens.dll
                  ImageRuntime=v4.0.30319
                  OriginalItemSpec=com.innolux.extens, Version=3.1.2.3, Culture=neutral, processorArchitecture=MSIL
                  Private=True
                  ReferenceSourceTarget=ResolveAssemblyReference
                  ResolvedFrom={TargetFrameworkDirectory}
                  Version=2.0.0.0
```

可能是环境安装了什么

另一台机子则没有什么有用的信息

```cmd
ram Files\Microsoft Visual Studio\2022\Professional\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets(2302,5): warning MSB3268: 無法解析主要參考
```
