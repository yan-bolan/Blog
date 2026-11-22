+++
title = "WINDOW10解决CET问题"
date = "2026-07-31 10:10:59"
slug = "a0403f4"
aliases = ["/2026/07_31_a0403f4.html"]
description = "记录VS Code C#开发触发CET堆栈保护致闪退：不能升级时，在Exploit Protection把主程序与两个C#服务进程加白名单关CET，重启生效。"
[taxonomies]
tags = ["CET", "VSCODE", "C#"]
[extra]
cover = "https://api.paugram.com/wallpaper/?source=sm"
+++
# vscode报错：Your Windows doesn‘t fully support CET

# 说明

原本就是升级系统就好了，最简单的，但由于是一些原因....(管理问题)，没法升级。

只能通过添加白名单：

使用管理员权限，关闭硬件强制堆栈保护关闭，覆盖系统默认打开的设定。由于插件版本会变，所以用的是程序名称来加白名单。重启电脑即可。

注：加环境变量和xml是不行的，试过。这种AI乱写的。以下步骤参考AI

# VS Code C# 环境硬件强制堆栈保护 (CET) 问题排查与解决记录

## 问题描述

在 Windows 系统下使用 VS Code 进行 C# 开发时，由于 VS Code 主程序、C# 语言服务器或 C# Dev Kit 的底层编译特性不兼容，触发了系统的 **CET（硬件强制堆栈保护）** 拦截。导致语言服务器闪退、C# 方案总管（Solution Explorer）无法加载或系统弹出安全报错。

---

## 核心需要配置的三个目标文件

由于 C# 开发套件由多个独立进程协同工作，需要将以下三个核心 `.exe` 文件全部加入 CET 排除名单：

1. **VS Code 主程序**
* **文件名称**：`code.exe`

* **常见路径**：`C:\Users\<你的用户名>\AppData\Local\Programs\Microsoft VS Code\Code.exe`
2. **C# 基础语言服务器 (Roslyn 进程)**
* **文件名称**：`Microsoft.CodeAnalysis.LanguageServer.exe`

* **常见路径**：`C:\Users\<你的用户名>\.vscode\extensions\ms-dotnettools.csharp-*-win32-x64\.roslyn\`
3. **C# Dev Kit 后台服务宿主**
* **文件名称**：`Microsoft.VisualStudio.Code.ServiceHost.exe`

* **常见路径**：`C:\Users\<你的用户名>\.vscode\extensions\ms-dotnettools.csdevkit-*-win32-x64\内部文件夹`

---

## 解决方案：通过 Exploit Protection 禁用 CET

### 步骤 1：在 Windows 安全中心添加程序

1. 点击 Windows 开始菜单，搜索并打开 **Windows 安全中心**。

2. 依次进入：**应用和浏览器控制** -> 最下方的 **Exploit Protection 设置**。

3. 切换至 **程序设置** 选项卡。

4. 点击 **添加程序进行自定义** -> 选择 **选择精确的文件路径**。

5. 分别将上述 3 个 `.exe` 文件（`code.exe`、`Microsoft.CodeAnalysis.LanguageServer.exe`、`Microsoft.VisualStudio.Code.ServiceHost.exe`）通过绝对路径导入进来。

### 步骤 2：仅关闭 CET 选项

对于导入的每一个程序，在弹出的自定义设置列表中**向下滑动**，找到 **硬件强制堆栈保护 (CET)** 选项，并进行如下修改：

* 🛡️ **硬件强制堆栈保护 (CET)**：勾选 **「替代系统设置」** -> 将开关切换为 **「关」**

> ⚠️ *注意：列表中的其他所有安全选项（如 CFG、DEP、ASLR 等）请全部保持默认的【不勾选】状态，不要做任何改动。*

### 步骤 3：保存与生效

1. 点击 **应用** 保存设置。

2. **重新启动计算机**（CET 属于硬件和内核级防护，必须重启电脑才能让排除规则彻底生效）。

3. 重启后打开 VS Code，确认 C# 插件正常加载，报错消失。
