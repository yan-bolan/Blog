+++
title = "json java解析"
date = "2019-11-13 13:52:21"
updated = "2021-05-14 22:02:33"
slug = "15dfb87e"
aliases = ["/2019/11_13_15dfb87e.html"]
description = "fastjson 解析对象套数组的 JSON：parseObject 取对象，数组字段再 parseArray，元素须 toString 再取值，忌直接强转。"
[extra]
category = "javaweb"
categories = ["javaweb"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/20210311124333-The-executioner-and-her-way-of-life.jpg"
[taxonomies]
tags = ["java", "json", "fastjson"]
+++
﻿fastjson
因为json中即有对象也有数组
{imgurl:xxx, [{}]}

```java
 JSONObject json = JSON.parseObject(jsonStr);
     String  newslist = json.getString("newslist");//因为对象中有数组
    JSONArray jsonArr = JSON.parseArray(newslist);//数组中再取

    String first = jsonArr.get(0).toString();// 第一个  原因是：改提取出来的对象不能转为String，而要通过它的方法 toString 来转化：
    JSONObject imgurljson = JSON.parseObject(first);
    String imgurl = imgurljson.getString("imgurl");
    String date=json.getString("date");
```
多转一次就行，取对象中newslist转数组，再转jsonstring,再取值