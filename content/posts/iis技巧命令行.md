+++
title = "iis技巧命令行"
date = "2024-11-10 21:53:23"
slug = "a040c78f"
aliases = ["/2024/11_10_a040c78f.html"]
description = "IIS 站点配置在 applicationHost.config，用 appcmd 命令行修改，日志按 W3SVC 编号存于 inetpub 的 logs。"
[taxonomies]
tags = ["iis"]
[extra]
cover = "https://picsum.photos/400"
+++
存放的是网站列表配置信息,复制到目标服器相同目泉下(建议备份目标服器原文件)。
路彳圣:C:\VVindows\System32\inetsnAconfig\
c$\Windows\System32\inetsrv\Config
文亻牛名:applicationHostconfig
可以用记事本打开,修改配置文件。

用域名找

appcmd 命令行工具
日誌位置：
%SystemDrive%\inetpub\logs\LogFiles

以W3SVC1为例，W3SVC代表万维网服务，1代表部署站点的编号。
