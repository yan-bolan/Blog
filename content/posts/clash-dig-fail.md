+++
title = "clash dig fail"
date = "2023-10-14 09:42:25"
slug = "186421e6"
aliases = ["/2023/10_14_186421e6.html"]
description = "Clash TUN 模式下 dig 反推域名失败，多因浏览器默认开启安全 DNS 干扰劫持，关闭浏览器安全 DNS 即可恢复。"
[taxonomies]
tags = ["clash", "dns", "tun"]
[extra]
cover = "https://picsum.photos/400"
+++
 试一下

注意

近期大部分浏览器默认已经开启“**安全 DNS**”功能，此功能会影响 TUN 模式劫持 DNS 请求导致反推域名失败，请在浏览器设置中关闭此功能以保证 TUN 模式正常运行
