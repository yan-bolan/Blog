+++
title = "csharp_语法点训练_记录"
date = "2022-09-16 21:26:55"
slug = "543ae1d7"
aliases = ["/2022/09_16_543ae1d7.html"]
+++
# 委托

有什么用？

变量：数据；

方法：行为；

# delegate

委托需要声明委托，实例化委托，调用委托三个步骤；

函数可以使用匿名函数：毕竟

# action 和fun

泛型有关；

```csharp
    /// <summary>
    /// 声明名为的委托
    /// </summary>
    /// <param name="msg"></param>
    delegate void output(string msg);

    /// <summary>
    /// // Create a method for a delegate.
    /// </summary>
    /// <param name="msg"></param>
    public void output_fun(string msg)
    {
        Console.WriteLine(msg);
    }
    [TestMethod]
    public void test_delegate()
    {
        // Instantiate the delegate. C# 2.0 中去掉了new
        output ot = output_fun;
        // Call the delegate.
        ot("委托");

        // 在 C# 2.0 和更高版本中，还可以使用匿名方法来声明和初始化委托，  简化声明函数这一步；
        output ot2 = delegate (string name) { Console.WriteLine($"{name}"); };
        ot2("anonymous method");

        // 由于csharp 有类型推断功能；在 C# 3.0 和更高版本中，lambda表达式 简化；
        output ot3 =      name =>  Console.WriteLine($"{name}"); // 省去了 string 类型； delegate类型；使用labdma 方括号；

        #region 委托的变体 向上/下转型的一种容纳 https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/concepts/covariance-contravariance/variance-in-delegates
        //示例 1：协变 返回值是一种派生的关系
        //示例 2：逆变 参数值是一种派生的关系
        //in 或 out 关键字
        #endregion

        // 委托由于返回值和参数进行规范；约束；
        // 那么如果我们想有自动推断参数个数和返回值：1. 使用泛型； 2. 重载：同名的函数，不同参数个数；
        // 微软 定义 Action 和 Func 一个有返回值一个没有返回值；微软定义了最多16个参数的Action; 从而解决以上两点

        Action<string> actStr = x => Console.WriteLine("string: {0}", x);
        Func<string, string> actFunc = x => "3";
        //.NET Framework 4 在几个现有泛型委托中引入了泛型类型参数的变体(Variance)支持：
        //System 命名空间的 Action 委托，例如 Action<T> 和 Action< T1,T2 >
        //System 命名空间的 Func 委托，例如 Func<TResult> 和 Func< T,TResult >
        //Predicate < T > 委托
        //Comparison<T> 委托
        //Converter<TInput, TOutput> 委托

    }
```

# ## [什么是扩展方法 (Extension Methods)?](https://www.cnblogs.com/smwikipedia/archive/2009/09/27/1575159.html)

扩展方法允许开发人员往一个现有的CLR类型的公开契约(contract)中添加新的方法，而不用生成子类或者重新编译原来的类型。扩展方法有助于把今天动态语言中流行的对duck typing的支持之灵活性，与强类型语言之性能和编译时验证融合起来。
