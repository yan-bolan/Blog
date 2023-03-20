---
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
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



# 下拉时不起作用

因为使用是相对位置，对递增;

这时候应该使用绝对位置：

```bash
$C$12 使用美元符号固定住;
```

# 返回多个值

一般想要返回相邻的位置.





# lookup问题

LOOKUP函数中查找的范围的区域数据必须为升序排列，如-2、-1、0、1、2、...、A-Z、FALSE、TRUE。否则，可能会返回错误的结果。<mark>因此，由于汉字是文本且没有顺序，在LOOKUP的函数使用中，汉字序列是不能作为查找的范围的</mark>。

![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/16787937246671678793723813.png)

# 返回多个值

[Excel VLOOKUP函数怎么查询一个值返回多个结果 - janicemvidal - 博客园](https://www.cnblogs.com/janicemvidal/p/8621979.html#:~:text=VLOOKUP%E5%87%BD%E6%95%B0%E5%8F%AA%E8%83%BD%E8%BF%94%E5%9B%9E%E4%B8%80%E4%B8%AA%E7%BB%93%E6%9E%9C%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%83%B3%E8%A6%81%E4%B8%80%E5%AF%B9%E5%A4%9A%E6%9F%A5%E8%AF%A2%EF%BC%8C%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%E5%85%B6%E4%BB%96%E5%87%BD%E6%95%B0%EF%BC%8C%E7%9C%8B%E4%B8%8B%E8%BE%B9%E4%BE%8B%E5%AD%90%EF%BC%8C%E5%B0%86%E9%83%A8%E9%97%A8%E4%B8%BAA%E7%9A%84%E5%A7%93%E5%90%8D%E5%88%97%E4%B8%BE%E5%88%B0E%E5%88%97%EF%BC%9A%20%E4%B8%80%E3%80%81%E4%B8%80%E4%B8%AA%E5%8D%95%E5%85%83%E6%A0%BC%E6%94%BE%E4%B8%80%E4%B8%AA%E5%90%8D%E5%AD%97%EF%BC%9AE2%E5%85%AC%E5%BC%8F%3DIFERROR%20%28INDEX%20%28B%3AB%2CSMALL,%28IF%20%28A%3AA%3DD%242%2CROW%20%28A%3AA%29%29%2CROW%20%28A1%29%29%29%2C%22%22%29%EF%BC%8C%E6%95%B0%E7%BB%84%E5%85%AC%E5%BC%8F%EF%BC%8C%E4%B8%89%E9%94%AE%E7%BB%93%E6%9D%9F%EF%BC%9B)

https://zhuanlan.zhihu.com/p/88925861

组合公式大复杂，得不尝失，数据量多时卡顿不如sql,但得不尝失;

## **方法三：FILTER函数**

以上讲了常用的两种办法，第一种需要用到复杂的数组公式，第二种需要添加辅助列，都比较复杂，而FILTER函数的出现，简单灵巧的解决了这个问题。

而我只是在第一个单元格输入了函数，这就是动态数组溢出的强大之处。



chatgpt写事例![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/16787959896671678795988764.png)

<style>
</style>

|          |        |       |     |     |     |     |       |
| -------- | ------ | ----- | --- | --- | --- | --- | ----- |
| Product  | Region | Sales |     |     |     |     |       |
| Apple    | East   | 100   |     |     |     |     | Apple |
| Banana   | West   | 200   |     |     |     |     |       |
| Cherry   | North  | 150   |     |     |     |     |       |
| Durian   | South  | 250   |     |     |     |     |       |
| Eggplant | East   | 300   |     |     |     |     |       |

![](https://fastly.jsdelivr.net/gh/TangxinGH/picbed@master/img/picgo/16787960676681678796067426.png)
