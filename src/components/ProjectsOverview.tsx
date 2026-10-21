import { ChevronRight } from 'lucide-react'
import { Button, Chip } from '@heroui/react'
import { ProjectAlertBanner } from '@/components/ProjectAlertBanner'
import { ProjectProgressRing } from '@/components/ProjectProgressRing'
import { getProjectAlert } from '@/lib/projectAlert'
import { projectProgress } from '@/lib/projectProgress'
import { getUrgencyLevel, taskEffectiveDeadline, urgencyLabel, urgencyStyles } from '@/lib/urgency'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'
import type { Project } from '@/types'

export function ProjectsOverview({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="text-sm text-foreground/60">Belum ada project.</p>
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {projects.map((p) => (
        <ProjectOverviewCard key={p.id} project={p} />
      ))}
    </div>
  )
}

function ProjectOverviewCard({ project }: { project: Project }) {
  const { pct, done, total, openTasks } = projectProgress(project)
  const alert = getProjectAlert(project)

  let urgencyKey: 'overdue' | 'do_now' | 'soon' | 'scheduled' = 'scheduled'
  let urgencyDeadline = project.targetDate
  for (const task of openTasks) {
    const d = taskEffectiveDeadline(task, project)
    const u = getUrgencyLevel(d, task.status)
    if (!u) continue
    const rank = { overdue: 0, do_now: 1, soon: 2, scheduled: 3 } as const
    if (rank[u] < rank[urgencyKey]) {
      urgencyKey = u
      urgencyDeadline = d
    }
  }
  const urgencyText = urgencyLabel(urgencyKey, urgencyDeadline)
  const ringTone = alert?.level === 'urgent' ? 'danger' : alert?.level === 'warning' ? 'warning' : 'default'

  return (
    <article className="op-panel border border-border/70 bg-background p-3 sm:p-4">
      <div className="flex gap-3.5">
        <ProjectProgressRing value={pct} label={project.title} tone={ringTone} />

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
            <h3 className="truncate text-base font-semibold">{project.title}</h3>
            <Chip className={cn('shrink-0 ring-1', urgencyStyles[urgencyKey])} size="sm" variant="soft">
              {urgencyText}
            </Chip>
          </div>

          <p className="mb-1.5 text-xs text-foreground/50">
            Target {project.targetDate}
            {project.storeCode ? ` · ${project.storeCode}` : ''}
          </p>

          {alert ? (
            <div className="mb-2">
              <ProjectAlertBanner alert={alert} variant="inline" />
            </div>
          ) : null}

          <p className="mb-2 text-xs text-foreground/45">
            {done}/{total} selesai · {openTasks.length} belum
          </p>

          {openTasks.length > 0 ? (
            <ul className="mb-3 divide-y divide-border/40 rounded-md border border-border/50 text-sm">
              {openTasks.slice(0, 3).map((t) => (
                <li key={t.id} className="truncate px-2.5 py-1.5 text-foreground/75">
                  {t.title}
                </li>
              ))}
              {openTasks.length > 3 ? (
                <li className="px-2.5 py-1 text-xs text-foreground/40">+{openTasks.length - 3} lagi</li>
              ) : null}
            </ul>
          ) : (
            <p className="mb-3 text-xs text-emerald-700/75">Semua task selesai.</p>
          )}

          <Button
            size="sm"
            variant="secondary"
            className="h-8"
            onPress={() => useAppStore.getState().selectProject(project.id)}
          >
            Kelola
            <ChevronRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  )
}
