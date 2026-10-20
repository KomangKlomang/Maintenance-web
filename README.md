# OpsTrack

Monitoring pekerjaan operasional toko (GO / Tutup / Random) — lokal dulu, siap deploy Vercel.

## Jalankan lokal

```bash
npm install
npm run dev
```

Jika `npm install` gagal (`ENOSPC` / disk penuh di C:), jalankan:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-deps.ps1
```

Proyek memakai `.npmrc` + cache di `.npm-cache` (drive E:) agar install tidak memenuhi C:.
PWA (`vite-plugin-pwa`) sementara dinonaktifkan agar dependency lebih ringan; dev server tetap penuh fitur app.

Buka `http://localhost:5173` — PIN default: **1234** (ubah lewat `VITE_WORKSPACE_PIN`).

## Graph knowledge

- `graphify-out/graph.html` — peta relasi PRD/SDS/design system
- `graphify-out/GRAPH_REPORT.md` — laporan graphify

## Deploy Vercel

Push repo → import di Vercel → set env opsional:

- `VITE_WORKSPACE_PIN`
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (sync cloud, fase berikutnya)
- `WA_API_TOKEN`, `WA_MAIN_GROUP_OR_ADMIN_PHONE` (cron WA otomatis, fase berikutnya)
