---
title: mysqlEXPLAIN
tags:
  - mysql
cover: 'https://tuapi.eees.cc/api.php?category=dongman&type=302'
abbrlink: cfc58724dd
date: 2025-03-30 20:14:35
---

在 MySQL 中，要查看真實的執行計劃，可以使用以下幾種方法：

### 1. EXPLAIN 語句

使用 `EXPLAIN` 命令可以獲取查詢的執行計劃。語法如下：

```
EXPLAIN SELECT <your_query>;
```

這將返回一項有關查詢的詳細信息，包括各個表如何被存取、是否使用了索引、聯接類型等等。以下是一些重要的欄位：

- **id**：查詢的唯一標識符。
- **select_type**：查詢的類型（如 `SIMPLE`、`PRIMARY`、`UNION` 等）。
- **table**：查詢的表名稱。
- **type**：聯接的類型（如 `ALL`、`INDEX`、`RANGE`、`REF`、`EQ_REF`、`const`、`NULL` 等，`NULL` 表示該行不會使用表）。
- **possible_keys**：可用於此查詢的索引。
- **key**：實際選擇使用的索引。
- **rows**：預估要掃描的行數。
- **Extra**：額外的信息，如是否使用了臨時表或進行了排序。

### 2. EXPLAIN ANALYZE

從 MySQL 8.0 開始，可以使用 `EXPLAIN ANALYZE` 來獲取更詳細的執行計劃和實際執行時間：

```
EXPLAIN ANALYZE SELECT <your_query>;
```

這會執行查詢並提供實際的執行時間和行數，以及與 `EXPLAIN` 相同的結構。

### 3. 使用 Performance Schema

MySQL 的性能模式（Performance Schema）也可以用來獲取更深入的查詢性能實驗數據。首先需要啟用特定的性能監控，然後可以查詢：

```
SELECT * FROM events_statements_history_long WHERE sql_text LIKE '%<your_query>%';
```

性能模式提供了執行查詢的詳細資料，包括執行時間、等待時間和其他性能指標。

### 4. 使用 MySQL Workbench

如果你使用 MySQL Workbench 這樣的圖形化工具，可以在查詢窗口直接點擊「EXPLAIN」按鈕，它會自動幫你生成執行計劃的視覺化展示。

### 總結

使用 `EXPLAIN` 和 `EXPLAIN ANALYZE` 是查看 MySQL 查詢的真實執行計劃的最基本和有效的方法。這可以幫助你瞭解查詢的性能瓶頸，並進行相應的優化。定期分析查詢的執行計劃對於保持數據庫性能至關重要。

MySQL Workbench<mark>這個有圖形化</mark>

[多表连接场景下DISTINCT优化_云数据库 TaurusDB_华为云](https://support.huaweicloud.com/kerneldesc-taurusdb/taurusdb_20_0032.html)
