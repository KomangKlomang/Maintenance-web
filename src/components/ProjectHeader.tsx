import { Trash2 } from 'lucide-react'
import { Button, Separator } from '@heroui/react'
import { ActivePicSelect } from '@/components/ActivePicSelect'
import { formatDateTime } from '@/lib/dates'
import { projectProgress } from '@/lib/projectProgress'
import type { Project } from '@/types'

export function ProjectHeader({
  project,
  onBack,
  onSaveTemplate,
  onDelete,
}: {
  project: Project
  onBack: () => void
  onSaveTemplate: () => void
  onDelete: () => void
}) {
  const { pct, done, total } = projectProgress(project)

  return (
    <header className="op-panel overflow-hidden rounded-xl border border-border/70 bg-background">
      <div className="flex flex-wrap items-start justify-between gap-4 px-4 py-4 sm:px-5">
        <div className="min-w-0 flex-1 space-y-2">
          <Button className="-ms-2 h-auto min-h-0 px-2 py-0.5" size="sm" variant="ghost" onPress={onBack}>
            ← Semua project
          </Button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h1>
            <p className="text-sm text-foreground/60">
              Target {project.targetDate}
              {project.storeCode ? ` · ${project.storeCode}` : ''}
              · {done}/{total} task ({pct}%)
            </p>
          </div>
          <dl className="grid gap-x-4 gap-y-1 text-xs text-foreground/55 sm:grid-cols-2">
            <div>
              <dt className="inline text-foreground/45">Dibuat </dt>
              <dd className="inline">
                {formatDateTime(project.createdAt)} · {project.createdByPicName ?? 'PIC tidak tercatat'}
              </dd>
            </div>
            <div>
              <dt className="inline text-foreground/45">Diubah </dt>
              <dd className="inline">{formatDateTime(project.updatedAt)}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <ActivePicSelect />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onPress={onSaveTemplate}>
              Simpan template
            </Button>
            <Button size="sm" variant="danger" onPress={onDelete}>
              <Trash2 className="size-4" aria-hidden />
              Hapus
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <p className="px-4 py-2 text-[11px] text-foreground/45 sm:px-5">
        Perubahan task tercatat ke log (PIC, waktu, perangkat, IP).
      </p>
    </header>
  )
}
