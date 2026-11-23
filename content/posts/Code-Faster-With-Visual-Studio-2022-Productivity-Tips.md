+++
title = "Code-Faster-With-Visual-Studio-2022-Productivity-Tips"
date = "2022-09-09 11:33:44"
slug = "5a28305f"
aliases = ["/2022/09_09_5a28305f.html"]
description = "Visual Studio 2022效率技巧：清理命名空间与格式化快捷键、ctor和prop片段、Immediate窗口、交互式REPL及JSON粘贴生成类。"
[taxonomies]
tags = ["visual studio", "快捷键", "c#"]
+++
1. unused namespaces : delete;
   
   press ctrl+k+e

2. allign code:   ctrl +k + D ; 选中或者不选中

3. TODO关键字

4. summary :type /// enter

5. Constructor: ctor +tab

6. property:  prop +tab

7. Constructor  initialized some property：选中属性；buld suggestion 灯泡建议生成；

8. auto genarate property by constructor args;

### Immediate window

这个好用；

当函数没有接受返回值时；可以使用returnvalue 查看刚才返回的是什么；

pre build 预构建事件；

[Visual Studio中，你应该知道的几个Immediate Window小技巧 - Fintech技术汇 - 博客园 (cnblogs.com)](https://www.cnblogs.com/dereklovecc/p/13437195.html)

### interactive 交互式窗口；

学习csahrp ；可以琢句执行；像python 一样；

互式执行环境 (REPL) [C# 交互式执行环境 (REPL) (zzz.buzz)](https://zzz.buzz/zh/2016/08/14/c-sharp-interactive-repl/)

## 其它

enum可以与switch 使用；

新语法特性中：根据enum快捷生成switch 好用；

```csharp

```

ctrl k ctrl x 代码片段选择

shift esc 关闭窗口 





# 代码生成

在Visual studio 2022里可以edit > paste 将json 转换为class

![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16791204682901679120467450.png)
