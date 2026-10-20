import type { Project, TaskItem } from '@/types'
import {
  TIMELINE_BUCKET_LABELS,
  getUrgencyLevel,
  taskEffectiveDeadline,
  timelineBucketKey,
  urgencyLabel,
} from '@/lib/urgency'
import { useAppStore } from '@/store/appStore'

export interface FlatTask {
  project: Project
  task: TaskItem
  subTaskId?: string
  subTitle?: string
  deadline: string
  urgency: NonNullable<ReturnType<typeof getUrgencyLevel>>
  urgencyText: string
}

export function useActionTasks() {
  const projects = useAppStore((s) => s.projects)
  const flat: FlatTask[] = []
  for (const project of projects) {
    for (const task of project.tasks) {
      const push = (status: TaskItem['status'], subTaskId?: string, subTitle?: string) => {
        const deadline = taskEffectiveDeadline(task, project)
        const urgency = getUrgencyLevel(deadline, status)
        if (!urgency || (urgency !== 'overdue' && urgency !== 'do_now')) return
        flat.push({
          project,
          task,
          subTaskId,
          subTitle,
          deadline,
          urgency,
          urgencyText: urgencyLabel(urgency, deadline),
        })
      }
      if (task.isDetailed && task.subTasks.length) {
        for (const sub of task.subTasks) {
          if (sub.status === 'done') continue
          push(sub.status, sub.id, sub.title)
        }
      } else if (task.status !== 'done') {
        push(task.status)
      }
    }
  }
  flat.sort((a, b) => a.deadline.localeCompare(b.deadline))
  return flat
}

export function useAllOpenTasks() {
  const projects = useAppStore((s) => s.projects)
  const flat: FlatTask[] = []
  for (const project of projects) {
    for (const task of project.tasks) {
      if (task.status === 'done') continue
      const deadline = taskEffectiveDeadline(task, project)
      const urgency = getUrgencyLevel(deadline, task.status)
      if (!urgency) continue
      flat.push({
        project,
        task,
        deadline,
        urgency,
        urgencyText: urgencyLabel(urgency, deadline),
      })
    }
  }
  flat.sort((a, b) => a.deadline.localeCompare(b.deadline) || a.task.title.localeCompare(b.task.title))
  return flat
}

export function useTimelineBuckets() {
  const projects = useAppStore((s) => s.projects)
  const buckets: Record<keyof typeof TIMELINE_BUCKET_LABELS, FlatTask[]> = {
    overdue: [],
    today: [],
    tomorrow: [],
    week: [],
    later: [],
  }
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
      const key = timelineBucketKey(deadline, urgency)
      buckets[key].push(item)
    }
  }
  return buckets
}
