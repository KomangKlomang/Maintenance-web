import { Card, Chip, Table } from '@heroui/react'
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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Timeline & kalender</h2>
        <p className="text-sm text-foreground/70">Lihat kapan task jatuh tempo — per hari di kalender, per kelompok di bawah.</p>
      </div>

      <PageIntro
        title="Membaca timeline"
        steps={[
          'Kalender: setiap kotak = satu hari; nama task singkat tampil di dalamnya.',
          'Warna titik = seberapa urgent hari itu (merah paling darurat).',
          'Klik tanggal untuk detail; scroll daftar kelompok untuk checklist per periode.',
        ]}
        legend={<UrgencyLegend />}
      />

      <TaskCalendar />

      {BUCKET_ORDER.map((key) => {
        const title = TIMELINE_BUCKET_LABELS[key]
        const items = buckets[key]
        return (
          <section key={key} className="space-y-2">
            <h3
              className={cn(
                'rounded-sm px-2 py-1 text-xs font-semibold uppercase tracking-wide',
                key === 'overdue' && 'bg-red-100 text-red-900',
                key === 'today' && 'bg-orange-100 text-orange-900',
                key === 'tomorrow' && 'bg-amber-100 text-amber-900',
                key === 'week' && 'bg-yellow-50 text-yellow-900',
                key === 'later' && 'bg-sky-100 text-sky-900',
              )}
            >
              {title}
            </h3>
            {items.length === 0 ? (
              <Card className="op-card border border-border/70 p-3">
                <p className="text-sm text-foreground/60">—</p>
              </Card>
            ) : (
              <Table variant="secondary">
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
            )}
          </section>
        )
      })}
    </div>
  )
}
