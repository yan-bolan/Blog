---
title: js引用传递
tags:
  - 闭包
  - 覆盖
cover: 'https://picsum.photos/400'
abbrlink: 3dab0886
date: 2023-03-24 21:52:46
---

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
