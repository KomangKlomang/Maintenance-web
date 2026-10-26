import type { MasterStore } from '@/types/masterStore'
import { MASTER_STORE_EXCEL_COLUMNS } from '@/lib/masterStoreColumns'

export function normalizeCell(value: unknown): string | number | null {
  if (value == null || value === '') return null
  if (typeof value === 'boolean') return value ? 1 : 0
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return null
    if (Number.isInteger(value)) return value
    return Math.round(value * 1e9) / 1e9
  }
  if (value instanceof Date) {
    const iso = value.toISOString().slice(0, 10)
    return iso
  }
  const s = String(value).trim()
  if (!s || s === '-') return null
  const asNum = Number(s)
  if (s.match(/^-?\d+\.?\d*$/) && !Number.isNaN(asNum)) {
    if (Number.isInteger(asNum)) return asNum
    return asNum
  }
  return s
}

export function normalizeStore(raw: Partial<MasterStore> & { storeCode: string | number }): MasterStore {
  const storeCode = String(raw.storeCode).trim()
  const out: MasterStore = {
    storeCode,
    name: storeCode,
    origin: null,
    address: null,
    region: null,
    province: null,
    city: null,
    district: null,
    zipCode: null,
    status: null,
    areaCoordinator: null,
    areaManager: null,
    latitude: null,
    longitude: null,
    goLiveDate: null,
    notes: null,
    phone: null,
    closedDate: null,
    storeType: null,
    relocationBuilding: null,
    relocationGs: null,
    openTime: null,
    closeTime: null,
    createdBy: null,
    createdAt: null,
    updatedAt: null,
    approvedBy: null,
    approvedAt: null,
  }
  for (const { key } of MASTER_STORE_EXCEL_COLUMNS) {
    if (key === 'storeCode') continue
    const v = raw[key]
    ;(out as Record<keyof MasterStore, MasterStore[keyof MasterStore]>)[key] = normalizeCell(v) as MasterStore[typeof key]
  }
  if (raw.name != null) out.name = String(normalizeCell(raw.name) ?? storeCode)
  return out
}

const STORE_KEYS = MASTER_STORE_EXCEL_COLUMNS.map((c) => c.key)

export function storeSnapshot(store: MasterStore): Record<string, string | number | null> {
  const snap: Record<string, string | number | null> = {}
  for (const key of STORE_KEYS) {
    snap[key] = normalizeCell(store[key])
  }
  return snap
}

export function storesEqual(a: MasterStore, b: MasterStore): boolean {
  const sa = storeSnapshot(a)
  const sb = storeSnapshot(b)
  for (const key of STORE_KEYS) {
    if (sa[key] !== sb[key]) return false
  }
  return true
}

export function formatStoreFieldValue(value: MasterStore[keyof MasterStore]): string {
  if (value == null || value === '') return '—'
  return String(value)
}

export function mergeMasterStores(
  current: MasterStore[],
  imported: MasterStore[],
): { stores: MasterStore[]; stats: { added: number; updated: number; unchanged: number } } {
  const byCode = new Map(current.map((s) => [s.storeCode, s]))
  let added = 0
  let updated = 0
  let unchanged = 0
  for (const inc of imported) {
    const prev = byCode.get(inc.storeCode)
    if (!prev) {
      byCode.set(inc.storeCode, inc)
      added++
    } else if (storesEqual(prev, inc)) {
      unchanged++
    } else {
      byCode.set(inc.storeCode, inc)
      updated++
    }
  }
  const stores = [...byCode.values()].sort((a, b) => a.storeCode.localeCompare(b.storeCode))
  return { stores, stats: { added, updated, unchanged } }
}
