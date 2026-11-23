+++
title = "javaweb spring   requestmap404"
date = "2019-11-10 12:05:35"
updated = "2021-05-14 22:02:27"
slug = "5a3762d0"
aliases = ["/2019/11_10_5a3762d0.html"]
description = "Spring @RequestMapping 方法映射不要多加斜杠，否则 404；文中另附 jsp include、pixi 背景色等零散片段。"
[extra]
category = "javaweb"
categories = ["javaweb"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 風.png"
[taxonomies]
tags = ["spring", "jsp"]
+++
﻿spring 重定向：
[https://www.cnblogs.com/xiaoluohao/p/11354145.html](https://www.cnblogs.com/xiaoluohao/p/11354145.html)

jsp 包含文件html
[https://www.cnblogs.com/TirL/articles/8664017.html](https://www.cnblogs.com/TirL/articles/8664017.html)
 <%@ include file="flower.jsp" %><%--//(等于是将两个jsp合并为一个jsp)或--%> 简化代码

iframe 
[https://www.jianshu.com/p/9d98521fc8bc](https://www.jianshu.com/p/9d98521fc8bc)

idea 对本地历史好用 

pixi背景颜色
  generatePixi(0x12517b); /*背景颜色*/
  #号换成0x 


@requestmap 
方法的时候不要加/
/r
/r/ 是错的 404


jquary validate 验证错误红色显示
<style>
			input.error { border: 1px solid red; }
			label.error {
				font-weight: bold;
				color: red;
			}

		</style>