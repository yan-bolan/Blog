+++
title = "gatherallfilestopublish错误"
date = "2022-11-20 22:32:39"
slug = "881ed5a"
aliases = ["/2022/11_20_881ed5a.html"]
description = "VS 发布报 GatherAllFilesToPublish 错误，疑因装 VC redist，删 .vs 目录与 csproj 相关 target 行解决。"
[extra]
cover = "https://tva2.sinaimg.cn/large/87c01ec7gy1frqdpollutj21hc0u07wh.jpg"
[taxonomies]
tags = ["visual studio", "dotnet"]
+++
gatherallfilestopublish 错误

想起最近安装了redist vc ;  应该是这个影响到了;  卸载要权限，重装vs也要权限;

于是删除.vs文件目录; 删除cspj文件里的哪target 那行; 
