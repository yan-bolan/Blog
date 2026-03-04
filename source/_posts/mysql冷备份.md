---
title: mysql冷备份
tags:
  - mysql
cover: 'https://picsum.photos/400'
abbrlink: dfd30e1c
date: 2025-03-31 19:53:02
---

#### 环境：mysql 有挂volume 的mysql in docker,否则主机要有mysqldump，以下为其中一台示例，其余修改ip即可

#### 一、服务器信息表

```markdown
| 服务器名称 | IP地址     | 用途               |
|------------|------------|--------------------|
| 服务器1    | 10.1.1.12  | 主数据库服务器     |
| 服务器2    | 10.1.1.13  | 备用服务器/从库    |
```

---

#### 二、全量备份脚本（/var/lib/mysql/backup.sh）

```bash
vim /var/lib/mysql/backup.sh
```

<style>
</style> 制下述内容并粘贴到文件里（注：红色部分为服务器的IP，请确认是否为当前服务器）

```bash
#!/bin/bash
# MySQL全量备份脚本

# 数据库配置
DB_USER="root"
DB_PASSWORD="123456"
DB_HOST="10.1.1.12"
DB_NAME="sys"

# 备份配置
BACKUP_DIR="/backups/full"
LOG_FILE="/var/log/mysql_backup.log"
TIMESTAMP=$(date +"%Y%m%d")

# 创建备份目录
mkdir -p ${BACKUP_DIR}

# 执行全量备份
echo "[$(date +'%F %T')] 开始全量备份" >> ${LOG_FILE}
mysqldump -u${DB_USER} -p${DB_PASSWORD} -h${DB_HOST} \
          --single-transaction \
          --routines \
          --events \
          --databases ${DB_NAME} \
          > ${BACKUP_DIR}/${DB_NAME}_full_${TIMESTAMP}.sql

# 打包压缩
tar -czvf ${BACKUP_DIR}/${DB_NAME}_full_${TIMESTAMP}.tar.gz \
         -C ${BACKUP_DIR} ${DB_NAME}_full_${TIMESTAMP}.sql
rm -f ${BACKUP_DIR}/${DB_NAME}_full_${TIMESTAMP}.sql

# 清理旧备份（保留7天）
find ${BACKUP_DIR} -name "*.tar.gz" -mtime +7 -exec rm -f {} \;

echo "[$(date +'%F %T')] 全量备份完成" >> ${LOG_FILE}
```

---

#### 三、增量备份脚本（/var/lib/mysql/incremental.sh）

<style>
</style>

1.       复制下述内容并粘贴到文件里（注：红色部分为服务器的IP，请确认是否为当前服务器）：

```bash
 #!/bin/bash
# MySQL增量备份脚本（修正版）

# 数据库配置
DB_USER="root"
DB_PASSWORD="123456"
DB_HOST="10.1.1.12"
DB_NAME="sys"

# 备份配置
BACKUP_DIR="/backups/incremental"
LOG_FILE="/var/log/mysql_backup.log"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")  # 精确到秒的时间戳

# 二进制日志配置
BINLOG_DIR="/var/lib/mysql"
POSITION_FILE="/backups/binlog_position.txt"

# 创建备份目录
mkdir -p ${BACKUP_DIR}

# 记录操作日志
echo "[$(date +'%F %T')] 开始增量备份" >> ${LOG_FILE}

# 获取当前日志位置
CURRENT_STATUS=$(mysql -u${DB_USER} -p${DB_PASSWORD} -h${DB_HOST} -e "SHOW MASTER STATUS;" 2>>${LOG_FILE})
if [ $? -ne 0 ]; then
  echo "[ERROR] 无法获取MASTER STATUS" >> ${LOG_FILE}
  exit 1
fi

CURRENT_BINLOG=$(echo "${CURRENT_STATUS}" | awk 'NR==2 {print $1}')
CURRENT_POSITION=$(echo "${CURRENT_STATUS}" | awk 'NR==2 {print $2}')

# 首次运行处理
if [ ! -f ${POSITION_FILE} ]; then
  echo "${CURRENT_BINLOG} ${CURRENT_POSITION}" > ${POSITION_FILE}
  echo "[WARNING] 首次运行，仅记录初始位置" >> ${LOG_FILE}
  exit 0
fi

# 读取上次位置
LAST_BINLOG=$(awk '{print $1}' ${POSITION_FILE})
LAST_POSITION=$(awk '{print $2}' ${POSITION_FILE})

# 执行增量备份
echo "正在处理二进制日志：${LAST_BINLOG} 从位置 ${LAST_POSITION}" >> ${LOG_FILE}
mysqlbinlog --start-position=${LAST_POSITION} \
  ${BINLOG_DIR}/${LAST_BINLOG} \
  > ${BACKUP_DIR}/${DB_NAME}_inc_${TIMESTAMP}.sql 2>>${LOG_FILE}

# 检查备份文件是否生成
if [ ! -s ${BACKUP_DIR}/${DB_NAME}_inc_${TIMESTAMP}.sql ]; then
  echo "[ERROR] 增量备份文件为空或未创建" >> ${LOG_FILE}
  exit 2
fi

# 更新位置文件
echo "${CURRENT_BINLOG} ${CURRENT_POSITION}" > ${POSITION_FILE}

# 打包压缩
tar -czvf ${BACKUP_DIR}/${DB_NAME}_inc_${TIMESTAMP}.tar.gz \
  -C ${BACKUP_DIR} ${DB_NAME}_inc_${TIMESTAMP}.sql
rm -f ${BACKUP_DIR}/${DB_NAME}_inc_${TIMESTAMP}.sql

echo "[$(date +'%F %T')] 增量备份完成" >> ${LOG_FILE}
```

---

#### 四、定时任务配置

<style> 9.    crontab –e
</style> 使用键盘按下i键之后输入

```bash
# 编辑crontab
crontab -e

# 添加以下内容（每天8点增量，每周一8点全量）
0 8 * * * /usr/bin/docker exec mysql /bin/bash /var/lib/mysql/incremental.sh
0 8 * * 1 /usr/bin/docker exec mysql /bin/bash /var/lib/mysql/backup.sh
```

---

# 检查机制

您提出的补充检查机制非常重要，以下是为备份方案增加的详细检查流程设计：

---

### **MySQL备份检查方案**

#### **一、基础状态检查**

```bash
# 1. 检查定时任务状态
crontab -l  # 确认任务存在
systemctl status cron  # 确认服务运行

# 2. 检查最近一次备份时间
ls -lh /backups/full/   # 全量备份
ls -lh /backups/incremental/  # 增量备份

# 3. 验证备份文件完整性
file /backups/full/*.tar.gz  # 应显示gzip压缩数据
tar -ztvf /backups/full/sys_full_20231001.tar.gz  # 查看压缩包内容
```

#### **二、日志分析**

```bash
# 查看备份日志（脚本中已配置日志文件）
tail -f /var/log/mysql_backup.log

# 查看cron执行日志（需系统支持）
grep 'mysql_backup' /var/log/cron
```

#### **三、自动化检查脚本**

创建 `/scripts/check_backup.sh`：

```bash
#!/bin/bash
# 备份状态检查脚本

# 配置参数
BACKUP_DIRS=("/backups/full" "/backups/incremental")
MIN_SIZE=10240  # 10KB为最小合理值
MAX_AGE=48  # 最大允许未备份时间（小时）

# 检查文件更新状态
check_files() {
  for dir in "${BACKUP_DIRS[@]}"; do
    latest_file=$(find ${dir} -type f -name "*.tar.gz" -printf '%T@ %p\n' | sort -n | tail -1 | cut -f2- -d" ")

    if [ -z "$latest_file" ]; then
      echo "[ERROR] ${dir} 无备份文件存在！"
      exit 1
    fi

    file_size=$(du -b "$latest_file" | awk '{print $1}')
    file_age=$(( ( $(date +%s) - $(stat -c %Y "$latest_file") ) / 3600 ))

    if [ "$file_size" -lt "$MIN_SIZE" ]; then
      echo "[WARNING] ${latest_file} 文件大小异常（${file_size} bytes）"
    fi

    if [ "$file_age" -gt "$MAX_AGE" ]; then
      echo "[ERROR] ${dir} 最近备份已超过${MAX_AGE}小时！"
      exit 2
    fi
  done
}

# 执行检查
check_files
echo "[OK] 备份状态正常"
exit 0
```

#### **四、恢复验证（关键步骤）**

```bash
# 1. 创建测试数据库
mysql -uroot -p123456 -h10.1.1.12 -e "CREATE DATABASE backup_test;"

# 2. 解压备份文件
tar -zxvf sys_full_20231001.tar.gz -C /tmp/

# 3. 执行恢复
mysql -uroot -p123456 -h10.1.1.12 backup_test < /tmp/sys_full_20231001.sql

# 4. 验证数据
mysql -uroot -p123456 -h10.1.1.12 -e "USE backup_test; SHOW TABLES;"
```

#### **五、监控集成方案**

```bash
# 1. 添加Zabbix监控项（示例）
UserParameter=mysql.backup.status[*], /scripts/check_backup.sh $1

# 2. Prometheus监控配置
# 在备份脚本中增加metrics输出
echo "mysql_backup_timestamp $(date +%s)" > /var/lib/node_exporter/mysql_backup.prom
```

#### **六、常见故障排查表**

| 现象       | 检查命令                               | 解决方案                                                 |
| -------- | ---------------------------------- | ---------------------------------------------------- |
| 无备份文件生成  | `ls /backups/*`                    | 检查脚本权限：`chmod +x /var/lib/mysql/*.sh`                |
| 备份文件大小为0 | `du -sh /backups/*`                | 验证数据库连接：`mysql -u$USER -p$PASS -h$HOST -e "STATUS;"` |
| 定时任务未执行  | `grep 'CRON' /var/log/syslog`      | 修正crontab中的`docker`拼写错误                              |
| 增量备份中断   | `cat /backups/binlog_position.txt` | 检查二进制日志是否开启：`SHOW VARIABLES LIKE 'log_bin';`         |

---

### **检查方案部署步骤**

1. **添加检查脚本**
   
   ```bash
   sudo mkdir -p /scripts
   sudo nano /scripts/check_backup.sh
   # 粘贴上述检查脚本内容
   sudo chmod +x /scripts/check_backup.sh
   ```

2. **设置每日自动检查**
   
   ```bash
   (crontab -l ; echo "0 9 * * * /scripts/check_backup.sh >> /var/log/backup_check.log 2>&1") | crontab -
   ```

3. **配置邮件报警（示例）**
   
   ```bash
   # 在check_backup.sh开头添加：
   ALERT_EMAIL="admin@example.com"
   # 在exit前添加：
   if [ $? -ne 0 ]; then
     mail -s "MySQL备份异常报警" $ALERT_EMAIL < /tmp/error.log
   fi
   ```

---

### 

---

# 手动测试全量备份

```bash
root@txpc:/var/lib/mysql# bash -x backup.sh 
+ DB_USER=root
+ DB_PASSWORD=123456
+ DB_HOST=localhost
+ DB_NAME=sys
+ BACKUP_DIR=/backups/full
+ LOG_FILE=/var/log/mysql_backup.log
++ date +%Y%m%d
+ TIMESTAMP=20250331
+ mkdir -p /backups/full
++ date '+%F %T'
+ echo '[2025-03-31 20:51:55] 开始全量备份'
+ mysqldump -uroot -p123456 -hlocalhost --single-transaction --routines --events --databases sys
mysqldump: [Warning] Using a password on the command line interface can be insecure.
+ tar -czvf /backups/full/sys_full_20250331.tar.gz -C /backups/full sys_full_20250331.sql
sys_full_20250331.sql
+ rm -f /backups/full/sys_full_20250331.sql
+ find /backups/full -name '*.tar.gz' -mtime +7 -exec rm -f '{}' ';'
++ date '+%F %T'
+ echo '[2025-03-31 20:51:56] 全量备份完成'
root@txpc:~# cat /var/log/mysql_backup.log 
[2025-03-31 20:51:55] 开始全量备份
[2025-03-31 20:51:56] 全量备份完成
root@txpc:~# ls -a /backups/full/
.  ..  sys_full_20250331.tar.gz
```

### 增量备份测试

```bash
root@txpc:/var/lib/mysql# bash -x incremental.sh 
+ DB_USER=root
+ DB_PASSWORD=123456
+ DB_HOST=localhost
+ DB_NAME=sys
+ BACKUP_DIR=/backups/incremental
+ LOG_FILE=/var/log/mysql_backup.log
++ date +%Y%m%d_%H%M%S
+ TIMESTAMP=20250331_211234
+ BINLOG_DIR=/var/lib/mysql
+ POSITION_FILE=/backups/binlog_position.txt
+ mkdir -p /backups/incremental
++ date '+%F %T'
+ echo '[2025-03-31 21:12:34] 开始增量备份'
++ mysql -uroot -p123456 -hlocalhost -e 'SHOW MASTER STATUS;'
+ CURRENT_STATUS='File    Position    Binlog_Do_DB    Binlog_Ignore_DB    Executed_Gtid_Set
binlog.000023    157            '
+ '[' 0 -ne 0 ']'
++ echo 'File    Position    Binlog_Do_DB    Binlog_Ignore_DB    Executed_Gtid_Set
binlog.000023    157            '
++ awk 'NR==2 {print $1}'
+ CURRENT_BINLOG=binlog.000023
++ echo 'File    Position    Binlog_Do_DB    Binlog_Ignore_DB    Executed_Gtid_Set
binlog.000023    157            '
++ awk 'NR==2 {print $2}'
+ CURRENT_POSITION=157
+ '[' '!' -f /backups/binlog_position.txt ']'
++ awk '{print $1}' /backups/binlog_position.txt
+ LAST_BINLOG=binlog.000023
++ awk '{print $2}' /backups/binlog_position.txt
+ LAST_POSITION=157
+ echo '正在处理二进制日志：binlog.000023 从位置 157'
+ mysqlbinlog --start-position=157 /var/lib/mysql/binlog.000023
+ '[' '!' -s /backups/incremental/sys_inc_20250331_211234.sql ']'
+ echo 'binlog.000023 157'
+ tar -czvf /backups/incremental/sys_inc_20250331_211234.tar.gz -C /backups/incremental sys_inc_20250331_211234.sql
sys_inc_20250331_211234.sql
+ rm -f /backups/incremental/sys_inc_20250331_211234.sql
++ date '+%F %T'
+ echo '[2025-03-31 21:12:34] 增量备份完成'
root@txpc:/var/lib/mysql# cat /var/log/mysql_backup.log 
[2025-03-31 21:12:34] 开始增量备份
mysql: [Warning] Using a password on the command line interface can be insecure.
正在处理二进制日志：binlog.000023 从位置 157
[2025-03-31 21:12:34] 增量备份完成
root@txpc:/var/lib/mysql# ls -lh /backups/incremental/
总计 4.0K
-rw-r--r-- 1 root root 680  3月 31 21:12 sys_inc_20250331_211234.tar.gz
```
