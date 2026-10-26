# Deploy production ke Vercel (CLI)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "Build lokal..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`nDeploy Vercel (--prod)..." -ForegroundColor Cyan
Write-Host "Jika belum login: npx vercel login" -ForegroundColor Gray
npx --yes vercel@latest deploy --prod --yes

Write-Host "`nSet env di dashboard: VITE_WORKSPACE_PIN, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY" -ForegroundColor Yellow
