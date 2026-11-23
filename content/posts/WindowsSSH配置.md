+++
title = "Windows 下 SSH 中的 Config 文件教程"
date = "2026-03-04 21:52:54"
slug = "WindowsSSH配置"
description = "Windows下SSH config教程：用Host别名配HostName、User、IdentityFile与Port简化连接，icacls限权仅当前用户。"
[taxonomies]
tags = ["ssh", "win10", "权限"]
+++
# Windows 下 SSH 中的 Config 文件教程

本教程介绍如何在 Windows 系统上创建和使用 SSH 配置文件（`~/.ssh/config`），以简化 SSH 连接。通过定义主机别名和连接设置，可以让 SSH 命令更简洁、更易于管理。以下内容基于提供的真实配置文件，略去敏感数据，并保留其结构和注释。

有关更多详细信息，请参阅 [SSH 配置文件文档](https://linux.die.net/man/5/ssh_config)。

# Read more about SSH config files: https://linux.die.net/man/5/ssh_config

## 为什么使用 SSH 配置文件？

- 通过别名简化 SSH 命令，无需输入完整的域名或 IP 地址。
- 存储连接信息（如用户名、端口、密钥文件），便于管理。
- 指定首选认证方式和密钥文件，提升安全性。

## 文件位置

在 Windows 上，SSH 配置文件通常位于用户目录下的 `.ssh` 文件夹，即 `C:\Users\<用户名>\.ssh\config`（或在 PowerShell 中表示为 `~/.ssh/config`）。如果文件不存在，可按以下步骤创建：

1. **创建 .ssh 目录**（如果不存在）：
   
   ```bash
   mkdir ~/.ssh
   ```

2. **创建或编辑 config 文件**：  
   使用文本编辑器（如记事本、VS Code）创建或编辑 `config` 文件：
   
   ```bash
   notepad ~/.ssh/config
   ```

3. **设置权限**：  
   Windows 的 SSH 客户端（例如 OpenSSH）对文件权限要求严格。确保 `.ssh` 目录和 `config` 文件只有当前用户有访问权限：
   
   - 右键 `.ssh` 文件夹，选择“属性” -> “安全”，确保只有当前用户具有完全控制权限，其他用户（如 Everyone）无访问权限。
   
   - 对 `config` 文件，同样确保只有当前用户有读写权限。
   
   - 使用 PowerShell 设置权限：
     
     ```powershell
     icacls "C:\Users\<用户名>\.ssh" /inheritance:r
     icacls "C:\Users\<用户名>\.ssh" /grant:r "%username%:F"
     icacls "C:\Users\<用户名>\.ssh\config" /inheritance:r
     icacls "C:\Users\<用户名>\.ssh\config" /grant:r "%username%:F"
     ```

## 基本语法

SSH 配置文件中的每个主机条目遵循以下结构：

```
Host <别名>
    HostName <主机名或 IP>
    User <用户名>
    IdentityFile <私钥文件路径>
    Port <端口号>
```

- `Host`：连接的别名，方便记忆和使用。
- `HostName`：实际的主机名或 IP 地址。
- `User`：用于认证的用户名。
- `IdentityFile`：私钥文件的路径（例如 `~/.ssh/id_rsa`）。
- `Port`：（可选）SSH 端口号，默认为 22。

## 示例 SSH 配置文件

以下是基于提供的真实配置文件的示例，保留了原始结构和注释，去除了敏感数据（如特定 IP 地址和用户邮箱）：

```
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
# alias
Host huawei
    HostName server1.example.com
    User root
    IdentityFile ~/.ssh/idrsa
    # "F:/encryption/.ssh/id_rsa" 注意只能使用用户目录路径，否则需配置环境变量
    # IdentitiesOnly

Host vm.centos7
    # HostName <注释掉的公网 IP>
    HostName 192.168.58.129
    # HostName <注释掉的 IPv6 地址>
    User root
    # Port 28322
    IdentityFile ~/.ssh/rsahuowei

Host vm.c8
    # HostName 192.168.58.128
    HostName fd15:4ba5:5a2b:1008:1579:b10:8e61:bd2a
    # HostName <注释掉的公网 IP>
    # Port 28222
    User root
    IdentityFile ~/.ssh/rsahuowei

# 不要删，git
Host github.com
    HostName ssh.github.com
    User git
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/idrsa
    Port 443
```

### 条目说明

1. **huawei**：
   
   - 别名：`huawei`
   - 连接到 `server1.example.com`（示例主机名，替换了原始 IP），使用用户 `root` 和私钥 `~/.ssh/idrsa`。
   - 注释提到避免使用非用户目录路径（如 `F:/encryption/.ssh/id_rsa`），建议始终使用 `~/.ssh/`。
   - 默认使用端口 22。

2. **vm.centos7**：
   
   - 别名：`vm.centos7`
   - 连接到本地 IP `192.168.58.129`，使用用户 `root` 和私钥 `~/.ssh/rsahuowei`。
   - 包含注释掉的公网 IP 和 IPv6 地址，以及未启用的端口 `28322`。

3. **vm.c8**：
   
   - 别名：`vm.c8`
   - 连接到 IPv6 地址 `fd15:4ba5:5a2b:1008:1579:b10:8e61:bd2a`，使用用户 `root` 和私钥 `~/.ssh/rsahuowei`。
   - 包含注释掉的本地 IP、公网 IP 和端口 `28222`。

4. **github.com**：
   
   - 别名：`github.com`
   - 连接到 `ssh.github.com`，使用用户 `git` 和公钥认证。
   - 使用非标准端口 443 以绕过某些网络限制。
   - 指定私钥 `~/.ssh/idrsa`。

## 使用配置文件

设置好配置文件后，可以通过别名连接到服务器。例如：

```bash
ssh huawei
```

等效于：

```bash
ssh root@server1.example.com -i ~/.ssh/idrsa -p 22
```

对于 GitHub，可以使用以下命令克隆仓库或推送更改：

```bash
git clone git@github.com:user/repo.git
```

SSH 配置文件会确保使用指定的设置（如端口 443 和正确的密钥）。

## 注意事项

- **密钥文件路径**：始终使用 `~/.ssh/` 作为密钥文件路径，避免使用绝对路径（如 `F:/encryption/.ssh/id_rsa`），以防止环境变量问题。

- **权限设置**：
  
  - `.ssh` 目录必须只有当前用户有完全控制权限（相当于 Unix 的 `700`）。
  
  - `config` 文件和密钥文件（如 `idrsa`、`rsahuowei`）必须只有当前用户有读写权限（相当于 Unix 的 `600`）。
  
  - 设置密钥文件权限：
    
    ```powershell
    icacls "C:\Users\<用户名>\.ssh\idrsa" /inheritance:r
    icacls "C:\Users\<用户名>\.ssh\idrsa" /grant:r "%username%:F"
    icacls "C:\Users\<用户名>\.ssh\rsahuowei" /inheritance:r
    icacls "C:\Users\<用户名>\.ssh\rsahuowei" /grant:r "%username%:F"
    ```

- **注释行**：使用 `#` 注释掉不需要的配置项，便于测试或临时禁用。

- **多主机配置**：可以根据需要定义多个 `Host` 条目。

## 故障排除

- **权限错误**：检查 `IdentityFile` 路径是否正确，密钥文件和 `config` 文件是否具有正确的权限（仅当前用户可读写）。
- **连接被拒绝**：确认 `HostName` 和 `Port` 是否正确，服务器是否可访问。
- **配置文件被忽略**：确保 `config` 文件位于 `~/.ssh/config`，并且权限正确。
- **Windows 特定问题**：如果使用 Git Bash 或 WSL，路径需使用 Unix 风格（如 `~/.ssh/idrsa`），而非 Windows 路径。

本教程基于提供的真实配置文件，保留了其结构和注释，提供了在 Windows 系统上设置和使用 SSH 配置文件的基础知识，帮助你更高效地管理 SSH 连接。
