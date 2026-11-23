+++
title = "Public Key Retrieval is not allowed"
date = "2019-10-16 23:06:20"
updated = "2021-05-14 22:02:17"
slug = "8a69a4f9"
aliases = ["/2019/10_16_8a69a4f9.html"]
description = "MySQL报Public Key Retrieval is not allowed：URL补useSSL=false与serverTimezone等参数可解。"
[extra]
category = "javaweb"
categories = ["javaweb"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 風.png"
[taxonomies]
tags = ["mysql", "java"]
+++
﻿很多种可能。
有一种是url问题
URI = "jdbc:mysql://localhost:3306/user?useSSL=false&serverTimezone=UTC";
传三个参数试试
DriverManager.getConnection(URI,USER,PASS);