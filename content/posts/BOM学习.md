+++
title = "BOM学习"
date = "2025-06-07 09:16:59"
slug = "2808a27d"
aliases = ["/2025/06_07_2808a27d.html"]
description = "梳理BOM物料清单的分类，介绍EBOM、MBOM等业务视角及简单、变体、多重、计划、虚拟、扁平化等技术视角BOM的含义与用途。"
[taxonomies]
tags = ["bom"]
[extra]
cover = "https://api.paugram.com/wallpaper/?source=sm"
+++
[业务杂谈：BOM、EBOM、DBOM、MBOM、SBOM、PBOM、CBOM_namelessmyth-GitCode 开源社区](https://gitcode.csdn.net/65ea81951a836825ed793031.html?dp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzMwOTk1MSwiZXhwIjoxNzQ5ODYzNjAxLCJpYXQiOjE3NDkyNTg4MDEsInVzZXJuYW1lIjoid2VpeGluXzQzNTMxOTQwIn0.x3cINYTM_Pt817smuqv75Mir6KZqZYmQYgHK9JJ57G4&spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Eactivity-5-131886166-blog-135637679.235%5Ev43%5Epc_blog_bottom_relevance_base7&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Eactivity-5-131886166-blog-135637679.235%5Ev43%5Epc_blog_bottom_relevance_base7&utm_relevant_index=9)

从意义上讲。

## 按技术角度分类

从IT技术上看，BOM的结构是通过父子关系（上下级关系）来定义的，因此，它是一种树形结构。根据节点的性质可以分为：

S-BOM Simple BOM简单BOM：  单一产品对应单一的结构，每一个节点对应一个实体物料。这是最基本的BOM，其他类型的BOM，都是为了管理和使用上的方便，通过为节点定义不同的属性而产生的变化。

V-BOM Variant BOM（变体BOM）：是为了简化维护BOM的工作量和复杂性，将相似的产品组合在一起的方法，即不同的产品使用相同的结构。技术实现上面就是在节点上增加可配置的Feature/Option（特征/选项），或者叫Character/Values，通过不同的属性值推演出不同的产品BOM。适用于描述产品系列、产品族、平台的结构数据。典型的是平台化的汽车，根据发动机排量、自动/手动变速箱、颜色、左右舵、座椅类型等等不同特征的选项，组合出多种车型和细分配置。

M-BOM multiple BOM（多重BOM），也叫alternativeBOM（替换BOM）：同样是为了简化维护BOM的工作量和复杂性的目的，但描述的是同一产品的不同结构，即同一个产品，存在可以互相替代的结构，以适应不同的批量、日期、工艺结构等的需要。技术实现上面通过BOM的版本来区分。比如同样一款车，在工艺布局不同的工厂生产，就可以通过不同的版本号来定义BOM。

Plan-BOM计划BOM：子项的数量是百分比，子项各数量之和为1，用于企业顶层销售经营SOP计划中，计算产品系列中各产品的配比。

PHANTOM-BOM虚拟BOM：为了计划、调度、运输、搬运、出入库记账的方便，将一些离散的零件组成Group或Kit，归集到一个父项下面，但父项并不是实体的物料。比如一家供应商为整车制造厂，供应两种以上的零件，在拉动的时候，为每一个零件产生一个拉动单，不如为这几个零件做一个组合，一个拉动单就够了。

WBS-BOM：为了减少成品和半成品的物料数量，在物料代号之前用WBS来表示生产批次，用以区分。比如销售计算机，不同项目需要的计算机配置不同，如在内存和硬盘不同。一般情况下，我们要为不同的计算机创建不同的物料编码，然后建立不同的标准BOM。在配置变化比较频繁的情况下，则需要建立大量的物料代码和多个BOM，维护起来会很麻烦。在这种情况下。我们只建一个计算机的物料代码，然后用WBS编码+物料号创建WBS BOM，实际组成部分可通过WBS BOM进行展开，这样在PS上只需要挂一个物料‘计算机’的需求，然后跑MRP时会自动根据WBS BOM的组成，创建结构相同或相似但零部件性能不同的生产订单。

Flat-BOM扁平化BOM：为了避免多层级BOM的复杂性，通过定义物料的功能、位置等属性，免去结构层次划分，把所有物料零件展示在同一个层级上的形式，对于分类管理零件，尤其是变更管理，比较直观。在有DBOM支持的情况下，EBOM扁平化好处非常多，如果有CBOM支持生产阶段的成本归集，对于最终装配流水线型FAS制造，MBOM扁平化使用起来也非常方便，特别容易通过Excel方式使用，缺点是零件逐级反查上级直至最终产品不容易。

Super BOM超级BOM：为父项是可配置物料定义的BOM称之为超级BOM，在该物料下面挂上了所有可能使用的物料，即所有可能的选装项和必装项。通常为产品族、产品系列、平台定义超级BOM。它并没有专门的技术结构，它是用Variant BOM加分类等技术组合实现的。



[EBOM PBOM MBOM区别 - 知乎](https://zhuanlan.zhihu.com/p/676969866#:~:text=ebom%20pbom%20mbom%E5%8C%BA%E5%88%AB%EF%BC%9AEBOM,%E9%83%A8%E5%88%86%E5%8C%85%E6%8B%AC%E5%9C%A8EBOM%E4%B8%AD%E3%80%82)

生产订单BOM、销售订单BOM、标准BOM
