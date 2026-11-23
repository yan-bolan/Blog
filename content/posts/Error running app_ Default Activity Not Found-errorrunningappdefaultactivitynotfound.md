+++
title = "Error running app Default Activity Not Found"
date = "2019-10-14 19:56:22"
updated = "2021-05-14 22:01:24"
slug = "efb77c65"
aliases = ["/2019/10_14_efb77c65.html"]
description = "排查AS运行报Default Activity Not Found：原因是清单缺少MAIN入口的action声明，在intent-filter中补上即解决。"
[extra]
category = "andriod"
categories = ["andriod"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125432-warteergirls.png"
[taxonomies]
tags = ["android", "android studio"]
+++
﻿https://blog.csdn.net/DeMonliuhui/article/details/83046252

https://blog.csdn.net/yforyoung/article/details/84952283
我的错误是少写了  <action android:name="android.intent.action.MAIN" />