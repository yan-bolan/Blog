+++
title = "python3 thread not working  坑"
date = "2021-03-30 19:58:31"
updated = "2021-05-14 22:02:20"
slug = "1e98952d"
aliases = ["/2021/03_30_1e98952d.html"]
[taxonomies]
tags = ["python,多进程,tuple"]
[extra]
category = "python"
categories = ["python"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/結城·友奈2.png"
+++
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