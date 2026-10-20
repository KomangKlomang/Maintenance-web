# Publish OpsTrack ke GitHub + Vercel (jalankan di PowerShell sendiri, bukan lewat agent)
# Prasyarat: login GitHub CLI dan Vercel CLI sekali saja.

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "`n=== 1. Cek login GitHub ===" -ForegroundColor Cyan
gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Host "Belum login. Jalankan: gh auth login" -ForegroundColor Yellow
  Write-Host "  Pilih: GitHub.com -> HTTPS -> Login with browser" -ForegroundColor Gray
  exit 1
}

$repoName = if ($env:OPSTRACK_GITHUB_REPO) { $env:OPSTRACK_GITHUB_REPO } else { "opstrack" }
Write-Host "`n=== 2. Buat repo (jika belum ada): $repoName ===" -ForegroundColor Cyan
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  gh repo create $repoName --private --source=. --remote=origin --push
} else {
  Write-Host "Remote sudah ada: $remote"
  git push -u origin main
}

Write-Host "`n=== 3. Deploy Vercel (npx, tanpa install global) ===" -ForegroundColor Cyan
Write-Host "Login browser sekali: npx vercel login" -ForegroundColor Gray
npx --yes vercel@latest deploy --prod

Write-Host "`nSelesai. Hubungkan Git di dashboard Vercel untuk auto-deploy tiap push." -ForegroundColor Green
