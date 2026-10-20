import type { Project } from '@/types'

export function projectProgress(project: Project) {
  const total = project.tasks.length
  const done = project.tasks.filter((t) => t.status === 'done').length
  const pct = total ? Math.round((done / total) * 100) : 0
  const openTasks = project.tasks.filter((t) => t.status !== 'done')
  return { total, done, pct, openTasks }
}
