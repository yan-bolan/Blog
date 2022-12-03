---
title: zip包乱码
cover: 'https://tva2.sinaimg.cn/large/87c01ec7gy1frmbm9axbjj21hc0u0hdt.jpg'
abbrlink: 6bbac0cf
date: 2022-10-15 19:52:12
tags:
---



> 为什么 zip不在压缩的时候把自己文件是什么编码也一并写进压缩包里；然后交给别人的时候，别人就按给的编码读出来！
> 
> 因为zip 没有考虑到这个问题：zip比较老，用的又多，当时也没有UTF-8统一码
> 
> 后来它出了补丁：使用-O参数进行指定编码；[ikohara/dpkg-unzip-iconv: Makefile for Debian unzip package with iconv (github.com)](https://github.com/ikohara/dpkg-unzip-iconv)
> 
> 没有window 的补丁吗？



[Linux 下 zip 文件解压乱码如何解决？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/20523036)

在繁体window压缩；在简体window =>乱码；



[英文版 Windows 打开 ZIP 压缩包文件名乱码怎么办？ - 哔哩哔哩 (bilibili.com)](https://www.bilibili.com/read/cv16409726?spm_id_from=main.mine-history.0.0.pv)



我是通过在linux 使用unzip（ubuntun的unzip是打过补丁的-O参数）使用-O参数

```bash
unzip -O Big5 1017.zip -d tmp/
```

然后使用7z 打包成7z格式（7z 本身可以保留编码）
