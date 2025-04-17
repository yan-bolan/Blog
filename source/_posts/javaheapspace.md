---
title: javaheapspace
tags:
  - jdk
cover: 'https://picsum.photos/400'
abbrlink: 169edcb7
date: 2023-07-11 21:54:21
---

sqldevloper 64 jdk 更大的

因为32位的 设定太高，就会创建失败

```java
AddVMOption -Xmx4096M
```

有几个路径：没有权限的话，或者绿色版？

1. %appdata%

C:\Users\{username}\AppData\Roaming\sqldeveloper\19.2.1\product.conf

2. 安装目录bin下的ide.conf 或者sqldevloper.conf

这个文件可以设定64JDK



ide.conf:中，也指出了不应该更改这个文件，应改appdata下的文件



```roboconf

# Relative paths are resolved against the parent directory of this file.
#
# The format of this file is:
#
#    "Directive      Value" (with one or more spaces and/or tab characters
#    between the directive and the value)  This file can be in either UNIX
#    or DOS format for end of line terminators.  Any path seperators must be
#    UNIX style forward slashes '/', even on Windows.
#
# This configuration file is not intended to be modified by the user.  Doing so
# may cause the product to become unstable or unusable.  If options need to be
# modified or added, the user may do so by modifying the custom configuration files
# located in the user's home directory.  The location of these files is dependent
# on the product name and host platform, but may be found according to the
# following guidelines:
#
# Windows Platforms:
#   The location of user/product files are often configured during installation,
#   but may be found in:
#     %APPDATA%\<product-name>\<product-version>\product.conf
#     %APPDATA%\<product-name>\<product-version>\jdev.conf
#
# Unix/Linux/Mac/Solaris:
#   $HOME/.<product-name>/<product-version>/product.conf
#   $HOME/.<product-name>/<product-version>/jdev.conf
#
# In particular, the directives to set the initial and maximum Java memory
# and the SetJavaHome directive to specify the JDK location can be overridden
# in that file instead of modifying this file.
```
