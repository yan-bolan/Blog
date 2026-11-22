+++
title = "idea select all occurrences 正则表达式复制  查找结果复制"
date = "2020-11-26 12:46:20"
updated = "2021-05-14 22:00:42"
slug = "c7f44292"
aliases = ["/2020/11_26_c7f44292.html"]
description = "IDEA 中用正则查找或 Select All Occurrences 选中所有匹配项（如各 R.color 值），再 Ctrl+C 一次性复制查找结果。"
[taxonomies]
tags = ["正则表达式"]
[extra]
category = "IDE"
categories = ["IDE"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125559-9e794859e7f25a110df951d0b55e4815.png"
+++
﻿一些场景下复制东西

 正则表达式选出所有的 color 进行复制 R.color.pink
变成这样：
![在这里插入图片描述](http://img.yayi.site/csdn/20201126124507533.png-watermaskStyle)


----

源码：

```kotlin
  addItem("John", new String[]{"House", "Boat", "Candy", "Collection", "Sport", "Ball", "Head"}, R.color.pink, R.drawable.ic_ghost);
        addItem("Mary", new String[]{"Dog", "Horse", "Boat"}, R.color.blue, R.drawable.ic_ghost);
        addItem("Ana", new String[]{"Cat"}, R.color.purple, R.drawable.ic_ghost);
        addItem("Peter", new String[]{"Parrot", "Elephant", "Coffee"}, R.color.yellow, R.drawable.ic_ghost);
        addItem("Joseph", new String[]{}, R.color.orange, R.drawable.ic_ghost);
        addItem("Paul", new String[]{"Golf", "Football"}, R.color.green, R.drawable.ic_ghost);
        addItem("Larry", new String[]{"Ferrari", "Mazda", "Honda", "Toyota", "Fiat"}, R.color.blue, R.drawable.ic_ghost);
        addItem("Moe", new String[]{"Beans", "Rice", "Meat"}, R.color.yellow, R.drawable.ic_ghost);
        addItem("Bart", new String[]{"Hamburger", "Ice cream", "Candy"}, R.color.purple, R.drawable.ic_ghost);
```
![在这里插入图片描述](http://img.yayi.site/csdn/2020112612440217.png-watermaskStyle)
![在这里插入图片描述](http://img.yayi.site/csdn/20201126124416603.png-watermaskStyle)
然后ctrl c 即可