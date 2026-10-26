import {
  ArrowLeft,
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  LayoutTemplate,
  Settings,
  Plus,
} from 'lucide-react'
import { Button } from '@heroui/react'
import { ActivePicSelect } from '@/components/ActivePicSelect'
import type { AppView } from '@/types'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'

const nav: { id: AppView; label: string; short: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Kerjakan', short: 'Kerja', icon: LayoutDashboard },
  { id: 'projects', label: 'Project', short: 'Proj', icon: FolderKanban },
  { id: 'timeline', label: 'Timeline', short: 'Time', icon: CalendarDays },
  { id: 'templates', label: 'Template', short: 'Templ', icon: LayoutTemplate },
  { id: 'settings', label: 'Atur', short: 'Atur', icon: Settings },
]

export function Layout({
  children,
  onNewProject,
}: {
  children: React.ReactNode
  onNewProject: () => void
}) {
  const activeView = useAppStore((s) => s.activeView)
  const setView = useAppStore((s) => s.setView)
  const clearAppModule = useAppStore((s) => s.clearAppModule)

  return (
    <div className="flex min-h-dvh bg-default/10">
      <aside className="sticky top-0 hidden h-dvh w-[4.25rem] shrink-0 flex-col border-r border-border/60 bg-background md:flex lg:w-[10.25rem]">
        <div className="flex h-12 items-center gap-1 border-b border-border/50 px-1.5 lg:gap-2 lg:px-2">
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label="Kembali ke menu modul"
            className="shrink-0 min-w-8"
            onPress={clearAppModule}
          >
            <ArrowLeft className="size-4" aria-hidden />
          </Button>
          <div className="hidden min-w-0 flex-1 items-baseline gap-0 lg:flex">
            <span className="text-sm font-bold tracking-tight text-blue-700 lg:text-base">Ops</span>
            <span className="font-bold tracking-tight text-blue-700">Track</span>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-1.5" aria-label="Navigasi utama">
          {nav.map(({ id, label, icon: Icon }) => {
            const active = activeView === id
            return (
              <Button
                key={id}
                size="sm"
                aria-label={label}
                className={cn(
                  'h-9 min-h-9 w-full min-w-0 justify-center gap-0 px-0 lg:justify-start lg:gap-2 lg:px-2.5',
                  active && 'bg-blue-600 font-medium text-white hover:bg-blue-700',
                )}
                variant={active ? 'primary' : 'ghost'}
                onPress={() => setView(id)}
              >
                <Icon className="size-[1.125rem] shrink-0" aria-hidden />
                <span className="hidden truncate text-xs lg:inline">{label}</span>
              </Button>
            )
          })}
        </nav>
        <div className="space-y-1.5 p-1.5">
          <div className="hidden lg:block">
            <ActivePicSelect compact />
          </div>
        </div>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col pb-[4.25rem] md:pb-0">
        <header className="sticky top-0 z-10 border-b border-border/60 bg-background/90 backdrop-blur md:hidden">
          <div className="flex h-12 items-center justify-between gap-2 px-3">
            <div className="flex min-w-0 items-center gap-1">
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label="Kembali ke menu modul"
                onPress={clearAppModule}
              >
                <ArrowLeft className="size-4" aria-hidden />
              </Button>
              <h1 className="truncate text-base font-bold text-blue-700">OpsTrack</h1>
            </div>
            {activeView !== 'projects' ? (
              <Button isIconOnly size="sm" variant="primary" aria-label="Project baru" onPress={onNewProject}>
                <Plus className="size-5" />
              </Button>
            ) : (
              <span className="size-8" aria-hidden />
            )}
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-4 md:px-6 md:py-5">{children}</main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/95 backdrop-blur safe-bottom md:hidden"
        aria-label="Navigasi mobile"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5 gap-0.5 px-0.5 py-1">
          {nav.map(({ id, short, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => setView(id)}
                className={cn(
                  'flex w-full flex-col items-center gap-0.5 rounded-md py-1.5 text-[10px] font-medium',
                  activeView === id ? 'bg-blue-600 text-white' : 'text-foreground/60',
                )}
              >
                <Icon className="size-5" aria-hidden />
                {short}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
