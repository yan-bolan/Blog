+++
title = "matlab 指定python 路径 64bit"
date = "2020-09-03 11:14:52"
updated = "2021-05-14 22:02:45"
slug = "9789d32"
aliases = ["/2020/09_03_9789d32.html"]
description = "MATLAB 不支持 32 位及高版本 Python，需用 pyversion 指定 Anaconda 环境里 64 位 python 路径，重启后会失效。"
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/乃木·園子.png"
+++
﻿因为matlab 不支持 32bitpython  和高版本python。而系统默认装是32bit 。anaconda只能虚拟路径。
### 一：添加anaconda的envs到path 代替系统的32bit
### 二：装个64bit的python
### 三：在matlab中指定路径。重启后会变

pyversion('C:\ProgramData\Anaconda3\envs\AgeGender\python.exe')