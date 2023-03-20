---
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
title: EXCEL SQL 数学
tags:
  - excel
  - sql
  - 数学
abbrlink: 1e3a832f
date: 2023-03-10 03:37:02
---

EXCEL SQL 分析

2. 以使用sql查询: 有点多些一举;

3. 数学理论：交集，并集，差集;

现有的Excel组合出来;

貌似没有官方函数实现;

这个好像应用场景不多，用处不太

[What is Intersect Operator in Excel and How to Use it (trumpexcel.com)](https://trumpexcel.com/intersect-operator-in-excel/#:~:text=Intersect%20Operator%20in%20Excel%20can,the%20Intersect%20operator%20in%20Excel.)

You can also use the same technique to find the intersection of ranges that spans more than one row or column. For example, with the same data set as shown above, you can get the intersection of Product 1 and Product 2 in April.

Here is the formula that can do that: =B2:C13 B5:D5

Note that the result of this formula would display a [Value error](https://trumpexcel.com/fix-value-error-in-excel/), however, when you select the formula and press F9, it will show the result as {649,523}. This formula returns an array of the intersection values. You can use this within formulas, such as [SUM](https://trumpexcel.com/excel-sum-function/) (to get the total of the intersection values) or [MAX](https://trumpexcel.com/excel-max-function/) (to get the maximum of the intersection values).

![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/1678463218415Intersect-Operator-in-Excel-2-Ranges.gif)

最新版的Excel 可以溢出多个返回值

或者你按F9

**IF(ISERROR(MATCH(B2,$C$2:$C$9,0)),"",B2)**

match 可以大于等于等比较选择;

index要移动值;
