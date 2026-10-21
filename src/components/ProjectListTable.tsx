import { Button, Chip, ProgressBar } from '@heroui/react'
import { ProjectAlertBanner } from '@/components/ProjectAlertBanner'
import { getProjectAlert } from '@/lib/projectAlert'
import { projectProgress } from '@/lib/projectProgress'
import { useAppStore } from '@/store/appStore'
import type { Project } from '@/types'

const categoryLabel: Record<Project['category'], string> = {
  toko_go: 'Toko GO',
  toko_tutup: 'Toko tutup',
  random: 'Random',
}

export function ProjectListTable({ projects }: { projects: Project[] }) {
  return (
    <>
      <ul className="space-y-2 md:hidden">
        {projects.map((p) => (
          <ProjectMobileCard key={p.id} project={p} />
        ))}
      </ul>

      <div className="op-panel op-list-table hidden overflow-hidden border border-border/70 bg-background md:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border/70 bg-default/30">
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">Project</th>
              <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">Kategori</th>
              <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">Target</th>
              <th className="min-w-[9rem] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
                Progres
              </th>
              <th className="min-w-[8rem] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
                Status
              </th>
              <th className="w-24 px-4 py-2.5 text-end text-[11px] font-semibold uppercase tracking-wide text-foreground/50">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function ProjectMobileCard({ project }: { project: Project }) {
  const { pct, done, total } = projectProgress(project)
  const alert = getProjectAlert(project)
  const selectProject = useAppStore.getState().selectProject

  return (
    <li className="op-panel border border-border/70 bg-background p-2.5">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{project.title}</p>
          <p className="mt-0.5 text-[11px] text-foreground/50">
            {categoryLabel[project.category]} · {project.targetDate}
            {project.storeCode ? ` · ${project.storeCode}` : ''}
          </p>
        </div>
        <Button size="sm" variant="secondary" className="h-8 shrink-0 px-2.5" onPress={() => selectProject(project.id)}>
          Buka
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <ProgressBar aria-label={`Progres ${project.title}`} value={pct} size="sm">
            <ProgressBar.Track className="h-1.5">
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
        </div>
        <span className="shrink-0 text-[11px] font-semibold tabular-nums text-foreground/70">
          {pct}% · {done}/{total}
        </span>
      </div>
      {alert ? (
        <div className="mt-1.5">
          <ProjectAlertBanner alert={alert} variant="inline" />
        </div>
      ) : null}
    </li>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const { pct, done, total } = projectProgress(project)
  const alert = getProjectAlert(project)
  const selectProject = useAppStore.getState().selectProject

  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-default/20">
      <td className="px-4 py-3 align-middle">
        <p className="font-medium text-foreground">{project.title}</p>
        {project.storeCode ? <p className="text-xs text-foreground/45">{project.storeCode}</p> : null}
      </td>
      <td className="px-3 py-3 align-middle">
        <Chip size="sm" variant="soft">
          {categoryLabel[project.category]}
        </Chip>
      </td>
      <td className="px-3 py-3 align-middle tabular-nums text-foreground/80">{project.targetDate}</td>
      <td className="px-3 py-3 align-middle">
        <div className="flex min-w-[8rem] flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2 text-xs">
            <span className="font-semibold tabular-nums">{pct}%</span>
            <span className="text-foreground/45">
              {done}/{total}
            </span>
          </div>
          <ProgressBar aria-label={`Progres ${project.title}`} value={pct} size="sm">
            <ProgressBar.Track className="h-1.5">
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
        </div>
      </td>
      <td className="px-3 py-3 align-middle">
        {alert ? (
          <ProjectAlertBanner alert={alert} compact />
        ) : (
          <span className="text-xs text-foreground/40">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-end align-middle">
        <Button size="sm" variant="secondary" onPress={() => selectProject(project.id)}>
          Buka
        </Button>
      </td>
    </tr>
  )
}
