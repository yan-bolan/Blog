# 烟波蓝日志（Zola 版）

https://yuris.site —— 由 Hexo + nexmoe 迁移至 **Zola + helloblog** 主题。

## 本地预览 / 构建

Zola 0.23.6 已安装到 `%LOCALAPPDATA%\Programs\zola` 并加入用户 PATH（安装脚本 `tools/install-zola.ps1`），新开终端即可直接用：

```powershell
zola serve    # 预览 http://127.0.0.1:1111
zola build    # 生成 public/
```

局域网预览：`zola serve --interface 0.0.0.0 --port 1111 --base-url <本机IP>`（--base-url 不要带端口）。

如换机或误删，运行 `node tools/download-zola.mjs` 重新下载便携版到 tools/，再执行 `tools/install-zola.ps1`。

## 目录结构

| 目录 | 说明 |
| --- | --- |
| `config.toml` | 站点配置（含旧站迁移过来的主题设定、中文翻译） |
| `content/` | **junction → `E:\服务器备份\yanbolanblog\content`**（文章实体存放在 E 盘，与旧站 source 软链接同思路；重建脚本 `tools/make-junction.ps1`） |
| `content/posts/` | 285 篇文章（由 Hexo `source/_posts` 迁移，扁平化） |
| `content/about.md` / `category.md` / `link.md` | 关于 / 归档 / 友链页 |
| `static/` | 头像、背景、备案图标、robots.txt 等静态资源 |
| `templates/` | 对主题的覆盖定制（见下） |
| `themes/helloblog/` | 主题（vendor 方式入库，MIT，作者 Cnkrru） |
| `data/` | `link.json` 友链、`music.json` 音乐播放器歌单 |
| `scripts/` | 迁移脚本、SEO 推送脚本、迁移报告 |
| `tools/` | Zola 便携版与下载脚本 |

## 写新文章

在 `content/posts/` 新建 `.md`：

```toml
+++
title = "标题"
date = "2026-01-01 12:00:00"
slug = "my-post"
[taxonomies]
tags = ["标签"]
[extra]
category = "分类"
cover = "https://example.com/cover.jpg"
+++

正文（Markdown）
```

## 模板定制（templates/ 覆盖主题同名文件）

- `partials/head.html`：追加 Google AdSense（ca-pub-2058306854838448）。
- `partials/footer.html`：ICP / 公安备案、运行天数、动态一言（hitokoto）、文末 CC BY-NC-SA 3.0 CN 声明、复制附带版权文案、文末图。
- `index.html`：首页落地页补上页脚（备案信息需在首页展示）。

## 旧站设定迁移对照

- 旧 permalink `/YYYY/MM_DD_abbrlink.html` → 每篇 `aliases` 重定向页，新地址 `/posts/<abbrlink>/`。
- 标签/分类 → Zola taxonomies + `extra.category`（归档页按分类-年-月分组）。
- 封面 → `extra.cover`；更新时间 → `updated`。
- 网易云 `[music:id]` 标签 → 标准 iframe。
- 搜索：旧站 Bing 站内搜索 → 主题自带本地全文搜索。
- 评论：旧 DiscussBot → giscus（`config.toml` 中 `[extra.giscus] enable = false`，暂未启用）。
- 旧菜单中 /PY.html、/donate.html、/about.html 为死链（source 中无对应文件）；朋友页已用主题友链页重建，赞助页未迁移。

## 配套工具 ChiSaTo

`D:\WorkPlaceVisualStudio2026\Blog_\ChiSaTo`（C# WinForms 建文章工具）已同步适配：文章目录指向 `content/posts`，新建文章直接生成 Zola TOML front matter（不再调用 hexo new），默认博客路径改为 `D:\博客\YuriBlog`。改动后需重新编译该程序。

## 部署（GitHub Actions）

- `.github/workflows/deploy.yml`：push 到 main/master 后构建并 FTP 增量同步到服务器。
  需要仓库 Secrets：`FTP_SERVER`（yuris.site）、`FTP_USERNAME`、`FTP_PASSWORD`。
- `.github/workflows/seo-push.yml`：每日 04:00 UTC 构建后向 Bing / Baidu / Google 推送 sitemap URL。
  沿用旧仓库 Secrets：`bing_apikey`、`baidu_token`、`google_client_email`、`google_private_key`（缺省自动跳过）。

> 安全提示：旧 Hexo 配置中的 FTP 明文密码仍留在 git 历史里，建议修改 FTP 密码并仅通过 Secrets 注入。

## 迁移记录

`scripts/migrate.mjs` 为一次性迁移脚本（YAML→TOML，自带 vendor 版 js-yaml，可独立重跑）；
结果见 `scripts/migrate-report.json`：285/285 成功，3 篇无日期文章以文件修改时间兜底，
3 处重复 abbrlink 以 `-2/-3` 后缀消歧。
