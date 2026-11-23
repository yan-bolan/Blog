+++
title = "unbutu字符集临时修改，ssh 终端斜杠中文"
date = "2021-03-25 19:59:50"
updated = "2021-05-14 22:04:07"
slug = "cb572a12"
aliases = ["/2021/03_25_cb572a12.html"]
description = "临时修复Ubuntu终端中文乱码：locale -a查可用字符集，en_US.utf8未生成会报错，改设LC_CTYPE为C.UTF-8即时生效。"
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/三ノ·輪 銀.png"
[taxonomies]
tags = ["linux", "ssh", "encoding"]
+++
 输入：locale
 输出
 ：![在这里插入图片描述](http://img.yayi.site/csdn/2021032519591958.png-watermaskStyle)

 输入：查看你支持的字符集，
```bash
locale -a

```
输出了：


C
C.UTF-8
POSIX

修改
 export LC_CTYPE="en_US.utf8"
bash: warning: setlocale: LC_CTYPE: cannot change locale (en_US.utf8): No such file or directory

应该是这个再对。这个不用重启，临时的
 export LC_CTYPE="C.UTF-8"