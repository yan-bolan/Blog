---
title: layui内容居中
tags:
  - layui
  - 居中
cover: 'https://picsum.photos/400'
abbrlink: 81430ea4
date: 2023-10-20 23:28:10
---







[layui内容居中-掘金 (juejin.cn)](https://juejin.cn/s/layui%E5%86%85%E5%AE%B9%E5%B1%85%E4%B8%AD)





如果您想要在使用 layui 框架开发的页面中实现内容居中的效果，可以尝试以下方法：

1. 使用 CSS 属性 text-align

在您的 HTML 代码中添加一个容器（例如一个 div 元素），然后在 CSS 中将该容器的 text-align 属性设置为 center，如下所示：

html

复制代码

`<div class="container">   <!-- 在这里添加您的内容 --> </div>`

css

复制代码

`.container {   text-align: center; }`

这将使该容器中的所有内容都水平居中对齐。

2. 使用 layui 的 grid 栅格系统

layui 框架提供了一个灵活的栅格系统，您可以使用它来实现内容的居中对齐。例如，如果您想要将一个表单居中对齐，可以使用 layui 的 grid 栅格系统将该表单放置在一个居中对齐的列中，如下所示：

html

复制代码

`<div class="layui-container">   <div class="layui-row">     <div class="layui-col-md-offset3 layui-col-md-6">       <form>         <!-- 在这里添加表单内容 -->       </form>     </div>   </div> </div>`

这将创建一个容器，其中包含一个居中对齐的列，该列具有3个网格偏移量和6个网格宽度，其中包含您的表单。

总之，无论您使用哪种方法，都可以轻松地实现在 layui 框架中的内容居中对齐。
