---
title: wsl自动登录xrdp
tags:
  - xrdp
cover: 'https://picsum.photos/400'
abbrlink: cfc5684dd
date: 2025-03-30 20:14:35
---

增强模式有一复制的特性好用

hyper安装的ubuntu已经自动登录了：需先登出，再选择增强模式登入

设置root密码

```
sudo -i
passwd
```

修改自动登录：

sudo vim /etc/xrdp/xrdp.ini
修改Xorg中的用户名/密码
[Xorg]
name=Xorg
lib=libxup.so
username=xxx
password=xxx
port=-1
code=20

还差一步，要选择xrog，还是xvnc

ubuntu图形化界面无法使用root登录
原因是：系统禁止了root账户登录图形界面
解决方案：
首先sudo su - root 切换到root用户
1、编辑vim /etc/pam.d/gdm-autologin 文件
把文件中的 auth required pam_succeed_if.so user != root quiet_success 注释掉
————————————————

                   原文链接：https://blog.csdn.net/Ki_Ki_/article/details/128832659

桌面版不允许root登录，所以还要设置一下：

#手工输入登陆系统的用户名和密码
greeter-show-manual-login=true
#禁用guest用户
all-guest=false
#启动后以root身份自动登录
autologin-user=root        
修改gdm-autologin、gdm-password文件

website: [How to allow GUI root login on Ubuntu 20.04 Focal Fossa Linux &#x2d; LinuxConfig](https://linuxconfig.org/how-to-allow-gui-root-login-on-ubuntu-20-04-focal-fossa-linux "https://linuxconfig.org/how-to-allow-gui-root-login-on-ubuntu-20-04-focal-fossa-linux")

In this article you will find out how to allow the root user to login to GUI [gnome Desktop](https://linuxconfig.org/how-to-install-gnome-on-ubuntu-20-04-lts-focal-fossa "gnome Desktop") on [Ubuntu 20.04](https://linuxconfig.org/ubuntu-20-04-guide "Ubuntu 20.04") Focal Fossa.

**In this tutorial you will learn:**

- How to set root password
- How to configure GDM to allow root gui login
- How to configure PAM to allow root gui login

[![Allow GUI root login on Ubuntu 20.04 Focal Fossa Linux Desktop](https://i-blog.csdnimg.cn/blog_migrate/6f602124409663c2260fffaad67f1ad7.png)](https://linuxconfig.org/wp-content/uploads/2019/12/01-how-to-allow-gui-root-login-on-ubuntu-20-04-focal-fossa-linux.png)

Allow GUI root login on Ubuntu 20.04 Focal Fossa Linux Desktop

### Software Requirements and Conventions Used

|     |     |
| --- | --- |Software Requirements and Linux Command Line Conventions
| Category | Requirements, Conventions or Software Version Used |
| --- | --- |
| System | [Installed Ubuntu 20.04](https://linuxconfig.org/how-to-install-ubuntu-20-04-focal-fossa-desktop "Installed Ubuntu 20.04") or [upgraded Ubuntu 20.04 Focal Fossa](https://linuxconfig.org/how-to-upgrade-ubuntu-to-20-04-lts-focal-fossa "upgraded Ubuntu 20.04 Focal Fossa") |
| Software | N/A |
| Other | Privileged access to your Linux system as root or via the `sudo` command. |
| Conventions | **#** – requires given [linux commands](https://linuxconfig.org/linux-commands "linux commands") to be executed with root privileges either directly as a root user or by use of `sudo` command<br>**$** – requires given [linux commands](https://linuxconfig.org/linux-commands "linux commands") to be executed as a regular non-privileged user |

### Allow GUI root login on Ubuntu 20.04 step by step instructions

---

---

1. First step is to set root password:
   
   $ sudo passwd
   
   The above command will [set a root password](https://linuxconfig.org/default-root-password-on-ubuntu-20-04-focal-fossa-linux "set a root password") which will be later user to login to [GUI](https://linuxconfig.org/ubuntu-20-04-gui-installation "GUI").

2. Next, step is to edit the `/etc/gdm3/custom.conf` GDM configuration file to allow root login.
   
   [![ALTTEXT](https://i-blog.csdnimg.cn/blog_migrate/2d0387433f6791bd2693819b812e62a2.png)](https://linuxconfig.org/wp-content/uploads/2019/12/02-how-to-allow-gui-root-login-on-ubuntu-20-04-focal-fossa-linux.png)
   
   use your favourite text editor and as a root user edit the `/etc/gdm3/custom.conf` file to add the `AllowRoot=true` line.

3. Next, edit PAM authentication daemon configuration file `/etc/pam.d/gdm-password` and comment line which denies root access to graphical user interface.
   
   To do so edit file `<mark>/etc/pam.d/gdm-password</mark>` and put `#` in front of the line containing:
   
   auth   required        pam_succeed_if.so user != root quiet_success

磁盘大小调整，有还原点的要选择avhdex文件

先编辑磁盘大小
