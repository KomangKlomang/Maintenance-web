# Product Requirements Document (PRD)
**Nama Produk:** OpsTrack — Sistem Monitoring Project & Task Operasional Toko  
**Versi Dokumen:** 2.2 (Final — Mobile-First PWA, PIN Protection, Vercel Cloud & WhatsApp Notification per PIC)  
**Peran Arsitek:** Senior Full-Stack & Efisiensi Operasional  

---

## 1. Latar Belakang & Tujuan Produk
Operasional pembukaan toko (**Toko GO / Grand Opening**), penutupan toko (**Toko Tutup**), serta pekerjaan operasional harian (**Pekerjaan Random**) memiliki banyak item detail yang harus disiapkan tepat waktu (seperti ITR barang, cetak header, stiker barcode pintu, planogram, akrilik, spanduk, POP A5, stiker harga header, dll).

**Tujuan Utama Web:**
1. **Zero Missed Deadlines (Prioritas Eksekusi Otomatis):** Memisahkan secara otomatis mana pekerjaan yang **harus dikerjakan sekarang (Overdue / H-0 s/d H-2)** dan mana yang masih terjadwal di timeline, baik berdasarkan deadline Project (Tanggal GO/Tutup) maupun **deadline spesifik per Task (misal H-7, H-3 sebelum GO)**.
2. **Kecepatan Input (Zero Friction Template):** Membuat project baru hanya dalam hitungan detik menggunakan **Sistem Template Dinamis**, di mana template bisa diedit, ditambah, atau dikosongkan sesuai kebutuhan.
3. **Fleksibilitas Kedalaman Task (Simpel vs Detil):** Mendukung task **Simpel** maupun task **Detil** yang memiliki rincian sub-item, **Jumlah/Qty** (misal: *Akrilik 10 pcs*), **Catatan**, serta **Deadline per Task**.
4. **Manajemen PIC Ringkas (Nama + No. WA Tanpa Akun Login):** Tidak perlu registrasi akun/profil yang rumit—setiap PIC cukup didaftarkan **Nama** dan **Nomor WhatsApp**-nya saja, bisa ditambah dan dihapus kapan saja.
5. **Notifikasi WhatsApp Langsung ke No. WA PIC & Tim:** Mengirimkan notifikasi langsung ke nomor WhatsApp PIC terkait (maupun nomor utama/grup) saat **ada Project Baru** dan **pengingat otomatis saat mendekati Deadline / Overdue**.
6. **Nyaman di HP (Mobile-First + PWA Installable) & Deploy di Vercel:** Bisa dibuka dari browser HP maupun di-*install* ke layar utama HP (*Add to Home Screen*), ter-deploy di Vercel dengan sinkronisasi *real-time* dan pengaman **PIN Akses Sederhana**.

---

## 2. Kategori / Jenis Pekerjaan & Konfigurasi Template Awal

Sistem memiliki 3 kategori pekerjaan utama (serta mendukung pembuatan template baru):

### A. Toko GO (Grand Opening / Toko Buka) — *Prioritas Utama*
Memiliki template task bawaan yang otomatis muncul saat project dibuat (dan tetap bisa ditambah/dikurangi di dalam project):
1. **ITR Barang** *(Inventory Transfer Request)*
2. **Cetak Header**
3. **Cetak Stiker Barcode Pintu**
4. **Planogram** *(Penyusunan & cetak layout rak)*
5. **Kebutuhan Toko (Mode Detil / Sub-Checklist dengan Qty & Catatan):**
   - **Akrilik** *(dilengkapi input Qty & Catatan)*
   - **Spanduk** *(dilengkapi input Qty & Catatan)*
   - **A5** *(dilengkapi input Qty & Catatan)*
   - **Stiker Harga Header** *(dilengkapi input Qty & Catatan)*
   - *Item tambahan lainnya (bisa ditambah bebas)*

### B. Toko Tutup (Store Closing) — *Prioritas Utama*
- **Template Awal Dikosongkan (`Blank by Default`):** Sesuai keputusan operasional, daftar task bawaan untuk *Toko Tutup* dibiarkan kosong terlebih dahulu agar user dapat mengisinya sendiri secara fleksibel melalui menu **Template** atau menyimpannya langsung dari project *Toko Tutup* pertama yang dibuat.

### C. Pekerjaan Random (Ad-Hoc / Harian)
- Untuk pekerjaan di luar jadwal GO/Tutup toko (misal: *Cetak ulang barcode pintu toko cabang X, kirim akrilik tambahan, tugas dadakan*).
- Mulai dengan daftar kosong yang cepat diisi (*Quick Task*), namun tetap mendukung pengambilan dari template jika dibutuhkan.

---

## 3. Alur Status Pengerjaan (3 Tahap Operasional)
Setiap Task dan Sub-Task menggunakan alur status **3 Tahap** agar mudah membedakan mana yang belum disentuh, mana yang sedang dicetak/diproses, dan mana yang sudah beres:
1. **Belum Dikerjakan (`TODO`)** — *Abu-abu / Merah jika mendekati deadline*
2. **Sedang Proses / Cetak (`IN_PROGRESS`)** — *Kuning / Biru (Sedang dikerjakan oleh PIC)*
3. **Selesai (`DONE`)** — *Hijau (Tuntas)*

> **Interaksi Cepat (Ramah Jempol di HP):** User dapat mengubah status hanya dengan **1x tap/klik pada badge status** (siklus otomatis: `Belum` $\rightarrow$ `Proses/Cetak` $\rightarrow$ `Selesai`) atau memilih langsung dari pilihan status.

---

## 4. Fitur Utama (Functional Requirements)

### 4.1. Dashboard & Panel "Harus Dikerjakan Sekarang"
- **Kartu Ringkasan Atas:**
  - Total Project Aktif (`Toko GO`, `Toko Tutup`, `Random`)
  - Jumlah Task **Harus Dikerjakan Sekarang / Overdue**
  - Jumlah Task **Sedang Proses / Cetak**
  - Persentase Penyelesaian Keseluruhan
- **Panel Utama: "Harus Dikerjakan Sekarang" (Action Now):**
  - Menampilkan daftar task lintas-project yang **Overdue (Terlewat)** atau **mendekati deadline (Hari Ini s/d H-2)** baik berdasarkan deadline task mandiri maupun tanggal GO/Tutup toko.
  - Menampilkan informasi: `Nama Task`, `Kode & Nama Toko`, `Sisa Waktu (misal: Hari Ini / H-1 / Terlambat 2 Hari)`, `PIC (beserta ikon WA cepat)`, dan tombol ubah status (`Belum` $\rightarrow$ `Proses/Cetak` $\rightarrow$ `Selesai`).
- **Review Project Berjalan:**
  - Daftar project yang sedang aktif dengan indikator visual progress bar (`% Selesai`), jumlah task yang masih *Belum* vs *Proses/Cetak* vs *Selesai*, serta daftar PIC yang terlibat.

### 4.2. Struktur Project & Hybrid Tasklist (Simpel vs Detil)
Setiap **Project** memiliki atribut:
- **Nama Project / Nama Toko** (Wajib)
- **Kode Toko** (Opsional/Direkomendasikan, misal: `TK-104`)
- **Jenis Pekerjaan** (`Toko GO`, `Toko Tutup`, `Random`, atau dari Template Kustom)
- **Tanggal Target Utama (Tanggal GO / Tanggal Tutup / Deadline Project)**

Di dalam Project, setiap **Task** mendukung:
- **Deadline Mandiri per Task:** Setiap task di dalam project bisa diberi target tanggal sendiri (atau cepat dipilih dengan tombol *preset* seperti `H-7`, `H-5`, `H-3`, `H-1` sebelum Tanggal GO Toko).
- **PIC Task:** Bisa pilih 1 atau lebih PIC.
- **Pilihan Mode Simpel vs Mode Detil:**
  - **Mode Simpel:** Hanya `Nama Task`, `Status (3 Tahap)`, `Deadline Task`, dan `PIC`.
  - **Mode Detil (Expandable):** Memiliki rincian **Sub-Item / Checklist**, di mana setiap sub-item memiliki:
    - `Nama Item` (contoh: *Akrilik*, *Spanduk*, *A5*, *Stiker Harga Header*)
    - `Jumlah / Qty` (contoh: `12 pcs`, `2 lembar`)
    - `Catatan / Spesifikasi` (contoh: `Ukuran 60x90cm, bahan outdoor`)
    - `Status (Belum / Proses / Selesai)` & `PIC`

### 4.3. Timeline Pekerjaan
- **Visualisasi Jadwal & Urutan Deadline:**
  - Mengelompokkan pekerjaan berdasarkan waktu: **Terlewat (Overdue)**, **Hari Ini**, **Besok**, **Minggu Ini (H-3 s/d H-7)**, dan **Mendatang (> 7 Hari)**.
  - Memudahkan pemantauan jika ada beberapa *Toko GO* atau *Toko Tutup* yang tanggalnya berdekatan.

### 4.4. Manajemen Template Fleksibel
- **Menu Master Template:** User bisa membuat template baru, mengedit template *Toko GO*, mengisi template *Toko Tutup* yang awalnya kosong, atau membuat template khusus lainnya.
- **Tombol "Simpan sebagai Template" di dalam Project:** Ketika user sudah menyusun daftar task dan rincian di sebuah project (misal untuk *Toko Tutup*), dengan 1 klik susunan tersebut bisa disimpan menjadi template tetap untuk project berikutnya.
- **Relative Deadline pada Template:** Template dapat menyimpan aturan H-berapa sebelum tanggal GO (misal: *ITR Barang = H-7*, *Cetak Header = H-3*, *Stiker Barcode Pintu = H-1*), sehingga saat buat project baru tanggal deadline tiap task otomatis terhitung.

### 4.5. Manajemen Data PIC Simpel (Nama + Nomor WA, Tanpa Akun/Login)
- PIC tidak memerlukan pembuatan akun/email/password.
- Data diri PIC yang disimpan sangat ringkas dan fungsional:
  1. **Nama PIC** (contoh: `Budi`, `Andi`)
  2. **Nomor WhatsApp (`phone`)** (contoh: `081234567890` — otomatis dikonversi sistem menjadi format internasional `6281234567890`)
- User dapat menambah PIC baru (Nama + No. WA), mengedit nomor WA, atau menghapus PIC kapan saja langsung dari form maupun daftar PIC.

### 4.6. Sistem Notifikasi WhatsApp (Project Baru & Pengingat Deadline)
Karena setiap PIC memiliki data **Nomor WhatsApp** (ditambah opsi Nomor Utama / Grup Tim), sistem menyediakan mekanisme pengiriman WA untuk 2 kondisi utama:

1. **Trigger A — Notifikasi Saat Project Baru Dibuat (atau Task Ditugaskan):**
   - Ketika project baru disimpan (dan PIC sudah dipilih pada task-tasknya), sistem mengirimkan pesan WhatsApp langsung ke **Nomor WA PIC masing-masing** (serta ke Nomor Utama/Grup jika diaktifkan).
   - **Isi Pesan Otomatis:** Nama Project & Kode Toko, Jenis Pekerjaan (*Toko GO / Tutup / Random*), Tanggal Target/GO, daftar spesifik task beserta Qty yang menjadi tanggung jawab PIC tersebut, serta link langsung untuk membuka web.
2. **Trigger B — Pengingat Deadline Otomatis (Rekap Pagi Harian):**
   - Setiap pagi (misal pukul **08:00 WIB** melalui *Vercel Cron Job*), sistem memeriksa seluruh task yang belum `Selesai` yang berstatus **Overdue (Terlewat)**, **Deadline Hari Ini (H-0)**, atau **Mendekati Deadline (H-1 s/d H-2)**.
   - Sistem otomatis mengirimkan pesan pengingat ke **Nomor WA PIC yang bertanggung jawab** atas task tersebut (dan rekap keseluruhan ke Nomor Utama/Grup).
3. **Dual-Mode Delivery (Otomatis via API + Direct WA Klik):**
   - **Mode Otomatis (Background API):** Terintegrasi dengan WhatsApp Gateway API populer (seperti *Fonnte / Wablas*) melalui *Vercel Serverless API Route*, sehingga pesan terkirim sendiri di background.
   - **Mode Langsung (Direct `wa.me` Trigger):** Di setiap kartu PIC / Project juga terdapat tombol ikon WhatsApp yang jika ditekan langsung membuka chat WhatsApp ke nomor PIC tersebut dengan isi pesan tugas/deadline yang sudah diketikkan otomatis oleh sistem (100% berjalan bahkan tanpa kuota API).

---

## 5. Spesifikasi Mobile (HP), PWA & Deployment Vercel (Non-Functional Requirements)

### 5.1. Pengalaman Mobile-First & PWA (Progressive Web App)
- **Adaptive Navigation:**
  - **Di Layar PC/Laptop:** Menggunakan *Sidebar Kiri* dan *Multi-Column Layout* agar semua informasi terlihat sekaligus.
  - **Di Layar HP (Android / iPhone):** Otomatis menggunakan **Bottom Navigation Bar** (Menu Bawah: *Kerjakan Sekarang*, *Project*, *Timeline*, *Template & PIC*) serta *Bottom Sheet Modal* yang mudah dioperasikan dengan satu tangan (jempol).
- **Installable ke Home Screen (PWA):**
  - Dilengkapi Web App Manifest (`manifest.webmanifest`) dan Service Worker ringan.
  - Saat dibuka di Chrome (Android) atau Safari (iPhone), user dapat menekan **"Tambahkan ke Layar Utama" (Add to Home Screen)** sehingga aplikasi memiliki ikon sendiri di HP dan berjalan *full-screen* tanpa address bar browser.

### 5.2. Keamanan Ringan dengan PIN Workspace (1x Input per Perangkat)
- Karena URL Vercel bersifat publik di internet (`https://nama-project.vercel.app`), aplikasi dilengkapi **Layar Kunci PIN (Workspace PIN Gate)**.
- User/tim cukup memasukkan PIN (misal 4 atau 6 digit) **satu kali saja** saat pertama kali membuka di HP atau PC.
- Status sesi disimpan di perangkat (`localStorage`), sehingga setiap kali aplikasi dibuka kembali langsung masuk ke Dashboard tanpa perlu ketik PIN berulang-ulang.
