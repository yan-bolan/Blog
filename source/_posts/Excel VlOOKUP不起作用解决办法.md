---
cover: 'https://api.isoyu.com/bing_images.php'
title: Excel VlOOKUP不起作用解决办法
tags:
  - Excel
  - Vlookup
abbrlink: bd5aefb
date: 2023-03-10 01:46:42
---

# vlookup

1. 单元格要使用常规格式;

2. 下拉时，可能Excel以数列的方式递增了，没有达到你想要在数组里查找的结果;

3. excel勾选自动重新计算;

可以看到是Table_array;

![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/16784583502371678458349526.png)

![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/16784585522481678458551971.png)

=VLOOKUP(C2,A:B,2,0)

可以看到A:B是一个二维table;

C2在table的第一列寻找,返回第二列B对应的行1:也就是7
