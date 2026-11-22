+++
title = "oracle arraybind批量插入"
date = "2023-12-12 19:37:45"
slug = "92bca621"
aliases = ["/2023/12_12_92bca621.html"]
description = "介绍Oracle数组绑定批量插入的原理：把数组一次性发送到服务器执行，减少网络往返，从而提升批量插入效率，附官方博文参考。"
[taxonomies]
tags = ["oracle", "insert", "批量"]
[extra]
cover = "https://picsum.photos/400"
+++
[Put Your Arrays in a Bind](https://blogs.oracle.com/connect/post/put-your-arrays-in-a-bind)



原理应该是一次性发到服务器; 减少往返
