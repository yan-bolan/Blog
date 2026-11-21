+++
title = "oracle visusal studio 2022 file can't find"
date = "2023-01-13 23:04:55"
slug = "302a9958"
aliases = ["/2023/01_13_302a9958.html"]
[taxonomies]
tags = ["oracle"]
[extra]
cover = "https://picsum.photos/400"
+++
win11

visual stuido 2022,64bit IIS USE 已关闭

准备两个oracle：非托管的; 如里是托管（托管本身32和64没有意义：类作java中间码，与平台无关）

ODAC112040Xcopy_32bit

ODAC112040Xcopy_64bit

项目为any cpu时，项目属性build platform target也要改为对应的。不然不起作用

System.IO.FileNotFoundException: 'Could not load file or assembly 'Oracle.DataAccess, Version=2.112.4.0, Culture=neutral, PublicKeyToken=89b483f429c47342'. The system cannot find the file specified.'
