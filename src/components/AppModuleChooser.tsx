import type { CSSProperties } from 'react'
import { Building2, ClipboardList, Sparkles } from 'lucide-react'
import { Button } from '@heroui/react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'

const HERO_BG =
  'https://hirael.com/media/blocks/hero-10/fractal-maze.webp'

const stagger = (index: number): CSSProperties => ({ animationDelay: `${index * 70}ms` })

export function AppModuleChooser() {
  const setAppModule = useAppStore((s) => s.setAppModule)
  const lock = useAppStore((s) => s.lock)

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden p-3 sm:p-6">
      <section
        data-slot="hero"
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-xl border border-border/80 bg-background shadow-[0_24px_80px_-20px_rgb(15_23_42_/_0.45)]"
      >
        <img
          src={HERO_BG}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover blur-[2px] md:blur-[3px]"
          loading="eager"
          fetchPriority="high"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-950/75 via-slate-900/65 to-slate-950/85"
        />

        <div className="relative z-10 flex flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12 md:py-14">
          <span
            style={stagger(0)}
            className={cn(
              'op-hero-rise inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm',
            )}
          >
            <Sparkles className="size-3.5 text-amber-300" aria-hidden />
            Workspace terbuka
          </span>

          <h1
            style={stagger(1)}
            className={cn(
              'op-hero-rise-text mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl md:text-5xl',
            )}
          >
            Pilih modul
          </h1>

          <p
            style={stagger(2)}
            className={cn(
              'op-hero-rise-text mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base',
            )}
          >
            Yooo, sup ma broh — ketuk kartu di bawah buat masuk OpsTrack atau Master Toko.
          </p>

          <div
            style={stagger(3)}
            className="op-hero-rise mx-auto mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2 sm:gap-4"
          >
            <ModuleHeroCard
              title="OpsTrack"
              description="Project GO/tutup, task, timeline, template, PIC & WA."
              tone="blue"
              icon={ClipboardList}
              onSelect={() => setAppModule('opstrack')}
            />
            <ModuleHeroCard
              title="Master Toko"
              description="Data master toko (export Excel). Dokumen & sync cloud menyusul."
              tone="emerald"
              icon={Building2}
              onSelect={() => setAppModule('master')}
            />
          </div>

          <div style={stagger(4)} className="op-hero-rise mt-8">
            <Button
              size="sm"
              variant="ghost"
              className="text-white/70 hover:bg-white/10 hover:text-white"
              onPress={lock}
            >
              Kunci workspace
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function ModuleHeroCard({
  title,
  description,
  tone,
  icon: Icon,
  onSelect,
}: {
  title: string
  description: string
  tone: 'blue' | 'emerald'
  icon: typeof ClipboardList
  onSelect: () => void
}) {
  const toneCls =
    tone === 'blue'
      ? 'border-blue-400/35 hover:border-blue-300/60 hover:bg-blue-500/20 focus-visible:ring-blue-400/50'
      : 'border-emerald-400/35 hover:border-emerald-300/60 hover:bg-emerald-500/20 focus-visible:ring-emerald-400/50'

  const iconCls = tone === 'blue' ? 'bg-blue-600 text-white shadow-blue-900/40' : 'bg-emerald-600 text-white shadow-emerald-900/40'

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-lg border bg-white/10 p-1 text-left backdrop-blur-md transition duration-300',
        'hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2',
        toneCls,
      )}
    >
      <span
        className={cn(
          'flex min-h-[7.5rem] flex-1 items-center justify-center rounded-md bg-linear-to-br from-white/5 to-white/0 transition group-hover:from-white/10 sm:min-h-[8.5rem]',
        )}
      >
        <span
          className={cn(
            'flex size-16 items-center justify-center rounded-2xl shadow-lg transition group-hover:scale-105 sm:size-[4.5rem]',
            iconCls,
          )}
        >
          <Icon className="size-8 sm:size-9" strokeWidth={1.75} aria-hidden />
        </span>
      </span>
      <span className="px-3 pb-3 pt-2">
        <span className="block text-base font-semibold text-white">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-white/65">{description}</span>
      </span>
    </button>
  )
}
