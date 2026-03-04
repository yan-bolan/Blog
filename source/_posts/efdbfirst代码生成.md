---
title: efdbfirst代码生成
tags:
  - ef
cover: 'https://api.paugram.com/wallpaper/?source=sm'
abbrlink: dd5317cb
date: 2025-11-16 12:33:53
---

你已经非常清楚地规划了 README.md 的结构和内容，以下是我根据你的要求整理并美化后的版本，保持原始版本号不变，使用层级标题、代码块、分隔线，并加入适当的 emoji 图标提升可读性：

---

# 📦 EF Core 生成与 Scaffold 操作说明

## ⚙️ 环境与工具版本（请尽量保持一致）

- 安装 dotnet-ef 工具：
  
  ```bash
  dotnet tool install --global dotnet-ef --version 7.0.14
  ```

- 在 EFCORE 专案中需安装的 NuGet 套件：
  
  ```bash
  dotnet add package Microsoft.EntityFrameworkCore --version 7.0.2
  dotnet add package Microsoft.EntityFrameworkCore.Design --version 7.0.3
  dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.3
  ```

---

## 🧩 安装自订模板（7.0 以上才支持）

获取 EF Core 7.0 的 T4 模板，注意版本号需与工具一致，否则可能导致语法问题。

```bash
dotnet new install Microsoft.EntityFrameworkCore.Templates::7.0.3
dotnet new ef-templates --force
```

📌 T4 文件中可查到：

```csharp
if (!ProductInfo.GetVersion().StartsWith("10.0"))
```

> ⚠️ 注意：冒号分隔符 `::` 已弃用，建议使用 `@` 作为版本分隔符，例如：

```bash
dotnet new install Microsoft.EntityFrameworkCore.Templates@7.0.3
```

安装过程输出示例：

```
已安装 Microsoft.EntityFrameworkCore.Templates (版本 10.0.0)，它将替换为版本 7.0.3。
成功: Microsoft.EntityFrameworkCore.Templates::7.0.3 已安装以下模板:
模板名                                       短名称        语言  标记
-------------------------------------------  ------------  ----  ------------------
Entity Framework Core Scaffolding Templates  ef-templates  [C#]  EFCore/Scaffolding
```

✅ 默认安装最新版本：

```bash
dotnet new install Microsoft.EntityFrameworkCore.Templates
```

📁 在 EFCORE 专案目录 Innolux.EFCore 中执行：

```bash
dotnet new ef-templates --force
```

---

## 🏗️ 以 Scaffold 产生 DbContext 与 Model

📂 进入项目目录 Innolux.EFCore，执行以下命令：

```bash
dotnet ef dbcontext scaffold "server=10.0.16.60;Port=3306;uid=root;pwd=root;database=DCS_NET;AllowPublicKeyRetrieval=True;Allow Zero Datetime=True;CharSet=utf8mb4;SslMode=none;AllowLoadLocalInfile=true;" MySql.EntityFrameworkCore --context DcsMysqlContext --context-dir Model/NET/EF --namespace Innolux.EFCore.EF.Model.Dcs --context-namespace Innolux.EFCore.EF --output-dir Model/NET/EF/Model --no-onconfiguring --force
```

---

## 📁 目录与命名说明

- `--context DcsMysqlContext`  
  → 产生的 DbContext 名称为 **DcsMysqlContext**

- `--context-dir Model/NET/EF`  
  → DbContext 文件位置为 **Model/NET/EF**

- `--namespace Innolux.EFCore.EF.Model.Dcs`  
  → Model 类命名空间为 **Innolux.EFCore.EF.Model.Dcs**

- `--context-namespace Innolux.EFCore.EF`  
  → DbContext 命名空间为 **Innolux.EFCore.EF**

- `--output-dir Model/NET/EF/Model`  
  → 实体 Model 类输出至 **Model/NET/EF/Model**

- `--no-onconfiguring`  
  → 不自动生成 `OnConfiguring` 方法（建议使用 DI 注入）

- `--force`  
  → 覆写已存在的文件

---

## 📝 小提示

- ✅ 请确保当前目录为 `Innolux.EFCore` 项目根目录。
- 🔄 若需切换数据库或环境，请修改连接字符串后重新执行 scaffold。
- 🛠️ 若需自定义模板行为，可修改 ef-templates 内容后使用 `--force` 重新生成。

---

 

----

原文：

**考虑如何编写README.md**

我需要创建一个符合开发者规则的文件，使用层级化的标题，内容要简洁清晰，版本不变。虽然“8.0 2”可能是个小错误，但用户要求不要更改版本号，因此我会保留它。命令部分要用代码块，确保没有额外的评论。每个步骤都要列出，包括项目目录“Innolux.EFCore”。我会保持结构清晰，确保每个步骤明确。

# EF Core 生成与 Scaffold 操作说明

## 环境与工具版本（请尽量保持一致）

- dotnet-ef 工具

  ```bash

  dotnet tool install --global dotnet-ef --version 7.0.14

  ```

- 在 EFCORE 专案中需安装的 NuGet 套件

  dotnet add package Microsoft.EntityFrameworkCore --version 7.0.2

  dotnet add package Microsoft.EntityFrameworkCore.Design --version 7.0.3

  dotnet add package Microsoft.EntityFrameworkCore.Tools --version 7.0.3

  ```

---

## 安裝自訂模板 7.0以上才支持

获取 EF Core 7.0 的 T4 模板，注意版本号与上面工具也要一致，不然可能导致生成的 语法问题

dotnet new install Microsoft.EntityFrameworkCore.Templates::7.0.3

  dotnet new ef-templates --force

  t4文件中可查到    if (!ProductInfo.GetVersion().StartsWith("10.0")) 这个版本号是10

```bash
 dotnet new install Microsoft.EntityFrameworkCore.Templates::7.0.3

已弃用冒号分隔符 "::"，以支持在 dotnet 新安装中使用符号 “@” 分隔程序包和版本。在你的案例中，这意味着使用 Microsoft.EntityFrameworkCore.Templates@7.0.3 而不是 Microsoft.EntityFrameworkCore.Templates::7.0.3。

将安装以下模板包:

   Microsoft.EntityFrameworkCore.Templates::7.0.3



已安装 Microsoft.EntityFrameworkCore.Templates (版本 10.0.0)，它将替换为 版本 7.0.3。

已成功卸载 Microsoft.EntityFrameworkCore.Templates::10.0.0。

成功: Microsoft.EntityFrameworkCore.Templates::7.0.3 已安装以下模板:

模板名                                       短名称        语言  标记

-------------------------------------------  ------------  ----  ------------------

Entity Framework Core Scaffolding Templates  ef-templates  [C#]  EFCore/Scaffolding
```

以下会默认最新版本。。。。。。

- 安裝 EF Core 自訂模板

  ```bash

  dotnet new install Microsoft.EntityFrameworkCore.Templates

  ```

- 在 EFCORE 專案中（專案目錄為 Innolux.EFCore）產生模板

  ```bash

  # 於 Innolux.EFCore 專案根目錄執行

  dotnet new ef-templates --force

  ```

---

## 以 Scaffold 產生 DbContext 與 Model

- 進入 EFCORE 專案目錄 Innolux.EFCore，執行以下命令（請在專案根目錄執行）：

  ```bash

  dotnet ef dbcontext scaffold "server=10.0.16.60;Port=3306;uid=root;pwd=root;database=DCS_NET;AllowPublicKeyRetrieval=True;Allow Zero Datetime=True;CharSet=utf8mb4;SslMode=none;AllowLoadLocalInfile=true;" MySql.EntityFrameworkCore --context DcsMysqlContext --context-dir Model/NET/EF  --namespace Innolux.EFCore.EF.Model.Dcs  --context-namespace Innolux.EFCore.EF   --output-dir Model/NET/EF/Model       --no-onconfiguring   --force

  ```

---

## 目錄與命名說明

- --context DcsMysqlContext  

  - 產生的 DbContext 名稱為 **DcsMysqlContext**

- --context-dir Model/NET/EF  

  - DbContext 檔案會放在 **Model/NET/EF**

- --namespace Innolux.EFCore.EF  

  - 產生的類別命名空間為 **Innolux.EFCore.EF**

- --context-namespace Innolux.EFCore.EF  

  - DbContext 的命名空間為 **Innolux.EFCore.EF**

- --output-dir Model/NET/EF/Model  

  - 實體 Model 類別輸出到 **Model/NET/EF/Model**

- --no-onconfiguring  

  - 不會在 DbContext 中自動產生 OnConfiguring 方法（建議透過 DI 與設定檔注入連線）

- --force  

  - 覆寫既有檔案

---

## 小提示

- 確認執行命令時當前工作目錄為 Innolux.EFCore 專案根目錄。  

- 若需要不同連線或環境，請在連線字串調整後再執行 scaffold。  

- 若需自訂 template 或 scaffold 行為，可先修改或檢視安裝的 ef-templates 內容，再使用 `--force` 覆寫產出。
