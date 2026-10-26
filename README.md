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

Setelah PIN, pilih modul **OpsTrack** (project & task) atau **Master Toko** (data export Excel). Master toko saat ini dari `src/data/masterStores.json`; re-import: `powershell -File .\scripts\import-master-stores.ps1 -ExcelPath "..."`.

Copy `.env.example` → `.env` untuk variabel lokal. Skema DB cloud: `supabase/schema.sql`.

## Graph knowledge

- `graphify-out/graph.html` — peta relasi PRD/SDS/design system
- `graphify-out/GRAPH_REPORT.md` — laporan graphify

## Deploy Vercel

```powershell
# Login sekali
npx vercel login
gh auth login   # optional, untuk push GitHub

# Deploy production dari folder proyek
powershell -File .\scripts\deploy-vercel.ps1
```

Atau hubungkan repo GitHub di [Vercel Dashboard](https://vercel.com/new) → import `Maintenance-web` → auto-deploy tiap push.

**Environment variables (Production):**

| Variable | Wajib | Keterangan |
|----------|-------|------------|
| `VITE_WORKSPACE_PIN` | Ya (prod) | Ganti dari default 1234 |
| `VITE_SUPABASE_URL` | Untuk DB cloud | Dari Supabase → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Untuk DB cloud | Anon public key |

Database: lihat [`supabase/README.md`](supabase/README.md) — buat project Supabase, jalankan migration, optional seed toko.

Cron WA (`WA_API_TOKEN`, …) menyusul setelah folder `api/` ada.
