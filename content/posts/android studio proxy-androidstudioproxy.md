+++
title = "android studio proxy"
date = "2020-08-02 09:32:25"
updated = "2021-05-14 22:01:00"
slug = "4f223e60"
aliases = ["/2020/08_02_4f223e60.html"]
description = "记录Android Studio代理分IDE与Gradle两层：IDE在Settings设置、留空用系统代理，Gradle在用户目录配置全局生效，以截图为主。"
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/乃木·園子.png"
+++
﻿分为ide 和 gradle的代理
目前 在ide 4.0 是在setting中设置，
![在这里插入图片描述](http://img.yayi.site/csdn/20200802092848518.png-watermaskStyle)
为空则使用系统的代理，也就是你的fq软件。

http://mirrors.neusoft.edu.cn 目前这个好像不能用。

---

![在这里插入图片描述](http://img.yayi.site/csdn/20200802093029410.png-watermaskStyle)

测试地址，不是代理地址


gradle 在用户目录下面.目前 6.0版本 。
![在这里插入图片描述](http://img.yayi.site/csdn/20200802093139661.png-watermaskStyle)

全局