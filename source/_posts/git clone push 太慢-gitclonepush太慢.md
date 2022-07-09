---
title: git clone push 太慢
date: 2020-06-19 20:49:29.0
updated: 2021-05-14 22:01:24.496
url: https://yayi.site/archives/gitclonepush太慢
categories: 网络
tags: proxy,git
---


﻿git config --global https.proxy socks5://127.0.0.1:1080

git config --global http.proxy socks5://127.0.0.1:1080

因为我有代理。==但是它却没有走这个代理 == 。只能手动。如果哪天没有代理了，怎么取消呢？