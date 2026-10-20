import type { TaskItem, WorkStatus } from '@/types'

export const STATUS_LABEL: Record<WorkStatus, string> = {
  todo: 'Belum',
  in_progress: 'Proses',
  done: 'Selesai',
}

export const STATUS_CYCLE: WorkStatus[] = ['todo', 'in_progress', 'done']

export function nextStatus(s: WorkStatus): WorkStatus {
  const i = STATUS_CYCLE.indexOf(s)
  return STATUS_CYCLE[(i + 1) % STATUS_CYCLE.length]
}

export function syncParentFromSubTasks(task: TaskItem): WorkStatus {
  if (!task.isDetailed || !task.subTasks.length) return task.status
  const allDone = task.subTasks.every((s) => s.status === 'done')
  const anyProgress = task.subTasks.some((s) => s.status !== 'todo')
  if (allDone) return 'done'
  if (anyProgress) return 'in_progress'
  return 'todo'
}
