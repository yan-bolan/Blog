---
title: 数据库ACID
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
tags: ACID
abbrlink: c5cf1b6e
date: 2023-02-04 14:58:57
---

![](http://www.cppblog.com/images/cppblog_com/wolf/table.JPG)

[ORACLE](https://so.csdn.net/so/search?q=ORACLE&spm=1001.2101.3001.7020)里锁有以下几种模式:

> 0：`none`  
> 1：`null` 空  
> 2：`Row-S` 行共享(RS)：共享表锁，`sub share`  
> 3：`Row-X` 行独占(RX)：用于行的修改，`sub exclusive`  
> 4：`Share` 共享锁(S)：阻止其他DML操作，`share`  
> 5：`S/Row-X` 共享行独占(SRX)：阻止其他事务操作，`share/sub exclusive`  
> 6：`exclusive` 独占(X)：独立访问使用，`exclusive`

一、它有什么作用
select for update 是为了在查询时,避免其他用户以该表进行插入,修改或删除等操作,造成表的不一致性。

二、举几个例子：
select * from t for update 会等待行锁释放之后，返回查询结果。
select * from t for update nowait 不等待行锁释放，提示锁冲突，不返回结果
select * from t for update wait 5 等待5秒，若行锁仍未释放，则提示锁冲突，不返回结果
select * from t for update skip locked 查询返回查询结果，但忽略有行锁的记录

**1.关于V$lock表和相关视图的说明**

**v$session 查询会话的信息和锁的信息。  
sid,serial#：表示会话信息。**  
**program：表示会话的应用程序信息。**

[oracle锁表问题处理 - NewBBBB - 博客园 (cnblogs.com)](https://www.cnblogs.com/wsxdev/p/15240814.html)

SELECT * FROM v$lock;  
SELECT * FROM v$sqlarea;  
SELECT * FROM v$session;  
SELECT * FROM v$process ;        
SELECT * FROM v$locked_object;    
SELECT * FROM all_objects;    
SELECT * FROM v$session_wait;

一般要开启日志才能查到？

select * from v$log;

select * from v$logfile;

select * from v$log_history t order by t.SEQUENCE# desc;

AWR全称Automatic Workload Repository，自动负载信息库，是Oracle 10g版本后推出的一种性能收集和分析工具，提供了一个时间段内整个系统的报表数据。通过AWR报告，可以分析指定的时间段内数据库系统的性能。
