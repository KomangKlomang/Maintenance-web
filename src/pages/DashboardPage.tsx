import { MessageCircle } from 'lucide-react'
import { Button, Chip } from '@heroui/react'
import { ProjectsOverview } from '@/components/ProjectsOverview'
import { StatusSelect } from '@/components/StatusSelect'
import { useActionTasks, useAllOpenTasks } from '@/hooks/useActionTasks'
import { projectProgress } from '@/lib/projectProgress'
import { buildDeadlineDigestMessage, waLink } from '@/lib/whatsapp'
import { urgencyStyles } from '@/lib/urgency'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'

export function DashboardPage() {
  const projects = useAppStore((s) => s.projects)
  const setTaskStatus = useAppStore((s) => s.setTaskStatus)
  const allOpen = useAllOpenTasks()
  const urgent = allOpen.filter((t) => t.urgency === 'overdue' || t.urgency === 'do_now')

  const activeCount = projects.filter((p) => p.tasks.some((t) => t.status !== 'done')).length
  const avgPct =
    projects.length === 0
      ? 0
      : Math.round(projects.reduce((s, p) => s + projectProgress(p).pct, 0) / projects.length)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-foreground/55">{projects.length} project · {activeCount} aktif · rata-rata {avgPct}% selesai</p>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/45">Semua project</h2>
        <ProjectsOverview projects={projects} />
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/45">Prioritas hari ini</h2>
        {urgent.length === 0 ? (
          <p className="op-panel border border-border/60 px-3 py-2.5 text-sm text-foreground/60 md:px-4 md:py-3">
            Tidak ada task terlambat atau H-0 s/d H-2.
          </p>
        ) : (
          <ul className="space-y-2">
            {urgent.map(({ project, task, urgency, urgencyText, deadline }) => (
              <li
                key={`${project.id}-${task.id}`}
                className="op-panel flex flex-wrap items-center justify-between gap-2 border border-border/60 px-3 py-2.5 md:gap-3 md:px-4 md:py-3"
              >
                <div className="min-w-0">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-foreground/50">
                    {project.title} · {deadline}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip className={cn('ring-1', urgencyStyles[urgency])} size="sm" variant="soft">
                    {urgencyText}
                  </Chip>
                  <StatusSelect status={task.status} onChange={(s) => setTaskStatus(project.id, task.id, s)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <DigestButton />
    </div>
  )
}

function DigestButton() {
  const action = useActionTasks()
  const pics = useAppStore((s) => s.pics)
  const adminWaPhone = useAppStore((s) => s.adminWaPhone)
  if (!action.length) return null
  return (
    <Button
      variant="secondary"
      size="sm"
      onPress={() => {
        const grouped = new Map<string, typeof action>()
        for (const item of action) {
          for (const picId of item.task.picIds) {
            if (!grouped.has(picId)) grouped.set(picId, [])
            grouped.get(picId)!.push(item)
          }
        }
        if (grouped.size === 0 && adminWaPhone) {
          window.open(
            waLink(
              adminWaPhone,
              buildDeadlineDigestMessage(
                'Tim',
                action.map((a) => ({ project: a.project, task: a.task, label: a.urgencyText })),
              ),
            ),
            '_blank',
          )
          return
        }
        for (const [picId, items] of grouped) {
          const pic = pics.find((p) => p.id === picId)
          if (!pic?.phone) continue
          window.open(
            waLink(
              pic.phone,
              buildDeadlineDigestMessage(
                pic.name,
                items.map((a) => ({ project: a.project, task: a.task, label: a.urgencyText })),
              ),
            ),
            '_blank',
          )
        }
      }}
    >
      <MessageCircle className="size-4" aria-hidden />
      Kirim rekap deadline ke WA
    </Button>
  )
}
