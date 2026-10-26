import { ArrowLeft } from 'lucide-react'
import { Button, Chip } from '@heroui/react'
import {
  MASTER_STORE_DETAIL_SECTIONS,
  MASTER_STORE_FIELD_LABELS,
} from '@/lib/masterStoreColumns'
import { formatStoreFieldValue } from '@/lib/masterStoreNormalize'
import { cn } from '@/lib/utils'
import type { MasterStore } from '@/types/masterStore'

export function MasterStoreDetailView({
  store,
  onBack,
}: {
  store: MasterStore
  onBack: () => void
}) {
  const active = isActive(store.status)

  return (
    <div className="flex min-h-dvh flex-col bg-default/10">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-start gap-2 px-3 py-3 md:px-6">
          <Button size="sm" variant="ghost" onPress={onBack} aria-label="Kembali ke daftar">
            <ArrowLeft className="size-4" aria-hidden />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs font-semibold text-emerald-800">{store.storeCode}</p>
            <h1 className="text-lg font-bold leading-tight">{store.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Chip size="sm" variant="soft" className={active ? 'bg-emerald-100 text-emerald-900' : 'bg-default/30'}>
                {store.status ?? '—'}
              </Chip>
              {store.region ? (
                <span className="text-xs text-foreground/55">{store.region}</span>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-3 py-4 md:px-6 md:py-5">
        {MASTER_STORE_DETAIL_SECTIONS.map(({ title, keys }) => (
          <section key={title} className="op-panel border border-border/70 bg-background p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/45">{title}</h2>
            <dl className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
              {keys.map((key) => (
                <div key={key} className={cn(key === 'address' || key === 'notes' ? 'sm:col-span-2' : '')}>
                  <dt className="text-[11px] font-medium text-foreground/45">{MASTER_STORE_FIELD_LABELS[key]}</dt>
                  <dd className="text-sm leading-snug text-foreground/90 break-words">
                    {formatStoreFieldValue(store[key])}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </main>
    </div>
  )
}

function isActive(status: string | null | undefined): boolean {
  if (!status) return false
  const s = status.toLowerCase()
  return s.includes('aktif') && !s.includes('non')
}
