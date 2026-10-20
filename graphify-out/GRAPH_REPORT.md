# Graph Report - Maintenance web  (2026-10-20)

## Corpus Check
- Corpus is ~4,111 words - fits in a single context window. You may not need a graph.

## Summary
- 55 nodes · 71 edges · 7 communities
- Extraction: 61% EXTRACTED · 39% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Template & Jenis Toko
- PIC & Notifikasi WA
- Stack React Vercel Supabase
- Model Project & Task
- PWA Mobile & PIN
- Dashboard & Deadline
- Cron WA & API Gateway

## God Nodes (most connected - your core abstractions)
1. `OpsTrack` - 6 edges
2. `GET /api/cron/deadline-digest` - 6 edges
3. `TaskItem Interface` - 6 edges
4. `Sistem Template Dinamis` - 5 edges
5. `Task (Simpel vs Detil, Deadline, PIC)` - 5 edges
6. `Menu Master Template` - 5 edges
7. `Manajemen PIC (Nama + WhatsApp, Tanpa Akun Login)` - 5 edges
8. `PIC Interface` - 5 edges
9. `Alur Status 3 Tahap (TODO / IN_PROGRESS / DONE)` - 4 edges
10. `Dashboard Panel Harus Dikerjakan Sekarang` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ProjectTemplate Interface` --semantically_similar_to--> `Sistem Template Dinamis`  [INFERRED] [semantically similar]
  SDS.md → PRD.md
- `Dashboard Panel Harus Dikerjakan Sekarang` --semantically_similar_to--> `GET /api/cron/deadline-digest`  [INFERRED] [semantically similar]
  PRD.md → SDS.md
- `Supabase Table templates` --semantically_similar_to--> `Menu Master Template`  [INFERRED] [semantically similar]
  SDS.md → PRD.md
- `TaskItem Interface` --semantically_similar_to--> `Relative Deadline pada Template (H-n)`  [INFERRED] [semantically similar]
  SDS.md → PRD.md
- `WorkStatus Type (todo | in_progress | done)` --semantically_similar_to--> `Alur Status 3 Tahap (TODO / IN_PROGRESS / DONE)`  [INFERRED] [semantically similar]
  SDS.md → PRD.md

## Hyperedges (group relationships)
- **WhatsApp Notification Flow (Project Baru + Deadline Digest)** — prd_wa_trigger_project_baru, prd_wa_trigger_deadline_pagi, prd_wa_dual_mode, sds_api_wa_notify_project, sds_api_cron_deadline_digest, sds_vercel_cron_08_wib, sds_wa_gateway_fonnte, sds_wa_me_deep_link_generator, sds_normalize_phone, sds_type_pic [EXTRACTED 0.95]
- **OpsTrack Core Data Model (Projects, Tasks, Templates, PICs)** — sds_table_projects, sds_table_templates, sds_table_pics, sds_type_project, sds_type_taskitem, sds_type_subtaskitem, sds_type_project_template, sds_type_pic, prd_project, prd_task, prd_dynamic_template_system [INFERRED 0.95]
- **Mobile-First Cloud Stack (PWA, Vercel, Supabase, PIN)** — prd_mobile_first_pwa, prd_pin_workspace_gate, prd_vercel_realtime_deploy, sds_vite_plugin_pwa, sds_supabase_postgresql_realtime, sds_zustand_persist_fallback, sds_workspace_pin_gate, sds_vercel_json, sds_react_vite_typescript_tailwind [INFERRED 0.85]

## Communities (7 total, 0 thin omitted)

### Community 0 - "Template & Jenis Toko"
Cohesion: 0.22
Nodes (11): Sistem Template Dinamis, Kebutuhan Toko (Mode Detil), Menu Master Template, Pekerjaan Random (Ad-Hoc), Relative Deadline pada Template (H-n), Simpan sebagai Template, Toko GO (Grand Opening), Toko Tutup (Store Closing) (+3 more)

### Community 1 - "PIC & Notifikasi WA"
Cohesion: 0.24
Nodes (11): Manajemen PIC (Nama + WhatsApp, Tanpa Akun Login), Dual-Mode WA (API Otomatis + wa.me Direct), Trigger B — Pengingat Deadline Pagi (08:00 WIB), Trigger A — Notifikasi Project Baru ke WA PIC, POST /api/wa/notify-project, WA_MAIN_GROUP_OR_ADMIN_PHONE, normalizePhone, notifyNewProject (+3 more)

### Community 2 - "Stack React Vercel Supabase"
Cohesion: 0.20
Nodes (10): Lucide Icons (Anti-Pattern: No Emoji Icons), Touch-Friendly UI (44x44px, cursor-pointer), Deploy Vercel dengan Sinkronisasi Real-Time, Alur Status 3 Tahap (TODO / IN_PROGRESS / DONE), VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY, OpsTrack System Architecture (Vercel + PWA + WA Engine), React 18 + Vite + TypeScript + Tailwind CSS, Supabase (PostgreSQL + Realtime Broadcast) (+2 more)

### Community 3 - "Model Project & Task"
Cohesion: 0.43
Nodes (7): Project (Nama Toko, Kode, Kategori, Tanggal Target), Sub-Item Checklist (Qty, Catatan, Status, PIC), Task (Simpel vs Detil, Deadline, PIC), Supabase Table projects, Project Interface, SubTaskItem Interface, TaskItem Interface

### Community 4 - "PWA Mobile & PIN"
Cohesion: 0.33
Nodes (6): Mobile-First PWA Installable, Workspace PIN Gate (1x per Perangkat), VITE_WORKSPACE_PIN, Bottom Navigation Bar (Mobile <768px), PWA Engine (vite-plugin-pwa / manifest.webmanifest), Workspace PIN Gate

### Community 5 - "Dashboard & Deadline"
Cohesion: 0.40
Nodes (5): OpsTrack Design System, Dashboard Panel Harus Dikerjakan Sekarang, OpsTrack, Timeline Pekerjaan, Zero Missed Deadlines (Prioritas Eksekusi Otomatis)

### Community 6 - "Cron WA & API Gateway"
Cohesion: 0.40
Nodes (5): GET /api/cron/deadline-digest, WA_API_TOKEN, Vercel Cron (0 1 * * * UTC / 08:00 WIB), vercel.json (Crons, Rewrites, Manifest Headers), WhatsApp Gateway API (Fonnte / Wablas)

## Knowledge Gaps
- **15 isolated node(s):** `Toko Tutup (Store Closing)`, `Pekerjaan Random (Ad-Hoc)`, `Timeline Pekerjaan`, `Simpan sebagai Template`, `Kebutuhan Toko (Mode Detil)` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `OpsTrack` connect `Dashboard & Deadline` to `Template & Jenis Toko`, `PIC & Notifikasi WA`, `Stack React Vercel Supabase`, `PWA Mobile & PIN`?**
  _High betweenness centrality (0.432) - this node is a cross-community bridge._
- **Why does `Manajemen PIC (Nama + WhatsApp, Tanpa Akun Login)` connect `PIC & Notifikasi WA` to `Dashboard & Deadline`?**
  _High betweenness centrality (0.252) - this node is a cross-community bridge._
- **Why does `TaskItem Interface` connect `Model Project & Task` to `Template & Jenis Toko`, `PIC & Notifikasi WA`, `Cron WA & API Gateway`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `OpsTrack` (e.g. with `OpsTrack Design System` and `OpsTrack System Architecture (Vercel + PWA + WA Engine)`) actually correct?**
  _`OpsTrack` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `GET /api/cron/deadline-digest` (e.g. with `Dashboard Panel Harus Dikerjakan Sekarang` and `Trigger B — Pengingat Deadline Pagi (08:00 WIB)`) actually correct?**
  _`GET /api/cron/deadline-digest` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `TaskItem Interface` (e.g. with `Relative Deadline pada Template (H-n)` and `Task (Simpel vs Detil, Deadline, PIC)`) actually correct?**
  _`TaskItem Interface` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Toko Tutup (Store Closing)`, `Pekerjaan Random (Ad-Hoc)`, `Timeline Pekerjaan` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._