+++
title = "ava.sql.SQLException The server time zone value '�й���׼ʱ��' is unrecognized or represents more than"
date = "2019-10-16 22:58:24"
updated = "2021-05-14 22:01:09"
slug = "b7f40c7f"
aliases = ["/2019/10_16_b7f40c7f.html"]
[extra]
category = "javaweb"
categories = ["javaweb"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 樹.png"
+++
﻿，版本不同，或者你连接数据库的url有问题，mysql连接要指定时间区域地域：
//static final String DB_URL = "jdbc:mysql://localhost:3306/你的数据库?useSSL=false&serverTimezone=UTC";