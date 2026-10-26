import type { MasterStore } from '@/types/masterStore'

export type MasterStoreSortKey = 'storeCode' | 'name' | 'status' | 'region' | 'city' | 'areaManager'
export type SortDirection = 'asc' | 'desc'

export type MasterStoreFilterKey =
  | 'storeCode'
  | 'name'
  | 'status'
  | 'region'
  | 'city'
  | 'areaManager'
  | 'openHours'

export type MasterStoreListFilters = Record<MasterStoreFilterKey, string[] | null>

export const EMPTY_MASTER_FILTERS: MasterStoreListFilters = {
  storeCode: null,
  name: null,
  status: null,
  region: null,
  city: null,
  areaManager: null,
  openHours: null,
}

export function fieldDisplay(value: MasterStore[keyof MasterStore]): string {
  if (value == null || value === '') return '—'
  return String(value).trim()
}

export function storeOpenHours(store: MasterStore): string {
  if (store.openTime && store.closeTime) return `${store.openTime}–${store.closeTime}`
  return '—'
}

export function uniqueFieldValues(stores: MasterStore[], key: keyof MasterStore): string[] {
  const set = new Set<string>()
  for (const s of stores) {
    set.add(fieldDisplay(s[key]))
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'id', { sensitivity: 'base' }))
}

export function uniqueOpenHours(stores: MasterStore[]): string[] {
  const set = new Set<string>()
  for (const s of stores) {
    set.add(storeOpenHours(s))
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'id', { sensitivity: 'base' }))
}

export function filterOptionsForKey(stores: MasterStore[], key: MasterStoreFilterKey): string[] {
  if (key === 'openHours') return uniqueOpenHours(stores)
  return uniqueFieldValues(stores, key)
}

function matchesAllowList(value: string, allowed: string[] | null): boolean {
  if (allowed === null) return true
  if (allowed.length === 0) return false
  return allowed.includes(value)
}

export function filterMasterStores(
  stores: MasterStore[],
  q: string,
  filters: MasterStoreListFilters,
): MasterStore[] {
  const needle = q.trim().toLowerCase()
  return stores.filter((s) => {
    if (!matchesAllowList(s.storeCode, filters.storeCode)) return false
    if (!matchesAllowList(fieldDisplay(s.name), filters.name)) return false
    if (!matchesAllowList(fieldDisplay(s.status), filters.status)) return false
    if (!matchesAllowList(fieldDisplay(s.region), filters.region)) return false
    if (!matchesAllowList(fieldDisplay(s.city), filters.city)) return false
    if (!matchesAllowList(fieldDisplay(s.areaManager), filters.areaManager)) return false
    if (!matchesAllowList(storeOpenHours(s), filters.openHours)) return false
    if (!needle) return true
    const hay = [s.storeCode, s.name, s.region, s.city, s.address, s.status, s.province]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return hay.includes(needle)
  })
}

function sortValue(store: MasterStore, key: MasterStoreSortKey): string {
  switch (key) {
    case 'storeCode':
      return store.storeCode
    case 'name':
      return fieldDisplay(store.name)
    case 'status':
      return fieldDisplay(store.status)
    case 'region':
      return fieldDisplay(store.region)
    case 'city':
      return fieldDisplay(store.city)
    case 'areaManager':
      return fieldDisplay(store.areaManager)
    default:
      return ''
  }
}

export function sortMasterStores(
  list: MasterStore[],
  sortKey: MasterStoreSortKey,
  sortDir: SortDirection,
): MasterStore[] {
  const dir = sortDir === 'asc' ? 1 : -1
  return [...list].sort((a, b) => {
    const cmp = sortValue(a, sortKey).localeCompare(sortValue(b, sortKey), 'id', { sensitivity: 'base' })
    if (cmp !== 0) return cmp * dir
    return a.storeCode.localeCompare(b.storeCode, 'id', { sensitivity: 'base' }) * dir
  })
}

export function countActiveFilters(filters: MasterStoreListFilters): number {
  return (Object.keys(filters) as MasterStoreFilterKey[]).filter((k) => filters[k] !== null).length
}
