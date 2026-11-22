+++
title = "springport application.yaml端口"
date = "2020-10-08 21:06:20"
updated = "2021-05-14 22:03:55"
slug = "5c40672e"
aliases = ["/2020/10_08_5c40672e.html"]
description = "整理SpringBoot改端口的方式：命令行--server.port参数，或application.yml中server.port配置，支持环境变量占位。"
[taxonomies]
tags = ["java"]
[extra]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/犬吠·埼 樹.png"
+++
﻿51

As explained in Spring documentation, there are several ways to do that:

Either you set the port in the command line (for example 8888)

-Dserver.port=8888 or --server.port=8888

Example : java -jar -Dserver.port=8888 test.jar

Or you set the port in the application.properties

server.port=${port:4588}
or (in application.yml with yaml syntax)

server:
   port: ${port:4588}

---
Keep in mind that if your environment variables are MYPACKAGE_KEY_PUBLIC and MYPACKAGE_KEY_PRIVATE the keyname should only be MYPACKAGE_KEY.
heroku ssh key 

[https://devcenter.wercker.com/administration/environment-variables/ssh-keys/using-ssh-keys/](https://devcenter.wercker.com/administration/environment-variables/ssh-keys/using-ssh-keys/)
系统变量