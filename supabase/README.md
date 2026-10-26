# Supabase (database cloud)

## 1. Buat project

1. Buka [Supabase Dashboard](https://supabase.com/dashboard) → **New project**.
2. Catat **Project URL** dan **anon public** key (Settings → API).

## 2. Terapkan skema

**Opsi A — SQL Editor (paling cepat)**

1. Dashboard → **SQL** → New query.
2. Salin isi `supabase/migrations/20251026140000_initial.sql` → **Run**.

**Opsi B — Supabase CLI**

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## 3. (Opsional) Isi master toko ke DB

App saat ini masih pakai `localStorage` + seed JSON. Untuk mengisi tabel `stores`:

```powershell
# Generate SQL dari JSON (setelah script dijalankan, paste output ke SQL Editor)
node scripts/generate-stores-seed.mjs
```

Atau tunggu fase sync app ↔ Supabase (env `VITE_SUPABASE_*` sudah disiapkan).

## 4. Env di Vercel

Di project Vercel → **Settings → Environment Variables**:

| Key | Value |
|-----|--------|
| `VITE_WORKSPACE_PIN` | PIN production (jangan pakai 1234) |
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | anon key |

Redeploy setelah env disimpan.

## 5. Storage (nanti)

Bucket `store-documents` untuk upload dokumen toko — buat manual di Storage saat fitur dokumen aktif.
