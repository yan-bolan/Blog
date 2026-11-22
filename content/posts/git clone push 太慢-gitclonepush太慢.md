+++
title = "git clone push 太慢"
date = "2020-06-19 20:49:29"
updated = "2021-05-14 22:01:24"
slug = "6df7b723"
aliases = ["/2020/06_19_6df7b723.html"]
description = "git clone、push 慢因未走本地代理，用 git config --global 设置 http/https 代理指向本机 socks5 端口加速。"
[taxonomies]
tags = ["proxy,git"]
[extra]
category = "网络"
categories = ["网络"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311125559-9e794859e7f25a110df951d0b55e4815.png"
+++
﻿git config --global https.proxy socks5://127.0.0.1:1080

git config --global http.proxy socks5://127.0.0.1:1080

因为我有代理。==但是它却没有走这个代理 == 。只能手动。如果哪天没有代理了，怎么取消呢？