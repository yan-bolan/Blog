#!/usr/bin/env bash
# 安装 Zola 到用户目录 + 将 content 移到 E 盘并建立 junction（用户已授权）
set -e
pwsh -NoProfile -File "D:/博客/yanbolanblog/tools/install-zola.ps1"
mkdir -p "/e/服务器备份/yanbolanblog"
export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'
set +e
robocopy "D:\博客\yanbolanblog\content" "E:\服务器备份\yanbolanblog\content" /E /MOVE /R:1 /W:1 /NFL /NDL /NJH
rc=$?
set -e
if [ $rc -ge 8 ]; then echo "ROBOCOPY FAILED $rc"; exit 1; fi
echo "robocopy exit=$rc (0-7=success)"
if [ -d "D:/博客/yanbolanblog/content" ]; then rmdir "D:/博客/yanbolanblog/content" || true; fi
cmd /c 'mklink /J "D:博客yanbolanblogcontent" "E:服务器备份yanbolanblogcontent"'
echo "--- posts count via junction:"
ls "D:/博客/yanbolanblog/content/posts" | wc -l
echo "--- zola build:"
"$LOCALAPPDATA/Programs/zola/zola.exe" build 2>&1 | tail -2
echo "--- git status:"
git -c core.quotepath=false status --short | head -5
git -c core.quotepath=false status --short | wc -l
