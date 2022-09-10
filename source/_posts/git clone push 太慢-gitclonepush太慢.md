---
title: git clone push 太慢
url: 'https://yayi.site/archives/gitclonepush太慢'
categories: 网络
cover: >-
  https://cdn.jsdelivr.net/gh/tangxingithub/picbed/img/20210311125559-9e794859e7f25a110df951d0b55e4815.png
tags: 'proxy,git'
abbrlink: 6df7b723
date: 2020-06-19 20:49:29
updated: 2021-05-14 22:01:24
---


﻿git config --global https.proxy socks5://127.0.0.1:1080

git config --global http.proxy socks5://127.0.0.1:1080

因为我有代理。==但是它却没有走这个代理 == 。只能手动。如果哪天没有代理了，怎么取消呢？