+++
title = "无法下载goproxy"
date = "2019-10-25 20:59:27"
updated = "2021-05-14 22:05:00"
slug = "1d9e16f8"
aliases = ["/2019/10_25_1d9e16f8.html"]
[extra]
category = "Linux"
categories = ["Linux"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 風.png"
+++
﻿手动安装
#!/bin/bash
F="proxy-admin_linux-amd64.tar.gz"
cd /tmp
rm -rf $F
LAST_VERSION=$(curl --silent "https://api.github.com/repos/snail007/proxy_admin_free/releases/latest" | grep -Po '"tag_name": "\K.*?(?=")')
wget "https://github.com/snail007/proxy_admin_free/releases/download/${LAST_VERSION}/$F"

# #install
tar zxvf $F
chmod +x proxy-admin
./proxy-admin uninstall >/dev/null 2>&1 
./proxy-admin install
rm $F
systemctl  status proxyadmin &
sleep 1
echo "install done, please visit : http://YOUR_IP:32080/"