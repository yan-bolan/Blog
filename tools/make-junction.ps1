$ErrorActionPreference = "Stop"
$link = "D:\博客\YuriBlog\content"
$target = "E:\服务器备份\yanbolanblog\content"
if (Test-Path $link) { throw "link path already exists" }
New-Item -ItemType Junction -Path $link -Target $target | Out-Null
Write-Output "junction created: $link -> $target"
Write-Output ("posts via junction: " + (Get-ChildItem "$link\posts" -Filter *.md).Count)
