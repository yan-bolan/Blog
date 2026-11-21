+++
title = "如何在Excel中将科学计数法转换为文本或数字"
date = "2023-08-04 21:57:52"
slug = "5692d420"
aliases = ["/2023/08_04_5692d420.html"]
[taxonomies]
tags = ["EXCEL", "科学计数法"]
[extra]
cover = "https://picsum.photos/400"
+++
[如何在Excel中将科学计数法转换为文本或数字？ (extendoffice.com)](https://zh-cn.extendoffice.com/documents/excel/1725-excel-convert-scientific-notation-to-text.html)



**[在数字前加单引号将科学计数法转换为文本](https://zh-cn.extendoffice.com/documents/excel/1725-excel-convert-scientific-notation-to-text.html#a1)**

**[使用格式单元格功能将科学计数法转换为文本](https://zh-cn.extendoffice.com/documents/excel/1725-excel-convert-scientific-notation-to-text.html#a2)**

**[使用公式将科学记数法转换为文本](https://zh-cn.extendoffice.com/documents/excel/1725-excel-convert-scientific-notation-to-text.html#a3)**





**3**。 在 **单元格格式** 对话框，在 **联系电话** 标签，点击 **定制** 来自 **产品分类** 列表框，输入数字 **0** 进入“类型”框，请参见屏幕截图：



函数：

TEXT()

trim()方法也可以







----



[Excel日期和时间-时间的加减运算 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/388007229)

TIME 函数有 3 个参数。首先，使用 HOUR、MINUTE 和 SECOND 创建在单元格 A1 中输入的时间。接下来，添加 3 小时 10 分钟0秒。

=TIME(HOUR(A1)+3,MINUTE(A1)+10,SECOND(A1))

[Excel-根據時間中的分決定是否進位(FLOOR,CEILING) @ 學不完．教不停．用不盡 :: 痞客邦 :: (pixnet.net)](https://isvincent.pixnet.net/blog/post/47871816-excel-%E6%A0%B9%E6%93%9A%E6%99%82%E9%96%93%E4%B8%AD%E7%9A%84%E5%88%86%E6%B1%BA%E5%AE%9A%E6%98%AF%E5%90%A6%E9%80%B2%E4%BD%8D(floor,ceiling))

根據前一篇教學：[Excel-根據時間中的分決定是否進位(CHOOSE,INT,HOUR)](http://isvincent.pixnet.net/blog/post/47860626 "Excel-根據時間中的分決定是否進位(CHOOSE,INT,HOUR) @ 學不完．教不停．用不盡 -- 痞客邦 --")，如果使用 **FLOOR**函數和 **CEILING** 函數，該如何處理？



或者使用sql

设定基数：

groupid=(时间-base )/间隔分钟数
