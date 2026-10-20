import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Card, Chip } from '@heroui/react'
import { diffDaysFromToday, formatShortDate, parseYmd, toYmd } from '@/lib/dates'
import { getUrgencyLevel, taskEffectiveDeadline, urgencyLabel, urgencyStyles } from '@/lib/urgency'
import { cn } from '@/lib/utils'
import type { FlatTask } from '@/hooks/useActionTasks'
import { useAppStore } from '@/store/appStore'

const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function monthMatrix(view: Date): (string | null)[][] {
  const y = view.getFullYear()
  const m = view.getMonth()
  const first = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0).getDate()
  const startPad = first.getDay()
  const cells: (string | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= lastDay; d++) cells.push(toYmd(new Date(y, m, d)))
  while (cells.length % 7 !== 0) cells.push(null)
  const rows: (string | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
  return rows
}

function worstUrgency(items: FlatTask[]): FlatTask['urgency'] {
  const rank: Record<FlatTask['urgency'], number> = { overdue: 0, do_now: 1, soon: 2, scheduled: 3 }
  return items.reduce<FlatTask['urgency']>(
    (best, it) => (rank[it.urgency] < rank[best] ? it.urgency : best),
    'scheduled',
  )
}

const urgencyCellTint = {
  overdue: 'bg-red-50/90 hover:bg-red-50',
  do_now: 'bg-orange-50/80 hover:bg-orange-50',
  soon: 'bg-amber-50/70 hover:bg-amber-50',
  scheduled: 'bg-sky-50/60 hover:bg-sky-50',
} as const

const urgencyTaskPill = {
  overdue: 'bg-red-100/90 text-red-900 ring-red-200/80',
  do_now: 'bg-orange-100/90 text-orange-900 ring-orange-200/80',
  soon: 'bg-amber-100/90 text-amber-900 ring-amber-200/80',
  scheduled: 'bg-sky-100/90 text-sky-900 ring-sky-200/80',
} as const

export function TaskCalendar() {
  const projects = useAppStore((s) => s.projects)
  const [viewMonth, setViewMonth] = useState(() => {
    const t = new Date()
    return new Date(t.getFullYear(), t.getMonth(), 1)
  })
  const [selectedYmd, setSelectedYmd] = useState(() => toYmd(new Date()))

  const byDate = useMemo(() => {
    const map = new Map<string, FlatTask[]>()
    for (const project of projects) {
      for (const task of project.tasks) {
        if (task.status === 'done') continue
        const deadline = taskEffectiveDeadline(task, project)
        const urgency = getUrgencyLevel(deadline, task.status)
        if (!urgency) continue
        const item: FlatTask = {
          project,
          task,
          deadline,
          urgency,
          urgencyText: urgencyLabel(urgency, deadline),
        }
        if (!map.has(deadline)) map.set(deadline, [])
        map.get(deadline)!.push(item)
      }
    }
    for (const [, list] of map) {
      list.sort((a, b) => a.task.title.localeCompare(b.task.title))
    }
    return map
  }, [projects])

  const matrix = monthMatrix(viewMonth)
  const monthLabel = viewMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
  const selectedTasks = byDate.get(selectedYmd) ?? []
  const todayYmd = toYmd(new Date())

  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="op-panel overflow-hidden border border-border/70 bg-background p-0 shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-default/5 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700">
              <CalendarDays className="size-4" aria-hidden />
            </span>
            <h3 className="truncate text-base font-semibold capitalize">{monthLabel}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              isIconOnly
              size="sm"
              variant="tertiary"
              className="rounded-lg"
              aria-label="Bulan sebelumnya"
              onPress={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 rounded-lg px-2.5 text-xs font-medium"
              onPress={() => {
                const t = new Date()
                setViewMonth(new Date(t.getFullYear(), t.getMonth(), 1))
                setSelectedYmd(todayYmd)
              }}
            >
              Hari ini
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="tertiary"
              className="rounded-lg"
              aria-label="Bulan berikutnya"
              onPress={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d, idx) => (
              <div
                key={d}
                className={cn(
                  'py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-foreground/45',
                  idx === 0 && 'text-red-500/70',
                )}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {matrix.flat().map((ymd, i) => {
              if (!ymd) {
                return (
                  <div
                    key={`empty-${i}`}
                    className="min-h-[4.75rem] rounded-lg bg-default/5 sm:min-h-[5.25rem]"
                    aria-hidden
                  />
                )
              }
              const items = byDate.get(ymd) ?? []
              const inMonth = parseYmd(ymd).getMonth() === viewMonth.getMonth()
              const isSelected = ymd === selectedYmd
              const isToday = ymd === todayYmd
              const tone = items.length ? worstUrgency(items) : null
              const dayNum = parseYmd(ymd).getDate()

              return (
                <button
                  key={ymd}
                  type="button"
                  onClick={() => setSelectedYmd(ymd)}
                  className={cn(
                    'flex min-h-[4.75rem] flex-col rounded-lg border border-transparent p-1.5 text-left transition sm:min-h-[5.25rem]',
                    'hover:border-border/60 hover:shadow-sm',
                    !inMonth && 'opacity-35',
                    tone && urgencyCellTint[tone],
                    !tone && 'bg-background hover:bg-default/10',
                    isSelected && 'border-blue-500/80 bg-blue-50/50 ring-2 ring-blue-500/25',
                    isToday && !isSelected && 'border-blue-400/50 bg-blue-50/40',
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-0.5">
                    <span
                      className={cn(
                        'inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold tabular-nums',
                        isToday && 'bg-blue-600 text-white shadow-sm',
                        !isToday && isSelected && 'text-blue-700',
                        !isToday && !isSelected && 'text-foreground/80',
                      )}
                    >
                      {dayNum}
                    </span>
                    {items.length > 0 ? (
                      <span className="rounded-full bg-foreground/10 px-1.5 py-px text-[9px] font-semibold tabular-nums text-foreground/55">
                        {items.length}
                      </span>
                    ) : null}
                  </div>
                  <ul className="min-h-0 flex-1 space-y-0.5 overflow-hidden">
                    {items.slice(0, 2).map(({ project, task, urgency }) => (
                      <li
                        key={`${project.id}-${task.id}`}
                        className={cn(
                          'truncate rounded px-1 py-px text-[9px] font-medium leading-tight ring-1 sm:text-[10px]',
                          urgencyTaskPill[urgency],
                        )}
                        title={`${task.title} · ${project.title}`}
                      >
                        {task.title}
                      </li>
                    ))}
                    {items.length > 2 ? (
                      <li className="px-0.5 text-[9px] font-medium text-foreground/45">+{items.length - 2}</li>
                    ) : null}
                  </ul>
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/40 pt-3 text-[10px] text-foreground/50">
            <span className="font-medium text-foreground/60">Legenda:</span>
            {(
              [
                ['Terlambat', 'bg-red-500'],
                ['H-0/H-1', 'bg-orange-500'],
                ['Segera', 'bg-amber-500'],
                ['Terjadwal', 'bg-sky-500'],
              ] as const
            ).map(([label, dot]) => (
              <span key={label} className="inline-flex items-center gap-1">
                <span className={cn('size-1.5 rounded-full', dot)} aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Card className="op-panel flex flex-col border border-border/70 bg-background p-0 shadow-sm">
        <div className="border-b border-border/50 px-4 py-3">
          <h3 className="text-base font-semibold">{formatShortDate(selectedYmd)}</h3>
          <p className="mt-0.5 text-xs text-foreground/55">
            {diffDaysFromToday(selectedYmd) === 0
              ? 'Hari ini'
              : diffDaysFromToday(selectedYmd) > 0
                ? `${diffDaysFromToday(selectedYmd)} hari lagi`
                : `Terlambat ${Math.abs(diffDaysFromToday(selectedYmd))} hari`}
            {selectedTasks.length > 0 ? ` · ${selectedTasks.length} task` : ''}
          </p>
        </div>
        <div className="flex-1 p-4">
          {selectedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-medium text-foreground/70">Tidak ada deadline</p>
              <p className="mt-1 max-w-[14rem] text-xs text-foreground/45">
                Pilih tanggal lain di kalender atau tambah task dengan deadline.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {selectedTasks.map(({ project, task, urgency, urgencyText }) => (
                <li
                  key={`${project.id}-${task.id}`}
                  className={cn(
                    'rounded-lg border border-border/50 p-3 shadow-sm',
                    urgencyPanelClass[urgency],
                  )}
                >
                  <p className="text-sm font-semibold leading-snug">{task.title}</p>
                  <p className="mt-0.5 text-xs text-foreground/55">{project.title}</p>
                  <Chip className={cn('mt-2 ring-1', urgencyStyles[urgency])} size="sm" variant="soft">
                    {urgencyText}
                  </Chip>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  )
}

const urgencyPanelClass = {
  overdue: 'border-l-[3px] border-l-red-500 bg-red-50/50',
  do_now: 'border-l-[3px] border-l-orange-500 bg-orange-50/40',
  soon: 'border-l-[3px] border-l-amber-500 bg-amber-50/35',
  scheduled: 'border-l-[3px] border-l-sky-500 bg-sky-50/35',
} as const
