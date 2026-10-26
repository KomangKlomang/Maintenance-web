/**
 * Generate INSERT SQL for stores from src/data/masterStores.json
 * Usage: node scripts/generate-stores-seed.mjs > supabase/seed-stores.sql
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const raw = JSON.parse(readFileSync(join(root, 'src/data/masterStores.json'), 'utf8'))

function esc(s) {
  if (s == null) return 'null'
  return `'${String(s).replace(/'/g, "''")}'`
}

const lines = [
  '-- Seed stores (workspace slug: default)',
  `delete from stores where workspace_id = (select id from workspaces where slug = 'default');`,
  '',
]

for (const s of raw.stores) {
  const openHours =
    s.openTime && s.closeTime ? `${s.openTime}–${s.closeTime}` : null
  const rawJson = esc(JSON.stringify(s))
  lines.push(`insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  ${esc(s.storeCode)}, ${esc(s.name)}, ${esc(s.origin)}, ${esc(s.address)}, ${esc(s.region)},
  ${esc(s.province)}, ${esc(s.city)}, ${esc(s.district)}, ${esc(s.zipCode)}, ${esc(s.status)},
  ${esc(s.areaCoordinator)}, ${esc(s.areaManager)}, ${s.latitude ?? 'null'}, ${s.longitude ?? 'null'},
  ${s.goLiveDate ? esc(s.goLiveDate) : 'null'}, ${esc(s.phone)}, ${esc(openHours)},
  ${s.closedDate ? esc(s.closedDate) : 'null'}, ${esc(s.storeType)}, ${esc(s.notes)},
  ${esc(s.openTime)}, ${esc(s.closeTime)}, ${rawJson}::jsonb
);`)
}

const out = join(root, 'supabase/seed-stores.sql')
writeFileSync(out, lines.join('\n') + '\n', 'utf8')
console.log(`Wrote ${raw.stores.length} stores -> ${out}`)
console.log('Run file in Supabase SQL Editor (after initial migration).')
