+++
title = "tomcat开发手册"
date = "2019-11-17 15:13:48"
updated = "2021-05-14 22:04:01"
slug = "a88136fd"
aliases = ["/2019/11_17_a88136fd.html"]
description = "Tomcat部署手册摘记：unpackWARs设为false时WAR不解压、以压缩文档形式部署应用，建议直接阅读官方英文手册。"
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/結城·友奈2.png"
[taxonomies]
tags = ["tomcat", "java", "web"]
+++
﻿没有把 unpackWARs 属性设为 false，则 WAR 文件将不会膨胀，这时 Web 应用将部署为一个压缩文档。
[http://doc.jaxmao.org/deployer-howto.html](http://doc.jaxmao.org/deployer-howto.html)
[https://www.w3cschool.cn/tomcat/zuxi1k90.html](https://www.w3cschool.cn/tomcat/zuxi1k90.html)
多看开发手册好得多，原英文