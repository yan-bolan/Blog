---
title: js网络变化
date: 2019-10-16 13:23:47.0
updated: 2021-05-14 22:02:36.828
url: https://yayi.site/archives/js网络变化
categories: javaweb
tags: 
---


﻿

```javascript
window.ononline = function() {
				alert("链接上网络了");
			}
			window.onoffline = function() {
				alert("网络链接已断开");
			}

    // Your code here...
    window.addEventListener('online', function(){
    alert('网络连接恢复！');
})
window.addEventListener('offline', function(){
    alert('网络连接中断！');
})
```

只能判断网线插拨，不能判断ping通