+++
title = "php字符串表示 类概念知识点"
date = "2021-05-11 12:15:36"
updated = "2021-05-14 22:02:13"
slug = "b9d3fab3"
aliases = ["/2021/05_11_b9d3fab3.html"]
description = "罗列PHP字符串的四种表示（单双引号、heredoc、nowdoc）与类核心知识点：继承、static、traits、抽象接口、魔术方法及重载序列化等。"
[taxonomies]
tags = ["php类概念,php字符串"]
[extra]
category = "php"
categories = ["php"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125432-warteergirls.png"
+++
﻿1. 单引号
2. 双引号
3. heredoc  <<<'标志符' 内容>>>
4. nowdoc

# php 类
1. 命令空间
2. 函数用function定义
3. var声明变量
4. 类的实例化：new 。$this指针。
5. 类的访问：-> 符号public private protected 
6. 静态属性与方法：与实例无关，与类有关。static。访问的时候用范围解析符`::`
7. 构造函数与析构函数。自动调用。
8. 类的继承。不支持多继承。extends。 public private（私有的不能访问）。单方向性。调用父类的构造函数。子类有自己构造函数，则调用自己的。
9. final 。这个类不能被继承。
10. traits 机制。复用。
11. 抽象类与接口：abstact.interface. 解决单继承问题。implements.
12. 类的魔术方法。以`_ _`开头的都保留为魔术方法。
13. 复制对象。
14. 方法重载。_ _call 用于
15. 属性重载：_ _get  _ _set
16. 字符串转换：_ _toString()
17. 自动加载对象。
18. 对象序列化。
19. 调用对象._ _invoke()
20. 类的类型推断与引用。instanceof 
21.