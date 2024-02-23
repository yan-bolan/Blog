### Introduce

1. hexo 博客

2. hexo generate 生成 static files ; there are includes sitemap.xml; you can go to goolgel.com submit it ;

3. [PowerShell - Running scripts is disabled on this system – TecAdmin](https://tecadmin.net/powershell-running-scripts-is-disabled-system/)

~~publish to https://www.freehosting.com/~~
publish https://vercel.com/
try https://pages.cloudflare.com/
hexo deploy

### Writing

[Writing | Hexo](https://hexo.io/docs/writing.html)

hexo new [layout] <title>

```bash
hexo new <titile>
```

git add .

git push

### 图片

#### 绝对路径（本地推荐）

当Hexo项目中只用到少量图片时，可以将图片统一放在`source/images`文件夹中，通过markdown语法访问它们。

source/images/image.jpg

#### 相对路径

图片除了可以放在统一的`images`文件夹中，还可以放在文章自己的目录中。文章的目录可以通过配置`_config.yml`来生成。

_config.yml

### CDN引用（推荐）



---

## 连接点链接

[连接点（NTFS junction point）](https://link.juejin.cn?target=https%3A%2F%2Fdocs.microsoft.com%2Fzh-cn%2Fwindows%2Fwin32%2Ffileio%2Fhard-links-and-junctions%23junctions "https://docs.microsoft.com/zh-cn/windows/win32/fileio/hard-links-and-junctions#junctions")，也称为软链接，类似于符号链接，但只支持目录，可以链接位于同一台计算机上不同本地卷上的目录。结点的操作与硬链接相同。

在根目录创建连接点链接：

bash

复制代码

`mklink /j \MyFolder \Users\User1\Documents`

 
