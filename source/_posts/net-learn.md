---
title: net learn
date: 2022-10-01 20:03:35
tags: 异步
---

# csproj

net framework :所有文件显示声明compile include进行

net core: exclude 排除掉不需要compile的文件；排除法；

`git多人协同作业:csproj 多个在本机修改会导致冲突`:所以一般是允许一个人修改提交？：总不得排除这个文件吧；

在net framework 每增加一文件都会修改csproj文件：肯定得提交？

# 发布有得有失

看质量外，还要看商业`license`

有些还是收费的和试用的；

# 卸载包

1. 找到csproj文件：复制包名：使用命令行删除；如 vscode

2. vs: ui操作就好了；

# nuget

内网部署版；镜像官方的包也可以：但依赖问题不是很好；

# 异步

net core:

async await

先学习用（练习）

再学底层（不然出了问题，搞不定）

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221001204435.png)

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221001204737.png)

有些不一定要async: 有些没有async的可await它；

Task;

```csharp
 public void Testasync()
        {
            string file = "1.txt";
            File.WriteAllTextAsync(file, "hello");
        }
```

```csharp
   public async Task Testasync()
        {
            string file = "1.txt";
            await File.WriteAllTextAsync(file, "hello");
        }
```

没有返回值：可以用写Task; 有返回值可以写Task<T>

```csharp
  public async Task testAsync()
        {
// 加了async , Task ；表明不需要返回值；
        }
```

如果不支持async;

如main方法：

```csharp
void main{
    await someaync();// 对await报错；
 someaync().Result;// 使用这个或者wait；但这个有死锁风险，而且排查也难；
}
```

可以拿出Task.Resul值； result是task的一个值；

<mark>但这个有死锁风险，而且排查也难；</mark>

一般有其它解决方法；

所以await:应该是最外层的了；

## 原理

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221001213834.png)

可以切换csharp低版本：更多信息；不然看不到：两个main;

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221001214125.png)

net core 实现了通过上面说的 生成两个main来实现main的async; 通过wait,result来等待；

通过il编译：4.0版本查看代码；tmd：还状态机模式；还用switch拆块；

new一个状态机：

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221001215639.png)

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221001215909.png)

总结：async 的方法会被编译器编译成一个类，根据await调用进行切分 为多个状态，对async方法的调用会拆分为对movenext的调用； 实际上没有wait;

译成：状态机调用；

## Thread

async 拆分多个；

await还不是同步吗？还是耗时啊；

await调用的的等待时间，NET会把当前的线程返回给线程池，等待异步方法调用执行完毕后，框架会从线程池再取出来一个线程执行后续的代码；？？

> 所以不一是同一线程执行；线程内存和数据变量怎么办？

这样有什么用？

```csharp
Thread.CurrentThread.ManngedThreadId;
```

从现实角度看：餐馆点餐来说：服务员（Thread）可能不是同一个人对你进行服务；因为众多点餐时间可能不定；

如果：你点餐比较快，可能就是同一个服务员；这时候就没有必要切换线程；

所以：对耗时操作才要； 线程切换也是非常耗时；

当然不同的版本语言：clr的优化机制不一样；目前还说是这样；

---

**异步方法不等于多线程；除非手动放到新线程；**

async/await本质上只是一个语法糖，它并不产生线程，只是在编译时把语句的执行逻辑改了，相当于过去我们用callback，这里编译器帮你做了

async并不是表明这个方法是异步方法，而是表明这个方法里有异步调用，真正重要的是await,他会同步等待异步调用的完成

async 和 await 关键字不会创建其他线程。因为异步方法不会在其自身线程上运行，因此它不需要多线程。

Task.run(新线程；)

> 所以如果异步方法里有真正的异步方法，如task.run ；线程创建；

```csahrp
async Task main(){
// threadid 是 1；
 var x = await    fun();
//threadid 是：可能是1，也可能是异步里的新线程（clr优化，可能使用之前的线程）
}
async Task fun(){
        some method/ calc ;//  这里线程是1还是其它？？？；
return    task.run(新的线程)；//手动创建了一个线程任务；//所
}
```

其它这种在其它语言是叫协程？？

>  有些方法没有async,为什么没有；因为外层(上层)帮你 await 了taskk;

async方法有生成新的类：效能也会低下；

如果只是简单转发异步结果：用普通方法调用返回更快；不需要重复装箱拆箱

异步方法：不要使用Thread.Sleep(); 而是使用Task.Delay();

可能会阻塞调用方的线程；如在winform ：ui线程被阻塞；

这个有点乱；

有时任务要提前终止任务，比如：请求超时，用户取消请求；

如果user取消请求：后台还在运算；这样服务器资源还在占着；

callcancalToken;

 Task

task 静态方法：

task .whenany:任何一个task完成；

Whenall: task所有的完成；

等待所有任务返回；

并行任务结果汇总；

# yield

yield：可以让数据以流水线方式处理场景；：一个一个处理；不是先得到全部，再处理；符合某些场景的性能提升；

yield和async不能一起用；可以返回值不要Task；

# 尽量不要同步和异步混用；

> CPS(Continuation Process Style)[Continuation-passing style - Wikipedia](https://en.wikipedia.org/wiki/Continuation-passing_style#:~:text=In%20functional%20programming%2C%20continuation%2Dpassing,the%20usual%20style%20of%20programming.)，协程，[promise](https://www.zhihu.com/search?q=promise&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1237197661%7D) 之间有点关系，promise 比协程好实现，通常不需要改 编译器和运行时
> 
> [协程语法](https://www.zhihu.com/search?q=%E5%8D%8F%E7%A8%8B%E8%AF%AD%E6%B3%95&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1237197661%7D)分为 async, await 流派和 yield流派
> 
> 协程实现，分为转化状态机，捕获变量流派和完整堆栈复制流派
> 
> 协程又可以根据支不支持递归，分类
> 
> 普通语言，一般只实现协程，没有支持多线程task调度，这个task调度其实是另外一个问题
> 
> 按照[csharp](https://www.zhihu.com/search?q=csharp&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1237197661%7D)的发展路线，其实先做task 调度系统，task 用future的方式，来做顺序控制
> 
> 后面才做了async await 设计,e而async await 本身从 迭代器发展过来的，

 最简单的状态机实现就是Switch了；

线程池：

并没有创建线程；

解决了异步与回调方法分开写的问题；

# linq

linq 有写法两种：一种是csharp 语法；

一个是查询语法：像sql一样；

# 配置系统

传统web.config:xx

# 数据库

 为什么有for update 语法？行锁，加锁语句；查询和update都不行；

# 线程

一个线程的崩溃导致所属进程的所有线程崩溃；

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221002101521.png)

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221002101640.png)

# 实现线程

用户线程；

内核线程；

管理者不一样；

所以内核线程与用户线程可能存在多对一，一对多，多对多；应该是调度；
