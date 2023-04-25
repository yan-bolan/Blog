---
title: Net编码UTF-8BOM问题
tags:
  - net
  - encoding
  - utfbom
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
abbrlink: 5c8085e
date: 2023-04-25 21:31:18
---



两个：Big-Endian

Little-Endian





使用notepad++的 编码选择UTF-8可以看到;

使用notepadd++的插件hex edtior编辑器可以看到前几码;

使用nc 导出二制程文件;

使用fillder 查看十六进制;

https://stackoverflow.com/questions/23259173/unexpected-character-encountered-while-parsing-value



# [Unexpected character encountered while parsing value](https://stackoverflow.com/questions/23259173/unexpected-character-encountered-while-parsing-value)



> unicode是字符集：一种集合; utf-8是unicode的一种编码实现;

在net，字符串以unicode存储;



net中 Encoding的静态UTF8是默认以utf8-bom;

以实例化形式是不带bom的;

"using (var streamWriter = new StreamWriter(someStream, new UTF8Encoding(false))) ..." --这个是无bom的;



验证：

可以通过一个filstream来写文件验证一下;



bom是微软搞出来的？作用并不是在传输协议上而是文件上;
