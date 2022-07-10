---
title: docker copy命令注意与理解
date: 2021-04-30 15:40:54.0
updated: 2021-05-14 22:01:21.906
url: https://yayi.site/archives/dockercopy命令注意与理解
categories: 
cover: https://cdn.jsdelivr.net/gh/TangxinGH/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 風.png
tags: 
---


﻿copy dir1 ./

结果并不是
./
    dir1

而是
./ 
    dir1里的文件与目录



---
第二

COPY dir1/*  ./ 

结果并不是
./   
   dir1
          xxx/file.txt

而是
./
   file.txt

也就是dir1的目录结构不会复制。*号是将所有目录/包括子目录下的文件复制而已

---