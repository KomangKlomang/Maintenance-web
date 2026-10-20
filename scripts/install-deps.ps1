$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path (Join-Path $root "package.json"))) {
  $root = "E:\Maintenance web"
}

$cache = Join-Path $root ".npm-cache"
$tmp = Join-Path $root ".tmp"
New-Item -ItemType Directory -Force -Path $cache | Out-Null
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

$env:npm_config_cache = $cache
$env:TEMP = $tmp
$env:TMP = $tmp

Set-Location $root

Write-Host "Cache npm: $cache"
Write-Host "TEMP: $tmp"

# Bebaskan ruang di C: — cache npm & temp lama sering penuhi drive sistem
$userNpmCache = Join-Path $env:LOCALAPPDATA "npm-cache"
if (Test-Path $userNpmCache) {
  Write-Host "Menghapus cache npm lama di $userNpmCache ..."
  Remove-Item -LiteralPath $userNpmCache -Recurse -Force -ErrorAction SilentlyContinue
}
$userTemp = Join-Path $env:LOCALAPPDATA "Temp"
if (Test-Path $userTemp) {
  Get-ChildItem -LiteralPath $userTemp -ErrorAction SilentlyContinue |
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-2) } |
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Menjalankan npm install ..."
npm install --no-fund --no-audit
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "OK. Jalankan: npm run dev"
