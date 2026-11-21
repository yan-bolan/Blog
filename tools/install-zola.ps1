# 将便携版 Zola 安装到用户目录并加入用户 PATH（无需管理员）
$ErrorActionPreference = "Stop"
$dest = Join-Path $env:LOCALAPPDATA "Programs\zola"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$src = "D:\博客\YuriBlog\tools\zola.exe"
if (Test-Path $src) { Move-Item $src (Join-Path $dest "zola.exe") -Force; Write-Output "moved: $src -> $dest" }
elseif (Test-Path (Join-Path $dest "zola.exe")) { Write-Output "already installed" }
else { throw "zola.exe not found" }
$p = [Environment]::GetEnvironmentVariable("Path", "User")
if ($p -notlike "*$dest*") {
  [Environment]::SetEnvironmentVariable("Path", ($p.TrimEnd(";") + ";" + $dest), "User")
  Write-Output "PATH(user) += $dest"
} else { Write-Output "PATH already contains $dest" }
& (Join-Path $dest "zola.exe") --version
