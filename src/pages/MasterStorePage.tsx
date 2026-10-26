import { useMemo, useRef, useState } from 'react'
import { ArrowLeft, Download, RotateCcw, Search, Upload } from 'lucide-react'
import { Button, Chip, Input } from '@heroui/react'
import { MasterStoreDetailView } from '@/components/MasterStoreDetailView'
import { MasterStoreColumnHeader } from '@/components/MasterStoreFilterBar'
import { TableCheckbox } from '@/components/TableCheckbox'
import {
  countActiveFilters,
  EMPTY_MASTER_FILTERS,
  filterMasterStores,
  sortMasterStores,
  type MasterStoreListFilters,
  type MasterStoreSortKey,
  type SortDirection,
} from '@/lib/masterStoreList'
import { exportMasterStoresExcel, parseMasterStoresExcel, readFileAsArrayBuffer } from '@/lib/masterStoreExcel'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'
import type { MasterStore } from '@/types/masterStore'

export function MasterStorePage() {
  const clearAppModule = useAppStore((s) => s.clearAppModule)
  const lock = useAppStore((s) => s.lock)
  const masterStoreDataset = useAppStore((s) => s.masterStoreDataset)
  const mergeMasterStoresFromExcel = useAppStore((s) => s.mergeMasterStoresFromExcel)
  const stores = masterStoreDataset.stores

  const [q, setQ] = useState('')
  const [listFilters, setListFilters] = useState<MasterStoreListFilters>(EMPTY_MASTER_FILTERS)
  const [sortKey, setSortKey] = useState<MasterStoreSortKey>('storeCode')
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [detailCode, setDetailCode] = useState<string | null>(null)
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [importMsg, setImportMsg] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const stats = useMemo(() => {
    const aktif = stores.filter((s) => isActive(s.status)).length
    return { total: stores.length, aktif, non: stores.length - aktif }
  }, [stores])

  const filtered = useMemo(() => {
    const matched = filterMasterStores(stores, q, listFilters)
    return sortMasterStores(matched, sortKey, sortDir)
  }, [stores, q, listFilters, sortKey, sortDir])

  const onHeaderSort = (key: MasterStoreSortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filteredCodes = useMemo(() => filtered.map((s) => s.storeCode), [filtered])
  const allSelected = filteredCodes.length > 0 && filteredCodes.every((c) => selected.has(c))
  const someSelected = filteredCodes.some((c) => selected.has(c))
  const selectedStores = useMemo(
    () => stores.filter((s) => selected.has(s.storeCode)),
    [stores, selected],
  )

  const detailStore = detailCode ? stores.find((s) => s.storeCode === detailCode) : null

  if (detailStore) {
    return <MasterStoreDetailView store={detailStore} onBack={() => setDetailCode(null)} />
  }

  const toggleOne = (code: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  const toggleAllFiltered = () => {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev)
        filteredCodes.forEach((c) => next.delete(c))
        return next
      })
    } else {
      setSelected((prev) => {
        const next = new Set(prev)
        filteredCodes.forEach((c) => next.add(c))
        return next
      })
    }
  }

  const runExport = (list: MasterStore[], suffix: string) => {
    if (list.length === 0) return
    const stamp = new Date().toISOString().slice(0, 10)
    exportMasterStoresExcel(list, `Export_Master_Store_${stamp}_${suffix}.xlsx`)
  }

  const onImportFile = async (file: File) => {
    setImportMsg(null)
    try {
      const buf = await readFileAsArrayBuffer(file)
      const parsed = parseMasterStoresExcel(buf)
      if (parsed.length === 0) {
        setImportMsg('File tidak berisi baris toko (cek kolom Kode Toko).')
        return
      }
      const stats = mergeMasterStoresFromExcel(parsed, file.name)
      setImportMsg(
        `Import selesai: ${stats.added} baru, ${stats.updated} diperbarui, ${stats.unchanged} sama (tidak diubah).`,
      )
    } catch {
      setImportMsg('Gagal baca Excel. Pastikan format export master toko.')
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const bulkBar =
    selected.size > 0 ? (
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 bg-emerald-50/80 px-3 py-2 text-sm dark:bg-emerald-950/25">
        <span className="font-medium text-foreground/80">{selected.size} dipilih</span>
        <Button size="sm" variant="secondary" className="h-8" onPress={() => runExport(selectedStores, 'selected')}>
          <Download className="size-3.5" aria-hidden />
          Export terpilih
        </Button>
        <Button size="sm" variant="ghost" className="h-8" onPress={() => setSelected(new Set())}>
          Batal pilih
        </Button>
      </div>
    ) : null

  return (
    <div className="flex min-h-dvh flex-col bg-default/10">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-3 py-3 md:px-6">
          <Button size="sm" variant="ghost" onPress={clearAppModule}>
            <ArrowLeft className="size-4" aria-hidden />
            Modul
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-emerald-800">Master Toko</h1>
            <p className="text-[11px] text-foreground/50">
              {masterStoreDataset.meta.total} toko · {masterStoreDataset.meta.source}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void onImportFile(f)
              }}
            />
            <Button size="sm" variant="secondary" onPress={() => fileRef.current?.click()}>
              <Upload className="size-3.5" aria-hidden />
              Update Excel
            </Button>
            <Button size="sm" variant="secondary" onPress={() => runExport(stores, 'all')}>
              <Download className="size-3.5" aria-hidden />
              Export semua
            </Button>
            <Button size="sm" variant="secondary" onPress={lock}>
              Kunci
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-4 px-3 py-4 md:px-6 md:py-5">
        {importMsg ? (
          <p className="rounded-sm border border-emerald-200/80 bg-emerald-50/90 px-3 py-2 text-sm text-emerald-900" role="status">
            {importMsg}
          </p>
        ) : null}

        <div className="grid grid-cols-3 gap-2 sm:max-w-md">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Aktif" value={stats.aktif} tone="ok" />
          <StatCard label="Non-aktif" value={stats.non} tone="muted" />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground/40" aria-hidden />
            <Input
              className="w-full ps-9"
              placeholder="Cari kode, nama, region, kota…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Cari toko"
            />
          </div>
          <p className="text-xs text-foreground/50 sm:ms-auto">
            Tampil <span className="font-semibold tabular-nums">{filtered.length}</span> / {stores.length}
          </p>
          {countActiveFilters(listFilters) > 0 ? (
            <Button
              size="sm"
              variant="ghost"
              className="h-8"
              onPress={() => {
                setListFilters(EMPTY_MASTER_FILTERS)
                setSortKey('storeCode')
                setSortDir('asc')
              }}
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Reset filter
            </Button>
          ) : null}
        </div>

        <div className="op-list-table border border-border/70 bg-background">
          {bulkBar}
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-default/30 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
                <th className="w-12 px-3 py-2.5">
                  <TableCheckbox
                    aria-label="Pilih semua toko di filter"
                    isSelected={allSelected}
                    isIndeterminate={someSelected && !allSelected}
                    onChange={toggleAllFiltered}
                  />
                </th>
                <MasterStoreColumnHeader
                  label="Kode"
                  sortKey="storeCode"
                  filterKey="storeCode"
                  stores={stores}
                  allowed={listFilters.storeCode}
                  onAllowedChange={(v) => setListFilters((f) => ({ ...f, storeCode: v }))}
                  activeSortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onHeaderSort}
                />
                <MasterStoreColumnHeader
                  label="Nama"
                  sortKey="name"
                  filterKey="name"
                  stores={stores}
                  allowed={listFilters.name}
                  onAllowedChange={(v) => setListFilters((f) => ({ ...f, name: v }))}
                  activeSortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onHeaderSort}
                />
                <MasterStoreColumnHeader
                  label="Status"
                  sortKey="status"
                  filterKey="status"
                  stores={stores}
                  allowed={listFilters.status}
                  onAllowedChange={(v) => setListFilters((f) => ({ ...f, status: v }))}
                  activeSortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onHeaderSort}
                />
                <MasterStoreColumnHeader
                  label="Region"
                  sortKey="region"
                  filterKey="region"
                  stores={stores}
                  allowed={listFilters.region}
                  onAllowedChange={(v) => setListFilters((f) => ({ ...f, region: v }))}
                  activeSortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onHeaderSort}
                />
                <MasterStoreColumnHeader
                  label="Kota"
                  sortKey="city"
                  filterKey="city"
                  stores={stores}
                  allowed={listFilters.city}
                  onAllowedChange={(v) => setListFilters((f) => ({ ...f, city: v }))}
                  activeSortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onHeaderSort}
                />
                <MasterStoreColumnHeader
                  label="AM / AC"
                  sortKey="areaManager"
                  filterKey="areaManager"
                  stores={stores}
                  allowed={listFilters.areaManager}
                  onAllowedChange={(v) => setListFilters((f) => ({ ...f, areaManager: v }))}
                  activeSortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onHeaderSort}
                />
                <MasterStoreColumnHeader
                  label="Jam"
                  filterKey="openHours"
                  stores={stores}
                  allowed={listFilters.openHours}
                  onAllowedChange={(v) => setListFilters((f) => ({ ...f, openHours: v }))}
                  activeSortKey={sortKey}
                  sortDir={sortDir}
                  onSort={onHeaderSort}
                  sortable={false}
                />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <StoreRow
                  key={s.storeCode}
                  store={s}
                  checked={selected.has(s.storeCode)}
                  onCheckedChange={() => toggleOne(s.storeCode)}
                  onOpen={() => setDetailCode(s.storeCode)}
                />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="p-6 text-center text-sm text-foreground/50">Tidak ada toko cocok filter.</p>
          ) : null}
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, tone }: { label: string; value: number; tone?: 'ok' | 'muted' }) {
  return (
    <div className="op-panel border border-border/60 bg-background px-3 py-2 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground/45">{label}</p>
      <p
        className={cn(
          'text-xl font-bold tabular-nums',
          tone === 'ok' && 'text-emerald-700',
          tone === 'muted' && 'text-foreground/55',
        )}
      >
        {value}
      </p>
    </div>
  )
}

function StoreRow({
  store,
  checked,
  onCheckedChange,
  onOpen,
}: {
  store: MasterStore
  checked: boolean
  onCheckedChange: () => void
  onOpen: () => void
}) {
  const active = isActive(store.status)
  return (
    <tr className="border-b border-border/40 last:border-0 hover:bg-default/15">
      <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
        <TableCheckbox aria-label={`Pilih ${store.name}`} isSelected={checked} onChange={onCheckedChange} />
      </td>
      <td
        className="cursor-pointer px-3 py-2.5 font-mono text-xs font-semibold"
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen()
          }
        }}
        tabIndex={0}
        role="link"
      >
        {store.storeCode}
      </td>
      <td className="max-w-[12rem] cursor-pointer px-3 py-2.5" onClick={onOpen}>
        <p className="truncate font-medium text-emerald-900 underline-offset-2 hover:underline">{store.name}</p>
        <p className="truncate text-[11px] text-foreground/45">{store.address}</p>
      </td>
      <td className="cursor-pointer px-3 py-2.5" onClick={onOpen}>
        <Chip size="sm" variant="soft" className={active ? 'bg-emerald-100 text-emerald-900' : 'bg-default/30'}>
          {store.status ?? '—'}
        </Chip>
      </td>
      <td className="cursor-pointer px-3 py-2.5 text-xs text-foreground/70" onClick={onOpen}>
        {store.region}
      </td>
      <td className="cursor-pointer px-3 py-2.5 text-xs text-foreground/70" onClick={onOpen}>
        {store.city}
      </td>
      <td className="max-w-[10rem] cursor-pointer px-3 py-2.5 text-[11px] leading-snug text-foreground/60" onClick={onOpen}>
        <p className="truncate">{store.areaManager ?? '—'}</p>
        <p className="truncate text-foreground/40">{store.areaCoordinator ?? ''}</p>
      </td>
      <td className="cursor-pointer whitespace-nowrap px-3 py-2.5 text-xs tabular-nums text-foreground/65" onClick={onOpen}>
        {store.openTime && store.closeTime ? `${store.openTime}–${store.closeTime}` : '—'}
      </td>
    </tr>
  )
}

function isActive(status: string | null | undefined): boolean {
  if (!status) return false
  const s = status.toLowerCase()
  return s.includes('aktif') && !s.includes('non')
}
