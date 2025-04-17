---
title: ORACLE JOB失败16次后停止
tags:
  - oracle
  - oracle dbms
cover: 'https://picsum.photos/400'
abbrlink: 840d974e
date: 2023-09-12 19:31:32
---



[Broken Job Count (oracle.com)](https://docs.oracle.com/cd/B16240_01/doc/doc.102/e16282/rac_database_help/rac_database_dbjob_status_broken.html)





A job can be broken in two ways:可以通过两种方式中断作业：

Oracle has failed to successfully execute the job after sixteen attempts. The job has been explicitly marked as broken by using the procedure DBMS_ JOB.BROKEN.Oracle 在 16 次尝试后未能成功执行该作业。作业已通过使用过程显式标记为已中断 DBMS_ JOB。破碎。

This metric checks for broken DBMS jobs. A critical alert is generated if the number of broken jobs exceeds the value specified by the threshold argument.此指标检查损坏的 DBMS 作业。如果中断的作业数超过阈值参数指定的值，则会生成严重警报。



尝试16次后就不再尝试;
