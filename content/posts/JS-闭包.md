+++
title = "JS 闭包"
date = "2022-09-21 20:01:09"
slug = "f10092bf"
aliases = ["/2022/09_21_f10092bf.html"]
description = "JavaScript学习笔记：涵盖闭包、let/const、Promise链式调用解决回调地狱、apply/call、事件监听与冒泡捕获及事件循环机制。"
[taxonomies]
tags = ["js", "闭包", "异步"]
+++
![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220921200403.png)

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220921200420.png)

[闭包 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

使用匿名闭包：

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220921201239.png)

let const

`forEach(传入函数)`



closure:闭包

promise: 一个异步： 保证返回的意思；

为了解决：回调地狱；链式调用：回调在同一缩进层级；清晰；

[图解 Promise 实现原理（一）—— 基础实现 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/58428287)



[如何使用 Promise - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises)





<img title="" src="https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220923222625.png" alt="" width="568">

如果一个 Promise 处于已决议（resolved）状态，或者它被“锁定”以跟随另一个 Promise 的状态，那么它就是 **已兑现（fulfilled）**。


[Let's talk about how to talk about promises | JavaScript: The New Toys](https://thenewtoys.dev/blog/2021/02/08/lets-talk-about-how-to-talk-about-promises/) 看不懂



js apply call 等



[事件介绍 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)



事件监听：三种

建议两种：addEventListener 和element.属性事件：btn.click = xx；

### [事件对象](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events#%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1 "Permalink to 事件对象") 主要是为了：多个当您要在多个元素上设置相同的事件处理程序时，`e.target`非常有用

响应的目标对象

### [事件冒泡及捕获](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events#%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1%E5%8F%8A%E6%8D%95%E8%8E%B7 "Permalink to 事件冒泡及捕获")

最后即将介绍的这个主题你常常不会深究，但如果你不理解这个主题，就会十分痛苦。事件冒泡和捕捉是两种机制，主要描述当在一个元素上有两个相同类型的事件处理器被激活会发生什么。

以空白处点击关闭实例

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220923225950.png)

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220923230445.png)



[带我彻底弄懂JS执行机制 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/80696729)

主要是：js 引擎的线程为空时，才会去事件循环之类 的;
