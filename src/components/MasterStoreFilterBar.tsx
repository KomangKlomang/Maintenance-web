import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDownAZ, ArrowUpAZ, Filter, Search } from 'lucide-react'
import { Button, Input } from '@heroui/react'
import { TableCheckbox } from '@/components/TableCheckbox'
import {
  type MasterStoreFilterKey,
  type MasterStoreSortKey,
  type SortDirection,
  filterOptionsForKey,
} from '@/lib/masterStoreList'
import { cn } from '@/lib/utils'
import type { MasterStore } from '@/types/masterStore'

export function MasterStoreColumnHeader({
  label,
  sortKey,
  filterKey,
  stores,
  allowed,
  onAllowedChange,
  activeSortKey,
  sortDir,
  onSort,
  className,
  sortable = true,
}: {
  label: string
  sortKey?: MasterStoreSortKey
  filterKey: MasterStoreFilterKey
  stores: MasterStore[]
  allowed: string[] | null
  onAllowedChange: (allowed: string[] | null) => void
  activeSortKey: MasterStoreSortKey
  sortDir: SortDirection
  onSort: (key: MasterStoreSortKey) => void
  className?: string
  sortable?: boolean
}) {
  const options = useMemo(() => filterOptionsForKey(stores, filterKey), [stores, filterKey])
  const active = sortKey != null && activeSortKey === sortKey
  const filterActive = allowed !== null

  return (
    <th className={cn('relative px-2 py-1.5 align-top', className)}>
      <div className="flex items-center gap-0.5">
        {sortable && sortKey ? (
          <button
            type="button"
            className={cn(
              'inline-flex min-w-0 flex-1 items-center gap-0.5 text-left text-[11px] font-semibold uppercase tracking-wide hover:text-foreground/80',
              active ? 'text-emerald-800' : 'text-foreground/50',
            )}
            onClick={() => onSort(sortKey)}
          >
            <span className="truncate">{label}</span>
            {active ? (
              sortDir === 'asc' ? (
                <ArrowDownAZ className="size-3 shrink-0" aria-hidden />
              ) : (
                <ArrowUpAZ className="size-3 shrink-0" aria-hidden />
              )
            ) : null}
          </button>
        ) : (
          <span className="flex-1 truncate text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
            {label}
          </span>
        )}
        <HeaderFilterMenu
          label={label}
          options={options}
          allowed={allowed}
          onAllowedChange={onAllowedChange}
          active={filterActive}
        />
      </div>
    </th>
  )
}

function HeaderFilterMenu({
  label,
  options,
  allowed,
  onAllowedChange,
  active,
}: {
  label: string
  options: string[]
  allowed: string[] | null
  onAllowedChange: (allowed: string[] | null) => void
  active: boolean
}) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const effective = allowed ?? options
  const allOn = allowed === null
  const filteredOptions = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return options
    return options.filter((o) => o.toLowerCase().includes(needle))
  }, [options, q])

  const selectedInView = filteredOptions.filter((o) => effective.includes(o))
  const allInViewSelected = filteredOptions.length > 0 && selectedInView.length === filteredOptions.length
  const someInViewSelected = selectedInView.length > 0 && !allInViewSelected

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const toggleValue = (value: string) => {
    const base = allowed === null ? [...options] : [...allowed]
    const has = base.includes(value)
    const next = has ? base.filter((v) => v !== value) : [...base, value]
    if (next.length === 0) {
      onAllowedChange([])
      return
    }
    if (next.length === options.length) {
      onAllowedChange(null)
      return
    }
    onAllowedChange(next)
  }

  const setAllInView = (select: boolean) => {
    if (select) {
      if (allowed === null) return
      const merged = new Set([...(allowed ?? []), ...filteredOptions])
      const next = [...merged]
      onAllowedChange(next.length === options.length ? null : next)
    } else {
      const remain = (allowed === null ? options : allowed).filter((v) => !filteredOptions.includes(v))
      onAllowedChange(remain.length === 0 ? [] : remain.length === options.length ? null : remain)
    }
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className={cn(
          'flex size-6 items-center justify-center rounded-sm text-foreground/45 hover:bg-default/40 hover:text-foreground/70',
          active && 'bg-emerald-100 text-emerald-800',
          open && 'bg-default/30',
        )}
        aria-label={`Filter ${label}`}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
      >
        <Filter className="size-3" aria-hidden />
      </button>

      {open ? (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-md border border-border/80 bg-background shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-border/60 p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-3 -translate-y-1/2 text-foreground/40" aria-hidden />
              <Input
                className="h-7 w-full ps-7 text-xs"
                placeholder="Cari…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label={`Cari filter ${label}`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 border-b border-border/60 px-2 py-1">
            <TableCheckbox
              aria-label={`Pilih semua ${label}`}
              isSelected={allInViewSelected}
              isIndeterminate={someInViewSelected}
              onChange={() => setAllInView(!allInViewSelected)}
            />
            <span className="text-[11px] text-foreground/55">Pilih semua</span>
          </div>
          <ul className="max-h-44 overflow-y-auto py-0.5">
            {filteredOptions.map((opt) => {
              const checked = allOn || effective.includes(opt)
              return (
                <li key={opt} className="flex items-center gap-2 px-2 py-1 text-xs hover:bg-default/20">
                  <TableCheckbox aria-label={opt} isSelected={checked} onChange={() => toggleValue(opt)} />
                  <span className="truncate">{opt}</span>
                </li>
              )
            })}
            {filteredOptions.length === 0 ? (
              <li className="px-2 py-2 text-[11px] text-foreground/45">Tidak ada cocok.</li>
            ) : null}
          </ul>
          <div className="border-t border-border/60 p-1.5">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-full text-[11px]"
              onPress={() => {
                onAllowedChange(null)
                setQ('')
                setOpen(false)
              }}
            >
              Hapus filter
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
