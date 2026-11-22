+++
title = "js引用传递"
date = "2023-03-24 21:52:46"
slug = "3dab0886"
aliases = ["/2023/03_24_3dab0886.html"]
description = "setInterval 传入的是函数对象引用，之后给变量重新赋值新函数不会改变已注册回调，仍执行旧函数，体现 JS 按引用传递与闭包特性。"
[taxonomies]
tags = ["闭包", "覆盖"]
[extra]
cover = "https://picsum.photos/400"
+++
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        var fun = function(){
            console.log("Hello World");
        };
        setInterval(fun, 1000);
        fun =function(){
            console.log("Hello World2");
        };
    </script>
</body>
</html
```

会一直输出

```
Hello World
```
