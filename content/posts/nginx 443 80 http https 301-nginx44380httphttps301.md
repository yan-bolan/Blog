+++
title = "nginx 443 80 http https 301"
date = "2021-03-20 17:35:19"
updated = "2021-05-14 22:02:51"
slug = "71a5c8f9"
aliases = ["/2021/03_20_71a5c8f9.html"]
[extra]
cover = "https://cdn.jsdelivr.net/gh/tangxingithub/picbed/img/20210311125432-warteergirls.png"
+++
﻿利用重定向来全部443
要www 还是不要的好。不知道，听说www不要的话，一些网站有些问题

301重定向永久之后，通过F12》disable cache禁用缓存来解决，否则浏览器会缓存301到本地，导致更新不起作用，google chrome 是这样的。