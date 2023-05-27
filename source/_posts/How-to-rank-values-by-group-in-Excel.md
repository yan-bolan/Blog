---
title: How to rank values by group in Excel?
tags:
  - EXCEL
  - 分组排序
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
abbrlink: e4698ace
date: 2023-05-05 20:52:39
---

[How to rank values by group in Excel? (extendoffice.com)](https://www.extendoffice.com/documents/excel/4319-excel-rank-by-group.html#:~:text=There%20is%20a%20formula%20to,to%20the%20cells%20you%20need.)



There is a formula to quickly rank values based on group.

Select a blank cell next to the data, C2 for instance, type this formula, =SUMPRODUCT(($A$2:$A$11=A2)*(B2<$B$2:$B$11))+1 then drag autofill handle down to apply this formula to the cells you need.

In the formula, A2:A11 is the range containing the group values, A2 is the first cell in the list of group values, B2 is the first cell in the list which needed to rank, B2:B11 is the list that contains values needed to rank.



有点复杂，没什么用;

原理：

0*1=0;

1*0=0;

1*1=1;



假设左边返回一条line: 0*1=0;

右边返回二条line:1\*0=0;1\*1=1;

两边进行矩阵相乘; 0\*0=0; 0\*1=0;

 然后进行sum：  0+1=1;



[How to Rank Within Group in Excel (3 Methods) - ExcelDemy](https://www.exceldemy.com/excel-rank-within-group/)

- Where **(C5=C$5:C$15)** part returns **TRUE/FALSE** based on products category, and **(D5<D$5:D$15)** part checks the quantity of the products if **D5** is less than any value of array **D$5:D$15** then it returns **TRUE** otherwise And **+1** is the number series that starts from 1.



<style>
</style>

|      |     |     |     |     |                                      |
| ---- | --- | --- | --- | --- | ------------------------------------ |
| A    | B   | C   | D   |     |                                      |
| RED  | 10  |     |     |     | =SUMPRODUCT((A10:B14="RED")*B10:B14) |
| RED  | 20  |     |     |     |                                      |
| blue | 30  |     |     |     |                                      |
| blue | 30  |     |     |     |                                      |
| RED  | 20  |     |     |     |                                      |
