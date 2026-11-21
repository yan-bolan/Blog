+++
title = "apache httpconf"
date = "2019-10-21 20:06:36"
updated = "2021-05-14 22:01:06"
slug = "52071ffa"
aliases = ["/2019/10_21_52071ffa.html"]
[extra]
cover = "https://cdn.jsdelivr.net/gh/tangxingithub/picbed/img/20210311124333-The-executioner-and-her-way-of-life.jpg"
+++
﻿对这个文件的改动（备份好），都要重启apache生效.
里面有错误是不能启动的，不能启动时。一条条加，判断是你修改了哪个配置的问题，也有可能是路径问题。可以在log文件查看日志，cmd下启动可能会有提示httpd.exe -k start
httpd.exe -k restart
httpd  -k install