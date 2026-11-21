+++
title = "tqdm单行显示"
date = "2021-04-04 12:09:02"
updated = "2021-05-14 22:04:04"
slug = "f62f4c8a"
aliases = ["/2021/04_04_f62f4c8a.html"]
[taxonomies]
tags = ["tqdm"]
[extra]
category = "python"
categories = ["python"]
cover = "https://cdn.jsdelivr.net/gh/tangxingithub/picbed/img/20210311125432-warteergirls.png"
+++
﻿1. 一直流动
   。你启动了多个tqdm 实例打印。使用完close()
   。 你使用了print的语句。用tbar.write()
2.  不需要n
  update（）,默认加一。total后期加入 ？