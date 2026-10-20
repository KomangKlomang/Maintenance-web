# Software Design Specification (SDS)
**Nama Produk:** OpsTrack — Sistem Monitoring Project & Task Operasional Toko  
**Versi Dokumen:** 2.2 (Final — Mobile-First PWA, PIN Gate, Cloud Sync, Vercel Cron & WhatsApp Notification per PIC)  
**Prinsip Arsitektur:** *High-Speed, Zero-Bloat, Cloud-Synced, Mobile-First PWA & Automated WA Alerts*  

---

## 1. Arsitektur Sistem & Tech Stack (Vercel + Mobile PWA + WA Engine)
Dirancang agar sangat cepat dijalankan di Desktop maupun HP oleh seluruh tim secara bersama-sama, mendukung pengiriman notifikasi ke WhatsApp PIC, serta dapat di-deploy ke **Vercel**:

- **Frontend Framework:** **React 18 + Vite + TypeScript + Tailwind CSS** + **Lucide Icons**
  - Build time cepat dan didistribusikan melalui **Vercel Global Edge Network**.
- **PWA (Progressive Web App) Engine:** `vite-plugin-pwa` / Native `manifest.webmanifest`
  - Mendukung mode `display: "standalone"` (tampil layar penuh seperti aplikasi native Android/iOS saat ditambahkan ke Home Screen).
- **Backend & Cloud Database:** **Supabase (PostgreSQL + Realtime Broadcast)** dengan **Hybrid Local Fallback (`Zustand Persist`)**
  - **Optimistic UI (< 10ms):** Saat tombol status di-tap di HP (`Belum` $\rightarrow$ `Proses/Cetak` $\rightarrow$ `Selesai`), layar langsung berubah seketika.
  - **Real-Time Sync:** Perubahan otomatis dikirim ke Supabase dan disinkronkan ke PC/HP anggota tim lain.
- **WhatsApp Notification Service (Vercel Serverless Functions + Cron Jobs):**
  - `POST /api/wa/notify-project`: Mengirim pesan WA otomatis ke nomor WA setiap PIC yang terlibat (dan/atau nomor utama/grup) saat project baru dibuat.
  - `GET /api/cron/deadline-digest`: Dijadwalkan via **Vercel Cron** setiap pagi (`0 1 * * *` UTC / `08:00 WIB`) untuk memindai task yang *Overdue* atau *H-0 s/d H-2*, lalu mengirim rekap tagihan pekerjaan langsung ke nomor WA masing-masing PIC.
  - **Direct WA Deep-Link Generator (`wa.me/62...`):** Fungsi utilitas client-side yang memformat nomor WA PIC dan menyusun teks pesan otomatis agar user juga bisa langsung *klik-dan-kirim* ke nomor WA PIC dari HP/WhatsApp Web kapan saja (tanpa bergantung pada kuota API).
- **Keamanan Akses Publik:** **Workspace PIN Gate**
  - Mencegah orang luar yang membuka link `.vercel.app` melihat atau mengubah data toko. Cukup input 1x per perangkat.

---

## 2. Desain Skema Database (PostgreSQL / Supabase & TypeScript Schema)

### 2.1. Skema Tabel Cloud Database (`SQL`)

```sql
-- 1. Tabel Master PIC (Data diri ringkas: Nama & Nomor WA, tanpa akun login)
CREATE TABLE pics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,    -- Disimpan terformat "62812xxxx" untuk pengiriman WA langsung
  role_note TEXT,         -- Opsional: ket. singkat (misal "Tim Cetak" / " Gudang")
  color TEXT NOT NULL DEFAULT 'blue',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabel Master Template Pekerjaan
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'toko_go' | 'toko_tutup' | 'random' | custom
  tasks_blueprint JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabel Project (Toko GO, Toko Tutup, Random)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  store_code TEXT,           -- Contoh: "TK-088"
  category TEXT NOT NULL,    -- 'toko_go' | 'toko_tutup' | 'random'
  target_date DATE NOT NULL, -- Tanggal GO / Tanggal Tutup / Deadline Utama
  notes TEXT,
  tasks JSONB NOT NULL DEFAULT '[]'::jsonb, -- Menyimpan daftar Task & SubTask
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2.2. Kontrak Data TypeScript (`src/types/index.ts`)

```typescript
// Status 3 Tahap sesuai kebutuhan operasional
export type WorkStatus = 'todo' | 'in_progress' | 'done';
// 'todo'        = Belum Dikerjakan
// 'in_progress' = Sedang Proses / Cetak
// 'done'        = Selesai

export type ProjectCategory = 'toko_go' | 'toko_tutup' | 'random';

// Entitas PIC dengan Data Diri Ringkas (Nama + Nomor WA)
export interface PIC {
  id: string;
  name: string;          // Contoh: "Budi"
  phone: string;         // Contoh: "6281234567890" (otomatis dinormalisasi dari 0812...)
  roleNote?: string;     // Opsional (Contoh: "Cetak / Produksi")
  color: string;
}

// Sub-item untuk Task Mode Detil (contoh: Akrilik, Spanduk, A5, Stiker Harga Header)
export interface SubTaskItem {
  id: string;
  title: string;
  qty: string;           // Contoh: "10 pcs", "2 set"
  notes: string;         // Catatan spesifikasi / kendala
  status: WorkStatus;    // 3 Tahap: Belum -> Proses/Cetak -> Selesai
  picIds: string[];      // PIC spesifik sub-item (opsional)
}

// Task Utama di dalam Project
export interface TaskItem {
  id: string;
  title: string;         // Contoh: "ITR Barang", "Cetak Header", "Kebutuhan Toko"
  status: WorkStatus;    // 3 Tahap: Belum -> Proses/Cetak -> Selesai
  isDetailed: boolean;   // false = Simpel, true = Detil (memiliki subTasks/qty/notes)
  qty?: string;          // Opsional jika task utama punya qty langsung
  notes?: string;        // Catatan task
  deadline?: string;     // ISO Date (YYYY-MM-DD) - Deadline spesifik task (misal H-7 / H-3)
  offsetDays?: number;   // Opsional dari template (misal -7 berarti H-7 sebelum Tanggal GO)
  picIds: string[];      // Daftar ID PIC yang bertanggung jawab
  subTasks: SubTaskItem[];
}

// Blueprint Task pada Template
export interface TemplateTaskBlueprint {
  id: string;
  title: string;
  isDetailed: boolean;
  offsetDays?: number;   // Contoh: -7 (H-7), -3 (H-3), 0 (Hari H)
  defaultQty?: string;
  defaultNotes?: string;
  subTasks: {
    id: string;
    title: string;
    defaultQty?: string;
    defaultNotes?: string;
  }[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  category: ProjectCategory;
  tasksBlueprint: TemplateTaskBlueprint[];
}

export interface Project {
  id: string;
  title: string;
  storeCode?: string;    // Kode Toko (misal: "T045")
  category: ProjectCategory;
  targetDate: string;    // Tanggal GO / Tanggal Tutup / Deadline Project (YYYY-MM-DD)
  notes?: string;
  tasks: TaskItem[];
  createdAt: string;
  updatedAt: string;
}
```

---

## 3. Spesifikasi Teknis Notifikasi WhatsApp (`WA Notification Engine`)

### 3.1. Normalisasi Nomor WA Otomatis (`normalizePhone`)
Saat user menginput nomor WA pada data diri PIC, sistem otomatis menormalisasi formatnya agar selalu valid untuk link `wa.me` maupun API Gateway:
- Input `0812-3456-7890` $\rightarrow$ Disimpan sebagai `6281234567890`
- Input `+62 812 3456 7890` $\rightarrow$ Disimpan sebagai `6281234567890`

### 3.2. Skenario 1: Notifikasi Project Baru ke WA PIC (`notifyNewProject`)
Ketika sebuah project baru dibuat (misal: **GO Toko Kemang (`TK-102`)**), sistem mengelompokkan task berdasarkan `picIds` dan mengirimkan pesan ke nomor WA masing-masing PIC (serta ke Nomor Utama/Grup jika disetel):

**Contoh Format Pesan WA yang Dikirim Otomatis ke PIC:**
```text
*📌 PROJECT BARU: GO Toko Kemang (TK-102)*
Kategori: *Toko GO*
Target Utama/GO: *30 Okt 2026*

Halo *Budi*, berikut daftar pekerjaan yang ditugaskan kepada Anda:
1. *Cetak Header* (Deadline: 27 Okt 2026 / H-3)
2. *Kebutuhan Toko* (Deadline: 28 Okt 2026 / H-2):
   - Akrilik (10 pcs)
   - Spanduk (2 pcs)

🔗 Cek & update status pengerjaan di sini:
https://opstrack.vercel.app
```

### 3.3. Skenario 2: Pengingat Deadline Pagi Otomatis (`Vercel Cron` + Instant Trigger)
Setiap pagi pukul **08:00 WIB**, endpoint `/api/cron/deadline-digest` berjalan otomatis di Vercel:
1. Mengambil seluruh project yang memiliki task berstatus `todo` atau `in_progress` dengan tanggal `deadline <= today + 2 hari`.
2. Mengelompokkan task mendesak tersebut per **PIC (`pic.phone`)** dan juga menyusun 1 rekap gabungan untuk **Nomor WA Utama/Grup**.
3. Mengirimkan pengingat via WhatsApp Gateway API (misal *Fonnte*) sehingga setiap PIC langsung menerima daftar pekerjaan yang harus dibereskan hari itu di HP masing-masing.

---

## 4. Konfigurasi Deployment Vercel (`vercel.json` & Environment Variables)

### 4.1. File Konfigurasi `vercel.json` (Termasuk Jadwal Cron WA Pagi)

```json
{
  "crons": [
    {
      "path": "/api/cron/deadline-digest",
      "schedule": "0 1 * * *"
    }
  ],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/manifest.webmanifest",
      "headers": [
        { "key": "Content-Type", "value": "application/manifest+json" }
      ]
    }
  ]
}
```
*(Catatan: Jadwal Cron `0 1 * * *` adalah pukul 01:00 UTC atau tepat pukul **08:00 Pagi WIB** setiap hari).*

### 4.2. Variabel Lingkungan (Environment Variables di Vercel)
- `VITE_WORKSPACE_PIN`: Kode PIN akses tim (default `1234` jika belum diatur).
- `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`: Koneksi database Cloud Supabase.
- `WA_API_TOKEN`: Token WhatsApp Gateway (misal Fonnte) untuk pengiriman WA otomatis di background.
- `WA_MAIN_GROUP_OR_ADMIN_PHONE`: Nomor WA Utama Anda atau ID Grup WA Tim untuk menerima salinan semua project baru & rekap deadline pagi.

---

## 5. Arsitektur UI Responsif (Mobile-First vs Desktop)

| Komponen UI | Tampilan di HP (`< 768px`) | Tampilan di PC / Laptop (`>= 768px`) |
| :--- | :--- | :--- |
| **Navigasi Utama** | **Fixed Bottom Navigation Bar** (4 Tab di bawah layar + Tombol tengah `+ Project` yang mudah dijangkau jempol) | **Left Sidebar Navigation** lengkap dengan ringkasan cepat & tombol `+ Project Baru` |
| **Daftar Task & Sub-Item** | **Touch Card Layout**: Tombol ubah status berukuran minimal `44x44px` agar tidak salah pencet; rincian *Kebutuhan Toko* dibuka dengan *Accordion* vertikal | **Dense Table / Split-View**: Daftar project di kiri, rincian task & sub-item langsung terbuka di panel kanan |
| **Kartu PIC & Tombol WA** | Tap pada badge PIC bisa langsung pilih **"Kirim Pengingat WA"** yang langsung meneruskan pesan ke nomor WA PIC (`pic.phone`) | Klik tombol WA pada task/project untuk kirim otomatis via API atau buka WhatsApp Web ke nomor PIC |
| **Install ke Perangkat** | Mendukung **"Add to Home Screen"** (Full-screen tanpa bar URL browser) | Bisa diakses via browser standar atau di-install sebagai Desktop PWA |

---

## 6. Konfigurasi Data Awal (Default Templates)

1. **Template "Toko GO (Grand Opening)":**
   - `ITR Barang` *(Default: H-7)*
   - `Planogram` *(Default: H-5)*
   - `Cetak Header` *(Default: H-3)*
   - `Cetak Stiker Barcode Pintu` *(Default: H-3)*
   - `Kebutuhan Toko` *(Mode Detil, Default: H-2)* dengan Sub-Item:
     - `Akrilik` *(Qty & Catatan siap isi)*
     - `Spanduk` *(Qty & Catatan siap isi)*
     - `A5` *(Qty & Catatan siap isi)*
     - `Stiker Harga Header` *(Qty & Catatan siap isi)*
2. **Template "Toko Tutup":**
   - Sesuai spesifikasi user: **Dikosongkan (`[]`)** secara default agar user dapat menyusun sendiri item-nya melalui menu **Template** atau dari project berjalan.
3. **Template "Pekerjaan Random":**
   - Kosong (`[]`), siap ditambahkan task cepat kapan saja.
