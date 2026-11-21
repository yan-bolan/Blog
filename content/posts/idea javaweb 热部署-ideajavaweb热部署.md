+++
title = "idea javaweb 热部署"
date = "2019-10-08 18:38:20"
updated = "2021-05-14 22:00:42"
slug = "3106bc6a"
aliases = ["/2019/10_08_3106bc6a.html"]
[extra]
cover = "https://cdn.jsdelivr.net/gh/tangxingithub/picbed/img/20210311124333-The-executioner-and-her-way-of-life.jpg"
+++
﻿#### 　一：
第一步配置tomcat的deplotement里面要选择xxx.war exploded而不是xxx.war。如果是xxx.war的童鞋，请移除再加入xxx.war exploded。然后在tomcat的server里面on update action和on frame deactivation都选择update classes and resources就行了。
#### 二：　项目设置里面