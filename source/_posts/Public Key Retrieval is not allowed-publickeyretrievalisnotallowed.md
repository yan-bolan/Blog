---
title: Public Key Retrieval is not allowed
date: 2019-10-16 23:06:20.0
updated: 2021-05-14 22:02:17.215
url: https://yayi.site/archives/publickeyretrievalisnotallowed
categories: javaweb
tags: 
---


﻿很多种可能。
有一种是url问题
URI = "jdbc:mysql://localhost:3306/user?useSSL=false&serverTimezone=UTC";
传三个参数试试
DriverManager.getConnection(URI,USER,PASS);