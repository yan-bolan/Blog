+++
title = "TLS、ALPN 与子域名分流排查记录"
date = "2026-10-18 18:44:38"
slug = "TLS-ALPN-routing"
description = "排查Android客户端拿到自签名证书：OpenResty按ALPN分流，无ALPN落入RDP后端；在SNI映射加子域名通配指向web后端，修复后证书正常。"
+++
# TLS、ALPN 与子域名分流排查记录

## 脱敏约定

本文使用以下别名，不记录真实域名或公网 IP：

- `MATRIX_HOST`：Matrix homeserver 域名
- `CHAT_HOST`：网页客户端域名
- `BASE_DOMAIN`：两者所属的基础域名
- `SERVER_IP`：服务器公网 IP

## 问题现象

- 浏览器访问网站正常，但 Android 客户端连接异常。
- 从外部检查时，访问 `MATRIX_HOST`、`CHAT_HOST` 有时看到 `CN=yanbolan` 的自签名证书，且证书没有域名 SAN。
- 为两域名配置的 1Panel 网站证书本身正确：Matrix 域名使用覆盖 `BASE_DOMAIN` 子域名的受信任通配符证书；Chat 域名使用匹配其域名的受信任证书。

## 原因

公网 TCP 443 由 OpenResty `stream` 层接收，再根据 ClientHello 中的信息选择后端：

1. SNI 映射优先将指定的 Xray REALITY 伪装域名送至 `xray_backend`。
2. 其他流量再按 ALPN 判断：带 `h2` 或 `http/1.1` 的连接送至 `web_backend`，没有 ALPN 的连接默认送至 `rdp_backend`。
3. 因此，浏览器通常因发送 ALPN 而进入网站后端；不发送 ALPN 的 TLS 客户端可能被送往 RDP 后端，并收到该后端的自签名证书。

ALPN 是否发送由客户端 TLS 实现及连接类型决定。浏览器通常会发送 HTTP/2 和/或 HTTP/1.1 的 ALPN；Android 并非整体不支持 ALPN，但不同 App、网络库、系统版本或连接类型可能表现不同。

## 已实施的配置变更

在 OpenResty 主配置的 SNI 映射中加入 `BASE_DOMAIN` 子域名通配规则，置于默认规则之前：

```nginx
map $ssl_preread_server_name $backend_name {
    www.cloudflare.com  xray_backend;
    ~*^([^.]+\.)+BASE_DOMAIN$  web_backend;
    default  $alpn_backend;
}
```

实际配置中，正则里的 `BASE_DOMAIN` 应替换为真实基础域名，并按 Nginx 正则语法转义点号。此规则匹配一级及多级子域名，不匹配裸域 `BASE_DOMAIN`。Xray 的精确 SNI 规则仍优先。

此修改只负责 443 的 TCP/TLS 分流，不会自动创建 1Panel 网站或申请证书。新增子域名仍需 DNS 指向服务器、在 OpenResty 配置对应站点，并确保该域名被有效证书覆盖。

## 验证记录

- 修改前，指定 `h2` 或 `http/1.1` 的 TLS 请求收到匹配网站域名的证书；不指定 ALPN 时，两个域名都收到 `CN=yanbolan` 的自签名证书。
- 修改后，`nginx -t` 语法检查成功，OpenResty 容器重启且正常运行。
- 修改后，不指定 ALPN 测试 `MATRIX_HOST` 和 `CHAT_HOST`，均收到匹配域名的受信任证书；stream 日志显示两者进入 `web_backend`。

注意：不指定 ALPN 的 OpenSSL 命令只是用于验证服务器的无 ALPN 分支，不能据此断定 Android App 没有发送 ALPN。需要确认特定 App 的行为时，应在其发起连接期间观察分流日志，并检查该条连接的 SNI 和 ALPN；不要把无关扫描流量当作 App 流量。
