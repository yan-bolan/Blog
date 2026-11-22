+++
title = "Linux服务systemd管理版本"
date = "2025-06-07 08:04:50"
slug = "40efcbea"
aliases = ["/2025/06_07_40efcbea.html"]
description = "介绍systemd管理.NET服务的版本方案：unit文件版本控制、releases加current符号链接原子切换与回滚、蓝绿零停机部署及健康检查自动回退。"
[taxonomies]
tags = ["AI"]
[extra]
cover = "https://api.paugram.com/wallpaper/?source=sm"
+++
在 Linux 中使用 systemd 管理 .NET 服务时，版本管理主要涉及**服务文件版本控制**和**应用程序版本部署**两个层面。以下是详细方案：

---

### 一、服务文件版本控制（systemd unit 文件）

#### 1. 创建服务文件（e.g. `myapp.service`）

```ini
[Unit]
Description=My .NET Application
After=network.target

[Service]
# 版本管理核心：通过变量指定应用路径
Environment=DOTNET_ROOT=/opt/dotnet
WorkingDirectory=/opt/myapp/current/  # 指向当前版本的符号链接
ExecStart=/opt/myapp/current/MyApp.dll
Restart=always
RestartSec=10
User=myappuser
SyslogIdentifier=myapp

[Install]
WantedBy=multi-user.target
```

#### 2. 服务文件版本管理

```bash
# 将服务文件纳入 Git 仓库
sudo mv myapp.service /etc/systemd/system/
cd /etc/systemd/system/
sudo git init  # 初始化仓库（生产环境建议单独管理）
sudo git add myapp.service
sudo git commit -m "Add service file v1.0"
```

---

### 二、.NET 应用程序版本部署

#### 1. 版本化目录结构

```bash
/opt/myapp/
├── releases/
│   ├── v1.0.0/# 具体版本目录
│       ├── AppConfig/       
│   ├── v1.1.0/
│       ├── AppConfig/     
│   └── v2.0.0/
│       ├── AppConfig/     
├── current -> releases/v2.0.0  # 符号链接指向当前版本
│── AppConfig/ 此处为Appconfig服务器版本， 上面1.0都是开发本地版本，如何将current/    
└── backups/
```

#### 2. 部署新版本脚本示例

```bash
#!/bin/bash
VERSION="v2.0.0"
RELEASE_DIR="/opt/myapp/releases/$VERSION"

# 1. 发布新版本
dotnet publish -c Release -o "$RELEASE_DIR"

# 2. 切换版本 (原子操作)
ln -sfn "$RELEASE_DIR" /opt/myapp/current

# 3. 重启服务
sudo systemctl restart myapp.service

# 4. 保留最近5个版本 (可选)
ls -dt /opt/myapp/releases/* | tail -n +6 | xargs rm -rf
```

---

### 三、关键版本管理技巧

1. **零停机部署**（蓝绿部署）
   
   ```bash
   # 启动新版本实例（不同端口）
   dotnet run --urls http://localhost:5001 &
   
   # 切换反向代理（Nginx）
   sudo sed -i 's/5000/5001/g' /etc/nginx/sites-enabled/myapp
   sudo nginx -s reload
   
   # 停止旧版本
   kill $(pgrep -f "dotnet.*5000")
   ```

2. **版本回滚**
   
   ```bash
   # 回退到 v1.1.0
   ln -sfn /opt/myapp/releases/v1.1.0 /opt/myapp/current
   sudo systemctl restart myapp.service
   ```

3. **状态验证**
   
   ```bash
   # 检查版本健康
   curl -s http://localhost/api/version | jq .version
   
   # 查看服务状态
   journalctl -u myapp.service -n 50 --no-pager
   ```

---

### 四、进阶管理方案

| 工具                 | 适用场景                     | 版本管理特性          |
| ------------------ | ------------------------ | --------------- |
| **Docker**         | 容器化部署                    | 镜像标签版本控制        |
| **Kubernetes**     | 大规模集群部署                  | Deployment 滚动更新 |
| **Ansible**        | 配置自动化                    | Playbook 版本控制   |
| **CI/CD Pipeline** | 自动化发布（GitLab CI/Jenkins） | 构建产物版本归档        |

---

### 五、最佳实践

1. **版本命名规范**：使用语义化版本 `vMAJOR.MINOR.PATCH`

2. **配置分离**：应用程序配置通过 `appsettings.Production.json` 或环境变量注入

3. **日志管理**：配置 `journald` 持久化日志
   
   ```ini
   [Service]
   StandardOutput=syslog
   StandardError=syslog
   ```

4. **自动回滚**：在部署脚本中添加健康检查，失败时自动回退版本

> 💡 提示：对于 .NET 6+ 应用，推荐使用 `Microsoft.Extensions.Hosting.Systemd` 包优化集成：
> 
> ```csharp
> builder.Services.AddSystemd(); // Program.cs 中添加
> ```

通过以上方案，可实现 systemd 下 .NET 服务的可靠版本管理和无缝部署。

---

usermod -aG groupname username

如果你想查看用户所属的群组，可以使用以下命令

groups username
