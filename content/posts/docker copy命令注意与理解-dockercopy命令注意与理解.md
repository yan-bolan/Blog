+++
title = "docker copy命令注意与理解"
date = "2021-04-30 15:40:54"
updated = "2021-05-14 22:01:21"
slug = "ca2fad54"
aliases = ["/2021/04_30_ca2fad54.html"]
description = "Dockerfile COPY dir1 ./ 复制的是目录内容而非目录本身，COPY dir1/* ./ 则只摊平复制各层文件、不保留原有目录结构。"
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 風.png"
+++
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