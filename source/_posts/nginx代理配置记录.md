---
title: nginx代理配置记录
tags: nginx
date: 2022-04-12 00:17:55

---

[nginx配置反向代理规则集合 - 不懂123 - 博客园](https://www.cnblogs.com/yxh168/p/13448631.html)

如上：    主要分两部分：模式部分 加内容；

  location语法规则

        location [=|~|~*|^~|@] /uri/ { ... }  location分为两个部分

        [=|~|~*|^~|@] 第一个部分  

           = : 表示精确匹配后面的url  
           ~ : 表示正则匹配，但是区分大小写  
           ~* : 正则匹配，不区分大小写  
           ^~ : 表示普通字符匹配，如果该选项匹配,只匹配该选项.不匹配别的选项,一般用来匹配目录  
          @ : "@" 定义一个命名的 location，使用在内部定向时，例如 error_page

           = 是精确完整匹配, 且优先级最高  
          正则匹配时，如果 ~ 和 ^~ 同时匹配规则，则 ^~ 优先  
           ^~ 这个不会匹配请求url中后面的路径, 如上面的 /test/hello 没有匹配上  
          ^~ 不支持正则，和=相比，范围更广， hellowo 是可以被^~匹配，但是 = 不会匹配  
          ~ 路径中只要包含就可以匹配，如上面的 /test/hellowo 返回了602

        /uri/ 第二个部分

            这里主要填的就是需要匹配的path路径,根据前面的符号,这里可以填写精确的path路径.

\$scheme 可以代表协议； \$ request_url可以代表uri;

proxy pass 带不带/是有区别的；

[如何配置 nginx 反向代理，重写路径？](https://www.leafage.top/posts/detail/21C23E1ZR)

   转发的请求路径是不一样的；

rewrite  就不介绍了；

下面记录一下，以便直接复制；    

```nginx
 # 不带/
  location /NginxTest/ {
      proxy_pass  http://abc.com:8080;
  }
  # 带/
  location /NginxTest/ {
      proxy_pass  http://abc.com:8080/;# 会删除NginxTest
  }
```

对于url有验证的ap程序，应？

主要得自己写一遍配置
