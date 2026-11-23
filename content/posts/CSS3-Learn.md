+++
title = "CSS3 Learn"
date = "2022-10-01 09:25:12"
slug = "f7bba3ff"
aliases = ["/2022/10_01_f7bba3ff.html"]
description = "前端学习笔记，涵盖iframe自适应高度、模板字符串、querySelector选择器组合及apply、call、bind改变this指向的用法。"
[taxonomies]
tags = ["css", "js", "html"]
+++
[Element.scrollHeight - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight)

**`Element.scrollHeight`** 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。



iframe automatically adjust height without scrollbar



```xml
<script>
  function resizeIframe(obj) {    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';  }
</script>
```

And change your iframe to this:

```xml
<iframe src="..." frameborder="0" scrolling="no" onload="resizeIframe(this)" />
```







# 模板字符串

模板字面量 是允许嵌入表达式的字符串字面量。

[模板字符串 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)

（`${expression}`）的占位符



# queryselector

OR: chain selectors with commas

```javascript
document.querySelectorAll('div, p span');
// selects divs, and spans in ps
```

AND: chain selectors without whitespace

```javascript
document.querySelectorAll('div.myClass');
// selects divs with the class "myClass"
```

NOT: `:not()`-selector

```javascript
document.querySelectorAll('div:not(.myClass)');
// selects divs that do not have the class "myClass"
```



# apply、call

[面试题](http://segmentfault.com/a/1190000000375138?page=1)，上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 apply 或者 call，注意这里传入多少个参数是不确定的，所以使用apply是最好的，方法如下：

```js
function log(){
  console.log.apply(console, arguments);
};
log(1);    //1
log(1,2);    //1 2
```

- apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；

### 主要应用场景：

1. call 经常做继承。
2. apply 经常跟数组有关系，比如借助于数学对象实现数组最大值最小值。
3. bind 不调用函数，但是还想改变this指向，比如改变定时器内部的this指向。





### 空值合并运算符

](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

?? ?.在2020年chrome兼容；
