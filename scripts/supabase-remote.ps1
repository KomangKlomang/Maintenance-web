# Jalankan migration/seed ke Supabase remote (pooler IPv4)
# Set password sekali: $env:SUPABASE_DB_PASSWORD = '...'
param(
  [ValidateSet('migrate', 'seed', 'verify')]
  [string]$Action = 'verify'
)

$ErrorActionPreference = 'Stop'
$ref = 'ozcnfxlzoazssbssbihp'
$dbHost = 'aws-0-ap-northeast-1.pooler.supabase.com'
$user = "postgres.$ref"
$root = Split-Path $PSScriptRoot -Parent

if (-not $env:SUPABASE_DB_PASSWORD) {
  Write-Host 'Set SUPABASE_DB_PASSWORD dulu (password DB Supabase).' -ForegroundColor Yellow
  exit 1
}

$env:PGPASSWORD = $env:SUPABASE_DB_PASSWORD

switch ($Action) {
  'migrate' {
    psql -h $dbHost -U $user -d postgres -p 5432 -v ON_ERROR_STOP=1 -f (Join-Path $root 'supabase/migrations/20251026140000_initial.sql')
  }
  'seed' {
    psql -h $dbHost -U $user -d postgres -p 5432 -v ON_ERROR_STOP=1 -f (Join-Path $root 'supabase/seed-stores.sql')
  }
  'verify' {
    psql -h $dbHost -U $user -d postgres -p 5432 -c 'select count(*) as stores from stores;'
  }
}
