import { Chip, Table } from '@heroui/react'
import { PageIntro, UrgencyLegend } from '@/components/PageIntro'
import { TaskCalendar } from '@/components/TaskCalendar'
import { useTimelineBuckets } from '@/hooks/useActionTasks'
import { TIMELINE_BUCKET_LABELS } from '@/lib/urgency'
import { urgencyPanelClass, urgencyStyles } from '@/lib/urgency'
import { cn } from '@/lib/utils'

const BUCKET_ORDER = ['overdue', 'today', 'tomorrow', 'week', 'later'] as const

export function TimelinePage() {
  const buckets = useTimelineBuckets()
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">Timeline & kalender</h2>
        <p className="text-xs text-foreground/70 md:text-sm">Kalender harian + daftar task per periode.</p>
      </div>

      <div className="hidden sm:block">
      <PageIntro
        title="Membaca timeline"
        steps={[
          'Kalender: setiap kotak = satu hari; nama task singkat tampil di dalamnya.',
          'Warna titik = seberapa urgent hari itu (merah paling darurat).',
          'Klik tanggal untuk detail; scroll daftar kelompok untuk checklist per periode.',
        ]}
        legend={<UrgencyLegend />}
      />
      </div>

      <TaskCalendar />

      {BUCKET_ORDER.map((key) => {
        const title = TIMELINE_BUCKET_LABELS[key]
        const items = buckets[key]
        if (items.length === 0) return null
        return (
          <section key={key} className="space-y-2">
            <h3
              className={cn(
                'px-2 py-1 text-xs font-semibold uppercase tracking-wide',
                key === 'overdue' && 'bg-red-100 text-red-900',
                key === 'today' && 'bg-orange-100 text-orange-900',
                key === 'tomorrow' && 'bg-amber-100 text-amber-900',
                key === 'week' && 'bg-yellow-50 text-yellow-900',
                key === 'later' && 'bg-sky-100 text-sky-900',
              )}
            >
              {title}
            </h3>
            <ul className="space-y-1.5 md:hidden">
              {items.map(({ project, task, urgency, urgencyText, deadline }) => (
                <li
                  key={`${project.id}-${task.id}`}
                  className={cn('op-panel border border-border/60 px-2.5 py-2', urgencyPanelClass[urgency])}
                >
                  <p className="text-sm font-medium leading-snug">{task.title}</p>
                  <p className="mt-0.5 text-[11px] text-foreground/55">
                    {project.title} · {deadline}
                  </p>
                  <Chip className={cn('mt-1.5 ring-1', urgencyStyles[urgency])} size="sm" variant="soft">
                    {urgencyText}
                  </Chip>
                </li>
              ))}
            </ul>
            <Table variant="secondary" className="hidden md:block">
              <Table.ScrollContainer>
                <Table.Content aria-label={title} className="min-w-[560px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Task</Table.Column>
                    <Table.Column>Project</Table.Column>
                    <Table.Column>Deadline</Table.Column>
                    <Table.Column>Urgensi</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {items.map(({ project, task, urgency, urgencyText, deadline }) => (
                      <Table.Row key={`${project.id}-${task.id}`} className={urgencyPanelClass[urgency]}>
                        <Table.Cell className="font-medium">{task.title}</Table.Cell>
                        <Table.Cell className="text-sm text-foreground/70">{project.title}</Table.Cell>
                        <Table.Cell className="tabular-nums text-sm">{deadline}</Table.Cell>
                        <Table.Cell>
                          <Chip className={cn('ring-1', urgencyStyles[urgency])} size="sm" variant="soft">
                            {urgencyText}
                          </Chip>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </section>
        )
      })}
    </div>
  )
}
