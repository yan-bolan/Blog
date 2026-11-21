+++
title = "To avoid scope ambiguity, the default slot should also use ＜template＞ syntax when there are other na"
date = "2020-10-04 19:05:32"
updated = "2021-05-14 22:04:01"
slug = "60c33bd2"
aliases = ["/2020/10_04_60c33bd2.html"]
[taxonomies]
tags = ["vue slot,slot,插槽："]
[extra]
category = "前端"
categories = ["前端"]
cover = "https://cdn.jsdelivr.net/gh/yan-bolan/picbed/img/动漫/結城友奈は勇者である/東郷·美森.png"
+++
﻿### 具名插槽
[https://cn.vuejs.org/v2/guide/components-slots.html](https://cn.vuejs.org/v2/guide/components-slots.html)

```html
<base-layout>
  <template v-slot:header> // slot="" 已经废弃 。！！！！
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
==base-layout 是一个子组件。内容如下：

```html
<div class="container">
  <header>
    <slot name="header"></slot> // 当有多个slot 并且name 时 上面的就要写多个tempelte 了
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```