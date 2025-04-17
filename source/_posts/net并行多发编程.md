---
title: net并行多发编程
tags:
  - net
  - 多线程
cover: 'https://picsum.photos/400'
abbrlink: fd8e85bf
date: 2023-04-01 21:30:26
---

1. 每一代net 都有异步的方式用法与写法;

2. 能用单线程就绝不上多线程，你把握不住！！

*Premature optimization is the root of all evil* **过早优化是万恶之源**。



# 线程

无序性;

竞态条件;

操作符不是原子性的;

# net

发展历程？

1. 委托begininvoke

2. thread

3. thread pool

4. task

5. async await

# 线程池

需要注意的是，线程池中的线程均为后台线程，即它们的IsBackground属性为true。这意味着在所有的前台线程都已退出后，ThreadPool中的线程不会让应用程序继续保持运行。

要使用ThreadPool中的线程，需要使用ThreadPool.QueueUserWorkItem这个静态方法指定线程要调用的方法，该方法有2个重载版本：

QueueUserWorkItem

这种多线程方式方法太少，灵活性不够;



# 从Thread到Task

创建线程代价高昂，而且每个线程都要占用大量虚拟内存（例如Windows默认1 MB）。前面说过，更有效的做法是使用线程池：需要时分配线程，为线程分配异步工作，运行至完成，再为后续异步工作重用线程，而不是在工作结束后销毁再重新创建线程。

在.NET Framework 4和后续版本中，TPL不是每次开始异步工作时都创建一个线程，而是创建一个Task，并告诉任务调度器 有异步工作要执行。此时任务调度器可能采取多种策略，但默认是从线程池 请求一个工作者线程。线程池会自行判断怎么做最高效。可能在当前任务结束后再运行新任务，或者将新任务的工作者线程调度给特定处理器。线程池还会判断是创建全新线程，还是重用之前已结束运行的现有线程。

> 那线程池是怎么维护线程的独有内容的？不同任务环境？污染？

任务是对象，其中封装了以异步方式执行的工作。这听起来有点儿耳熟，委托不也是封装了代码的对象吗？区别在于，委托是同步的，而任务是异步 的。如执行委托（例如一个Action），当前线程的控制点会立即转移到委托的代码；除非委托结束，否则控制不会返回调用者。相反，启动任务，控制几乎立即返回调用者，无论任务要执行多少工作。任务通常在另一个线程上异步执行（本章稍后会讲到，也可只用一个线程来异步执行任务，而且这样还有一些好处）。简单地说，任务将委托从同步执行模式转变成异步。

> 委托好像也可以异步吧:begin/end invoke ，虽然在net core中已经没有了;

# 

# 异步编程模型

[Migrating Delegate.BeginInvoke Calls for .NET Core - .NET Blog (microsoft.com)](https://devblogs.microsoft.com/dotnet/migrating-delegate-begininvoke-calls-for-net-core/#:~:text=The%20Task%2Dbased%20Asynchronous%20Pattern,calls%20are%20not%20supported%20in%20.)

**The [Asynchronous Programming Model (APM)](https://docs.microsoft.com/dotnet/standard/asynchronous-programming-patterns/asynchronous-programming-model-apm) (using `IAsyncResult` and `BeginInvoke`) is no longer the preferred method of making asynchronous calls.** The [Task-based Asynchronous Pattern (TAP)](https://docs.microsoft.com/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap) is the recommended async model as of .NET Framework 4.5. Because of this, and because the implementation of async delegates depends on remoting features not present in .NET Core, `BeginInvoke` and `EndInvoke` delegate calls are not supported in .NET Core. This is discussed in GitHub issue [dotnet/corefx #5940](https://github.com/dotnet/corefx/issues/5940).

1. AMP 和 TAP 模型

。。。

# lock

```csharp
using System;
using System.Threading;

namespace ProgrammingCSharp4

{
    class AsynchronousSample

    {
        int count;

        public int Max { get; set; }

        public void Increase()

        {
            for (int i = 0; i < Max; i++)

            {
                count++;
            }
        }

        static void Main(string[] args)

        {
            Thread[] threads = new Thread[500];

            AsynchronousSample sample = new AsynchronousSample() { Max = 10000 };

            for (int i = 0; i < threads.Length; i++)

            {
                threads[i] = new Thread(sample.Increase);

                threads[i].Start();
            }

            for (int i = 0; i < threads.Length; i++)

            {
                threads[i].Join();
            }

            Console.WriteLine("{0}", sample.count);
        }
    }
}
```

看完了上述代码可以发现，这个代码的逻辑实际并不复杂，就是使用500个线程一起调用AsynchronousSample的实例对象的Increase方法。

下面来分析一下原因，实际上问题就出在Increase方法体中的"count++"这一句上，看似简单的一条自增语句怎么导致了这种结果呢？我们使用ILDasm分析一下count++编译后的CIL代码，如代码清单25-11所示。

代码清单25-11　count++语句编译后生成的CIL代码

---

IL_0006：ldfld int32 ProgrammingCSharp4.AsynchronousSample：count

IL_000b：ldc.i4.1

IL_000c：add

IL_000d：stfld int32 ProgrammingCSharp4.AsynchronousSample：count

---

可以看出，看起来就一句的"count++"语句分解为了4句，这4句的含义分别是：

（1）加载count字段的当前值到栈中；

（2）加载数字常量1到栈中；

（3）将栈顶的2个值相加，并返回结果；

（4）将计算的结果更新到count字段。

可见，count++语句并非原子操作，但它分解而成的这4个IL指令都是原子操作，且都是线程安全的，只是合并起来就非线程安全了。试想，如果线程1读到的count值是0，而此时线程2已经完成自增操作，但并未更新count字段时，这时线程1自增的结果将和线程2相同，都是1，本来应该是2的。

那就是想办法让这4个原子操作组合为1个原子操作，也就是说任何时刻都只运行一个线程执行count++操作，这就是线程同步。要做到线程同步有很多种不同方法，这里我们介绍其中的几种。其中最常用的一个方法，就是使用lock语句为某个代码块加锁，在加锁的代码块只允许一个线程进入并执行，同时该线程获得该锁，在代码块执行完毕将自动解锁。

: 注，lock传一个引用; 同一个引用;和不同引用是不同的;

官方建议：

```csharp
private static readonly lockobject = new object;// 静态保证一个; readonly不被修改 private不被 访问
```

lock：其实是加标签;

那么，大家是不是很想知道使用了lock语句以后，IL代码会发生怎样的变化呢？我们马上来看看，如代码清单25-13所示。

代码清单25-13　使用了lock语句后生成的IL代码节选

---

.try

{

IL_0006：ldarg.0

IL_0007：ldfld object ProgrammingCSharp4.AsynchronousSample：_lock

IL_000c：dup

IL_000d：stloc.2

IL_000e：ldloca.s'＜＞s__LockTaken0'

IL_0010：call void[mscorlib]System.Threading.Monitor：Enter（object，bool＆）

IL_0015：ldarg.0

IL_0016：dup

IL_0017：ldfld int32 ProgrammingCSharp4.AsynchronousSample：count

IL_001c：ldc.i4.1

IL_001d：add

IL_001e：stfld int32 ProgrammingCSharp4.AsynchronousSample：count

IL_0023：leave.s IL_002f

}//end.try

finally

{

IL_0025：ldloc.1

IL_0026：brfalse.s IL_002e

IL_0028：ldloc.2

IL_0029：call void[mscorlib]System.Threading.Monitor：Exit（object）

IL_002e：endfinally

}//end handler

---

可见，编译器进行了如下操作：

1）添加了try……finally语句；

2）lock语句转换为了对System.Threading.Monitor.Enter（Object）以及System.Threading.Monitor.Exit（）两个方法的调用，前者是获取锁，后者是释放锁。

可见，lock语句只不过是一个简化Monitor类使用的快捷语法，编译器在幕后帮助我们做了许多工作。事实上，Monitor类提供了同步访问对象的机制，我们也可以直接使用它来实现线程同步的目的。这里的lock语句实际上和下述使用Monitor类的代码相当，如代码清单25-14所示。

代码清单25-14　使用Monitor实现lock语句功能相当的代码示例

---

Monitor.Enter（_lock）；

try

{

count++；

}

finally

{

Monitor.Exit（_lock）；

}





# async await

<mark>这东西要弄清楚线程顺序性;</mark>

上下文关键字async和await简化TAP编程。

这个简化了操作;

写代码可以更像逻辑流;

没写过以前的多线程，所以不知道到底省了什么？



有点像避免js的回调地狱;





为了更好地理解控制流，表19.2展示了每个任务中的控制流（每个任务一列）。

这个表格很好地澄清了两个错误观念：

**错误观念#1：用async关键字修饰的方法一旦调用，就自动在一个工作者线程上执行。**这绝对不成立；方法在调用线程上正常执行。如方法的实现不等待任何未完成的可等待任务，就会在同一个线程上同步地完成。是由方法的实现决定是否启动任何异步工作。<mark>仅仅使用async关键字，改变不了方法的代码在哪里执行</mark>。此外，从调用者的角度看，对async方法的调用没有任何特别之处，就是一个返回Task的方法。该方法正常调用，最后正常返回指定返回类型的对象。

**错误观念#2：await关键字造成当前线程阻塞，直到被等待的任务完成 。**这也绝对不成立。要阻塞当前线程直至任务完成，应调用Wait（）方法；事实上，Main线程在等待其他任务完成时一直都在做这件事情。每次执行task.Wait（100），它都会阻塞。但一旦这个调用结束，while循环的主体都会和其他任务并发执行（而不是同步执行）。await关键字对它后面的表达式进行求值（该表达式一般是Task或Task<T>类型），为结果任务添加延续，然后立即将控制返还给调用者。创建的任务将开始异步工作；await关键字意味着开发人员希望在异步工作进行期间，该方法的调用者在这个线程上继续执行它的工作。异步工作完成之后的某个时间，从await表达式之后的控制点恢复执行。



事实上，async关键字最主要的作用就是1）向看代码的人清楚说明它所修饰的方法将自动由编译器重写。2）告诉编译器，方法中的上下文关键字await要被视为异步控制流，不能当成普通的标识符。



以前，异步代码看上去就像意大利面条，当一个异步调用结束并开始调用另一个时，逻辑执行路径将从一个方法跳到另一个方法。有了异步函数，代码看上去就像是同步的，使用熟悉的控制结构（如循环和try/catch/finally块），只不过用一个新的关键字（await）来触发异步执行流。



> 好奇像控制台：没有阻塞主线程; 如果异步线程没完成工作，主线程就退出了怎么办？



# 建议

### 为什么要避免锁定this、typeof（type）和string

一个貌似合理的模式是锁定代表类中实例数据的this关键字，以及为静态数据锁定从typeof（type）（例如typeof（MyType））获取的类型实例。在这种模式下，使用this可为与特定对象实例关联的所有状态提供同步目标；使用typeof（type）则为一个类型的所有静态数据提供同步目标。但这样做的问题在于，在另一个完全不相干的代码块中，可能创建一个完全不同的同步块，而这个同步块的同步目标可能就是this（或typeof（type））所指向的同步目标。换言之，虽然只有实例自身内部的代码能用this关键字来阻塞，但创建实例的调用者仍可将那个实例传给一个同步锁。

结果就是对两套不同的数据进行同步的两个同步块可能相互阻塞。虽然看起来不太可能，但共享同一个同步目标可能影响性能，极端的时候甚至会造成死锁。所以，请不要在this或typeof（type）上锁定。更好的做法是<mark>定义一个私有只读字段，除了能访问它的那个类之外，没有谁能在它上面阻塞。</mark>

锁的颗粒度要细;
