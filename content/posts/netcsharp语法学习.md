+++
title = "netcsharp语法学习"
date = "2022-11-12 17:59:20"
slug = "69d0b943"
aliases = ["/2022/11_12_69d0b943.html"]
description = "按版本梳理C#新语法：lambda与委托、switch模式匹配、is/not/and/or、空值运算符、var、init属性与record，附官方示例与建议。"
[taxonomies]
tags = ["c#"]
[extra]
cover = "https://tva3.sinaimg.cn/large/0072Vf1pgy1foxk6u83cvj31hc0u0wxh.jpg"
+++
> 没想到大学写的定理，明了的概括了例子; 评论也好，知识量也足, 没想有大学时随便写的东西，比工作后还要好，工作后真的只是为了工作，只是简单记录;

一步一步了解csharp语言增加的功能

[C# 发展历史 - C# 指南 | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-version-history)

记录写法

1. fun ，lamba，委托
   
   ```csharp
    var x = () => {// lamba函数
      return   "test";//写一些策略逻辑
    };
    Console.WriteLine(x());
   ```

2. swtich 新特性
   
   这个还是挺有好用;像kotlin语言在这一块就很好;
   
   8.0 就开始了
   
   - [模式匹配增强功能](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-8#more-patterns-in-more-places)：
     - [Switch 表达式](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-8#switch-expressions)
     - [属性模式](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-8#property-patterns)
     - [元组模式](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-8#tuple-patterns)
     - [位置模式](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-8#positional-patterns)
   
   [C# 9.0 新特性 (zzonn.com)](https://www.zzonn.com/archives/c90%E6%96%B0%E7%89%B9%E6%80%A7)

```csharp
//csharp version 7.0
    var exp = "obj";//通过值相等匹配
            var b = exp switch
            {
                "" => "retu",//只能返回语句
                _ => "thow"

            };
            Console.WriteLine(b);
```

```csharp
//csharp version 9.0 
var exp2 = 3;

var exp2 = 3;
var c = exp2 switch
{
    < 0 => "retu",//关系比较
    3 => "equal3",
    >4 or <3 => "",//逻辑比较 直接 比较符; and or is not 是9.0中增加可读性而已
    _ => "thow"

};
System.Console.WriteLine(c);
```

```csharp
// 上面是属于值比对，下面是对属性条件
var exp3 = "i am  a string ";
var d = exp3 switch
{
     string e when e.Length>3 => "bigger than 3" , // 定义 e的类型为字符串，与 exp3的类型一致， when 后面写逻辑表达式true 与false; 这样可以拿到 e类的属性进行判断;
    string e when 4 > exp2 => "bigger than 3" , // 定义 e的类型为字符串，与 exp3的类型一致， when 后面写逻辑表达式true 与false; 这样可以拿到 e类的属性进行判断;
    string e when false => "", // 类作sql case when then 语句; 如果没有用到string e可以省略掉吗？
     _ => "no match item"
};
System.Console.WriteLine(d);
```

但这个有个问题，原先switch是可以写{}语句的，现在不行！！使用委托方法进行返回？？？

```csharp
switch switch (switch_on)
{
    case "":
    {
        // 多行语句, 
    }
    break;
    default:
    break;
}


var exp3 = "i am  a string ";
// Func<int, int, int> sum = delegate (int a, int b) { return a + b; }; 简写成下面的; 
var sum =  (int a, int b) =>  (a + b).ToString() ;// 先写好委托逻辑，有点像设计模式中的策略模式
var d = exp3 switch
{
    string e when e.Length > 3 => "bigger than 3", // 定义 e的类型为字符串，与 exp3的类型一致， when 后面写逻辑表达式true 与false; 这样可以拿到 e类的属性进行判断;
     string e when false => sum(1,2) ,//调用方法，使其返回一个字符串 匿名方法？？
    _ => "no match item"
};
```

3. 

4. is not and or 增加易读性，if 语句缩短

5. 非空检查，空判断
   
   这个经常有

```csharp
        string n = null;
 void test(string testnullcheck!){// csharp version 11.0中才有
//这个加叹号会抛出异常，如里参数为空的话
   //如果参数不通过，则抛出相应的业务异常，而不是 ArgumentNullException。
        // 所以这个可能用不到     
 } 
```

 还有？？?. 像kotlin中会有这种语法糖，比较好用; 如里为空则不执行后续的;

问号运算符使用大全见：

[C#中 ??、 ?、 ?: 、?.、?[ ] 问号 - 幽冥狂_七 - 博客园 (cnblogs.com)](https://www.cnblogs.com/youmingkuang/p/11459615.html)

>  NULL检查运算符（?.） 这个不太建议用，因为即使返回null，和报错是不同的逻辑处理，因为一此人将null与“无记录”作为同一种情况这样的错误;

6. 类型推导：var 
   
   建议多使用这个，var， 在写代码时，这个变量的类型可能一直在改，用var就不用去声明的时候进行改了;
   
   ```csharp
   string  person = null ?? "customer"; // C# 9  
   System.Console.WriteLine(person);  
   
   // 可空类型，0 和 null 都可以隐式转换为 int? 类型  
   int? result = b=="" ? 0 : (int?)null; // C# 9 之前  
    result = b=="" ? 0 : null; // C#  这
    System.Console.WriteLine(result);
   ```
   
   7. Init-only 属性
   
   8. 记录 (Record)
      
      做过财务系统的人都知道交易记录一旦入账是不能修改的，如果录入错误，就要新录入一笔负的记录把之前的红冲掉，再录入正确的记录。
      
      使用data关键字
      
      ```csharp
      public data class Foo  
      {  
          public string PropA { get; init; }  
          public string PropB { get; init; }  
      }
       //上面的太麻烦了，可以这样简写
      public data class Foo  
      {  
          string PropA;  
          string PropB;  
      }
      ```
      
      9. with 表达式
         
         当处理不可变数据时，若要生成不同的状态，一个常见的场景是在一条旧记录基础上拷贝一条新的记录。比如我们要修改 Foo 对象的 PropA 属性，我们就要拷贝该对象生成一个新的对象。这个操作在函数式编程中被称为“非破坏性修改 (non-destructive mutation)”。
      
      10. Lambda弃元参数
          
          弃元用 _ (下划线) 表示，下划线是一个关键字，只能赋值，不能读取，
      
      11. 使用新语法提升 if 语句美感
          
          这个有用！！
          
          属性模式
          
          IsNullOrEmpty 好像也不见得不好吧，而且字符串有空白的也判断不了; 其它的场景可能有用：比如对这个对象的多个属性进行判断，这样判断的长度会断点，但 多个对象判断呢？没有简化
          
          ```csharp
          // 旧的方式  
          if (!string.IsNullOrEmpty(hello))  
          {  
              Console.WriteLine($"{hello} has {hello.Length} letters.");  
          }  
          
          // 新的方式  
          if (hello is { Length: >0 })  
          {  
              Console.WriteLine($"{hello} has {hello.Length} letter
          
          s.");  
          
          }
          if (hello is { Length: >0 })    and       {Length: >2} ){}
          // 这个省下hello
          //说得对
          //之前很多人不解 C# 9.0 为什么要引入 or 、and 逻辑关键字，通过这个示例就一目了然了。
          // 新的方式  
          if (userInput.KeyChar is 'Y' or 'y')  
          {  
              Console.WriteLine("Do something.");  
          }
          ```



# 协变和逆变 (C#)

在 C# 中，协变和逆变能够实现数组类型、委托类型和泛型类型参数的隐式引用转换。 协变保留分配兼容性，逆变则与之相反。

同类相似;





## C# 4.0 版

C# 版本 4.0 随 Visual Studio 2010 一起发布，很难达到版本 3.0 的创新水平。 在 3.0 版中，C# 已经完全从 Java 的阴影中脱颖而出，崭露头角。 很快成为一种简洁精炼的语言。

下一版本引入了一些有趣的新功能：

- [动态绑定](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/reference-types)
- [命名参数/可选参数](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/named-and-optional-arguments)
- [泛型协变和逆变](https://learn.microsoft.com/zh-cn/dotnet/standard/generics/covariance-and-contravariance)
- [嵌入的互操作类型](https://learn.microsoft.com/zh-cn/dotnet/framework/interop/type-equivalence-and-embedded-interop-types)

嵌入式互操作类型缓解了为应用程序创建 COM 互操作程序集的部署难题。 泛型协变和逆变提供了更强的功能来使用泛型，但风格比较偏学术，应该最受框架和库创建者的喜爱。 命名参数和可选参数帮助消除了很多方法重载，让使用更方便。 但是这些功能都没有完全改变模式。

主要功能是引入 `dynamic` 关键字。 在 C# 4.0 版中引入 `dynamic` 关键字让用户可以替代编译时类型上的编译器。 通过使用 dynamic 关键字，可以创建和动态类型语言（例如 JavaScript）类似的构造。 可以创建 `dynamic x = "a string"` 再向它添加六个，然后让运行时理清下一步操作。

<mark>动态绑定存在出错的可能性，不过同时也为你提供了强大的语言功能。</mark>

确定，如果你看过一些生产事故报告，就会发现，动态绑定有着不可预估的风险的存在;能让静态编译时确定的事情会比较好;





## C# 5.0 版

C# 版本 5.0 随 Visual Studio 2012 一起发布，是该语言有针对性的一个版本。 对此版本中所做的几乎所有工作都归入另一个突破性语言概念：适用于异步编程的 `async` 和 `await` 模型。 下面是主要功能列表：

- [异步成员](https://learn.microsoft.com/zh-cn/dotnet/csharp/async)
- [调用方信息特性](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/attributes/caller-information)

### [](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-version-history#see-also)另请参阅

- [代码工程：C# 5.0 中的调用方信息属性](https://www.codeproject.com/Tips/606379/Caller-Info-Attributes-in-Csharp)

调用方信息特性让你可以轻松检索上下文的信息，不需要采用大量样本反射代码。 这在诊断和日志记录任务中也很有用。

但是 `async` 和 `await` 才是此版本真正的主角。 C# 在 2012 年推出这些功能时，将异步引入语言作为最重要的组成部分，另现状大为改观。 如果你以前处理过冗长的运行操作以及实现回调的 Web，应该会爱上这项语言功能。

这个是状态机的实现，算不算异步呢？应该先了解thread线程，多线程多进程怎么写，再来这个;



## C# 7.0 版

C# 7.0 版已与 Visual Studio 2017 一起发布。 虽然该版本继承和发展了 C# 6.0，但不包含编译器即服务。 以下介绍了部分新增功能：

- out 变量
- [元组和析构函数](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/value-tuples)
- [模式匹配](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/functional/pattern-matching)
- [本地函数](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/local-functions)
- [已扩展 expression bodied 成员](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members)
- [ref 局部变量](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/declarations#ref-locals)
- [引用返回](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/jump-statements#ref-returns)

其他功能包括：

- [弃元](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/functional/discards)
- 二进制文本和数字分隔符
- [引发表达式](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/throw#the-throw-expression)

这些都为开发者提供了很棒的新功能，帮助编写比以往任何时候都简洁的代码。 重点是缩减了使用 `out` 关键字的变量声明，并通过元组实现了多个返回值。

但 C# 的用途更加广泛了。 .NET Core 现在面向所有操作系统，着眼于云和可移植性。 语言设计者除了推出新功能外，也会在这些新功能方面付出时间和精力。



本地函数;其实在其它语言是内部类，方法的一种吧;

可以先委托声明，再进行指定委托;





教程只有官方文档！！; ne在国内真是少之又少

[教程：使用模式匹配构建算法 | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/tutorials/pattern-matching)



上面官方教程例子这个分析有点意思：通过状态机来例举离散条件所要收敛的结果;

 所以要想一口气呵成代码，还得先多分析再下笔
