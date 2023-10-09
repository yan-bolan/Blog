---
title: nginx代理
tags:
  - 代理
  - nginx
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
abbrlink: dc13b4b1
date: 2023-09-18 19:37:59
---



原理不清楚，先学会用。

# nginx透明代理模式



Nginx 的透明代理模式是一种在代理服务器和客户端之间建立透明连接的方法。这种模式下，客户端并不知道请求是否经过代理服务器，并且请求的目标地址也不会改变。

Nginx 的透明代理模式通常用于网络隔离或者进行负载均衡等场景。为了实现透明代理，你需要在 Nginx 配置中指定代理服务器的 IP 地址和端口，并使用 proxy_pass 指令将请求转发到代理服务器。

举例来说，你可以这样配置 Nginx：

server { listen 80; server_name example.com;

ini

复制代码

`location / {     proxy_pass http://192.168.1.100:8080;     proxy_set_header Host $host;     proxy_set_header X-Real-IP $remote_addr;     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; }`

}





[nginx透明代理模式-掘金 (juejin.cn)](https://juejin.cn/s/nginx%E9%80%8F%E6%98%8E%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F)





可以看到服务器可以知道真实的IP;  相对于服务器透明？

# 反向代理



相对于服务器：你是被允许的？
