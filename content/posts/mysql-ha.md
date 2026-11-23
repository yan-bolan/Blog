+++
title = "mysql_ha"
date = "2025-03-31 21:28:17"
slug = "9fb9d8bc"
aliases = ["/2025/03_31_9fb9d8bc.html"]
description = "讲解MySQL双机主从与双向复制配置：复制账号、CHANGE MASTER、binlog位点同步，并修正原文重复建账号等问题，附验证与防火墙检查。"
[taxonomies]
tags = ["ha", "mysql", "主从复制"]
[extra]
cover = "https://picsum.photos/400"
+++
以下是原始文档的逐行解释及优化后的重写版本：

---

### 原始文档分析及改进建议

**一、服务器列表**

```
服务器名称    IP            Port
服务器1      10.18.20.1  3306
服务器2      10.18.20.2  3306
```

✅ 正确：清晰展示了服务器信息，但需注意：

- 实际配置中需使用IP而非服务器名称（因DNS解析可能不可用）
- 端口默认3306可省略说明

---

**二、备份与还原**

```
一、 mysql数据库备份与还原
# 先进行备用服务器的数据库还原...具体操作看另外文档
```

⚠️ 需补充：应在主从配置前完成数据同步，建议补充快速同步命令如：

```bash
mysqldump -h主服务器IP -uroot -p123456 --all-databases | mysql -h从服务器IP -uroot -p123456
```

---

**三、主服务器配置（以服务器1为例）**

```bash
# 创建复制账号（原始文档重复创建）
CREATE USER 'repl'@'10.18.20.%' IDENTIFIED WITH mysql_native_password BY 'repl';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'repl'@'10.18.20.%';
FLUSH PRIVILEGES;

# 查看二进制日志状态
SHOW MASTER STATUS; # 记录File和Position值
```

✅ 正确：但需注意：

1. 账号只需在主服务器创建一次
2. 若配置双向复制，两服务器均需执行此操作

---

**四、从服务器配置（以服务器2为例）**

```bash
CHANGE MASTER TO 
MASTER_HOST='10.18.20.1',  # 应直接使用IP
MASTER_PORT=3306,
MASTER_USER='repl',
MASTER_PASSWORD='repl',
MASTER_LOG_FILE='mysql1-bin.000001',  # 需替换实际值
MASTER_LOG_POS=900; 

START SLAVE;  # 8.0+版本推荐使用START REPLICA
SHOW REPLICA STATUS\G;  # 检查Slave_IO_Running和Slave_SQL_Running
```

⚠️ 问题：

1. 原始文档在从服务器重复创建复制账号（错误）
2. 使用服务器名称而非IP（应修正）
3. 未说明如何验证同步状态

---

**五、双向复制配置**
原始文档存在步骤重复：

- 服务器2不应再次创建复制账号
- 配置反向同步时应使用服务器2的binlog信息

---

### 优化后的配置文档

#### 服务器信息

| 服务器名称 | IP         | 角色  |
| ----- | ---------- | --- |
| 服务器1  | 10.18.20.1 | 主-从 |
| 服务器2  | 10.18.20.2 | 从-主 |

---

#### 一、数据同步准备

1. 在主服务器执行数据备份：
   
   ```bash
   mysqldump -h10.18.20.1 -uroot -p123456 --all-databases --master-data > master_dump.sql
   ```

2. 在从服务器还原数据：
   
   ```bash
   mysql -h10.18.20.2 -uroot -p123456 < master_dump.sql
   ```

---

#### 二、主服务器配置（服务器1）

```bash
mysql -uroot -p123456
> CREATE USER 'repl'@'10.18.20.%' IDENTIFIED WITH mysql_native_password BY 'repl';
> GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'repl'@'10.18.20.%';
> FLUSH PRIVILEGES;
> SHOW MASTER STATUS;  # 记录File(mysql-bin.000001)和Position(900)
```

---

#### 三、从服务器配置（服务器2）

```bash
mysql -uroot -p123456
> CHANGE MASTER TO
    MASTER_HOST='10.18.20.1',
    MASTER_USER='repl',
    MASTER_PASSWORD='repl',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=900;
> START REPLICA;
> SHOW REPLICA STATUS\G;  # 验证两个Running字段为Yes
```

---

#### 四、配置双向复制

1. 在服务器2创建复制账号：
   
   ```bash
   mysql -uroot -p123456
   > CREATE USER 'repl'@'10.18.20.%' IDENTIFIED WITH mysql_native_password BY 'repl';
   > GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'repl'@'10.18.20.%';
   > FLUSH PRIVILEGES;
   > SHOW MASTER STATUS;  # 记录File(mysql-bin.000001)和Position(900)
   ```

2. 在服务器1配置反向同步：
   
   ```bash
   mysql -uroot -p123456
   > CHANGE MASTER TO
    MASTER_HOST='10.18.20.2',
    MASTER_USER='repl',
    MASTER_PASSWORD='repl',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=900;
   > START REPLICA;
   > SHOW REPLICA STATUS\G;
   ```

---

#### 五、验证配置

在两台服务器执行：

```sql
SHOW VARIABLES LIKE 'server_id';  # 应显示不同ID
CREATE DATABASE test_sync;        # 检查双向同步
SELECT HOST, User FROM mysql.user WHERE User='repl';  # 验证账号
```

---

### 关键改进说明

1. 使用IP地址替代服务器名称
2. 消除重复的账号创建步骤
3. 增加数据同步的实用命令
4. 明确双向复制配置流程
5. 补充验证步骤
6. 使用更规范的SQL命令（START REPLICA）
7. 增加服务器角色说明表格

建议配置前检查防火墙设置，确保3306端口互通，可使用以下命令验证：

```bash
telnet 10.18.20.1 3306
telnet 10.18.20.2 3306
```
