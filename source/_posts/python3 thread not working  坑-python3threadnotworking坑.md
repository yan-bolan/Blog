---
title: python3 thread not working  坑
date: 2021-03-30 19:58:31.0
updated: 2021-05-14 22:02:20.427
url: https://yayi.site/archives/python3threadnotworking坑
categories: python
tags: python,多进程,tuple
---


﻿
多线程不报错，
多进程不报错

A
B
C（A，B）
A,B写在上面

_thread （）函数线程，要使用，tuple 再加个==逗号==！！

```python
 _thread.start_new_thread(sava_to_el, (data, job_id,))
```

而from concurrent.futures.thread import ThreadPoolExecutor  中
```python
 pool.submit(sava_to_el, data, id)
```
不要tuple 。。。。。。。。。。。。不要括号民
不报错。。。。。