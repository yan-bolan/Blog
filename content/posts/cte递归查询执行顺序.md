+++
title = "cte递归查询执行顺序"
date = "2023-05-27 08:19:35"
slug = "15c2bc64"
aliases = ["/2023/05_27_15c2bc64.html"]
[taxonomies]
tags = ["oracle", "sql_server", "原理"]
[extra]
cover = "https://picsum.photos/400"
+++
[使用递归 CTE &nbsp;|&nbsp; BigQuery &nbsp;|&nbsp; Google Cloud](https://cloud.google.com/bigquery/docs/recursive-ctes?hl=zh-cn)

[使用公用表表达式 | Microsoft Learn](https://learn.microsoft.com/zh-cn/previous-versions/sql/sql-server-2008-r2/ms190766(v=sql.105))

微软文档就是好，就是有点难找

# CTE公用表表达式

在Oracle和sql server ： with base语句就是这个

这个主要用于递归和复用;

可引用自身是：递归的原理;

```sql
CTE 的基本语法结构如下：

WITH expression_name [ ( column_name [,...n] ) ]

AS

( CTE_query_definition )

只有在查询定义中为所有结果列都提供了不同的名称时，列名称列表才是可选的。

运行 CTE 的语句为：

SELECT <column_list>

FROM expression_name;
```

类似代码的递归：

```csharp
func re(list){
    root_node=list.root;
   foreach(item in root_node){
    re(item);
}
}
```

微软：[使用公用表表达式的递归查询 | Microsoft Learn](https://learn.microsoft.com/zh-cn/previous-versions/sql/sql-server-2008-r2/ms186243(v=sql.105))

递归 CTE 由下列三个元素组成：

1. 例程的调用。
   
   递归 CTE 的第一个调用包括一个或多个由 UNION ALL、UNION、EXCEPT 或 INTERSECT 运算符联接的 CTE_query_definitions。由于这些查询定义形成了 CTE 结构的基准结果集，所以它们被称为“定位点成员”。
   
   CTE_query_definitions 被视为定位点成员，除非它们引用了 CTE 本身。所有定位点成员查询定义必须放置在第一个递归成员定义之前，而且必须使用 UNION ALL 运算符联接最后一个定位点成员和第一个递归成员。

2. 例程的递归调用。
   
   递归调用包括一个或多个由引用 CTE 本身的 UNION ALL 运算符联接的 CTE_query_definitions。这些查询定义被称为“递归成员”。

3. 终止检查。
   
   终止检查是隐式的；当上一个调用中未返回行时，递归将停止。

<mark>**重点是伪代码和执行顺序：</mark>**

### 伪代码和语义

递归 CTE 结构必须至少包含一个定位点成员和一个递归成员。以下伪代码显示了包含一个定位点成员和一个递归成员的简单递归 CTE 的组件。

WITH cte_name ( column_name [,...n] )

AS

(

CTE_query_definition –- Anchor member is defined.

UNION ALL

CTE_query_definition –- Recursive member is defined referencing cte_name.

)

-- Statement using the CTE

SELECT *

FROM cte_name

<mark>递归执行的语义如下：</mark>

1. 将 CTE 表达式拆分为定位点成员和递归成员。

2. 运行定位点成员，创建第一个调用或基准结果集 (T0)。

3. 运行递归成员，将 Ti 作为输入，将 Ti+1 作为输出。

4. 重复步骤 3，直到返回空集。

5. 返回结果集。这是对 T0 到 Tn 执行 UNION ALL 的结果。

## 官网文档中也有示例;

# 应用尝试

树结构过于复杂，且有时候不是一个完整的树;

这里采用简单模型: 单链条; 无兄弟结点;

一般oracle采用分析函数over()先按order by 时间，row_number生成排序号RN

| RN  | attr1 | Flag |
| --- | ----- | ---- |
| 1   | A     |      |
| 2   | B     |      |
| 3   | B     |      |
| 4   | D     |      |

第一个业务中默认是要的，就是ROOT结点默认要标记为Y; 这个不用管;

标记是否有相邻的元素间有相同的属性;

| RN  | attr1 | Flag |
| --- | ----- | ---- |
| 1   | A     | Y    |

使用CTE递归 RN=1的元素就是起点;

第一次：RN+1=2;  此时得到的结果集是第二条记录;  这里查找的过程中：可以比较 第一条记录的attr1属性第二条的attr1属性作比较，相同则FLAG=Y;

| RN  | attr1 | Flag |
| --- | ----- | ---- |
| 2   | B     | N    |

将第二条记录作为输入，找到第三条记录; 同样的比较attr1;

| RN  | attr1 | Flag |
| --- | ----- | ---- |
| 3   | B     | Y    |

同理3与4比较也是; 

到4作为输入时：返回空集，达到终止条件;返回;

最后，将所有的结果集联接;

| RN  | attr1 | Flag |
| --- | ----- | ---- |
| 1   | A     | Y默认  |
| 2   | B     | N    |
| 3   | B     | Y    |
| 4   | D     | N    |

> 官网的示例看起来当有兄弟结点的时候，返回的是兄弟结点的结果集; 也就是同一Level
> 
> 本业务例子：看起来是标记有连续相同属性开始的第二个元素;
> 
> 本业务：第一记录后面都是相同属性都标记为Y; 
> 
> 看起来：如果中间断了; 是会从第二个开始标记为Y;
> 
> 因为业务关系：前面的记录随着时间流逝而消失; 当1消失; 2成为根结点标记Y,3与2相同标记为Y;



# oracle 与sql server

oracle的 好像有专门的递归语法，且用法更多;
