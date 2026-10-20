import { diffDaysFromToday } from '@/lib/dates'
import { projectProgress } from '@/lib/projectProgress'
import { taskEffectiveDeadline } from '@/lib/urgency'
import type { Project } from '@/types'

export type ProjectAlertLevel = 'urgent' | 'warning'

export interface ProjectAlert {
  level: ProjectAlertLevel
  title: string
  message: string
}

/** Progress rendah + deadline dekat → banner URGENT / perhatian. */
export function getProjectAlert(project: Project): ProjectAlert | null {
  const { pct, openTasks, total } = projectProgress(project)
  if (total === 0 || openTasks.length === 0) return null

  const daysToTarget = diffDaysFromToday(project.targetDate)
  let nearestOpenDays = daysToTarget
  for (const task of openTasks) {
    nearestOpenDays = Math.min(nearestOpenDays, diffDaysFromToday(taskEffectiveDeadline(task, project)))
  }

  if (nearestOpenDays < 0) {
    return {
      level: 'urgent',
      title: 'URGENT',
      message: `Terlambat ${Math.abs(nearestOpenDays)} hari · ${openTasks.length} task belum selesai (${pct}%)`,
    }
  }

  if (nearestOpenDays === 0) {
    return {
      level: 'urgent',
      title: 'URGENT',
      message: `Hari H · ${openTasks.length} task belum selesai (progress ${pct}%)`,
    }
  }

  if (nearestOpenDays === 1) {
    return {
      level: 'urgent',
      title: 'URGENT',
      message: `H-1 besok · ${openTasks.length} task belum selesai (progress ${pct}%)`,
    }
  }

  if (nearestOpenDays <= 2 && pct < 85) {
    return {
      level: 'urgent',
      title: 'URGENT',
      message: `H-2 lusa · progress baru ${pct}% — percepat penyelesaian`,
    }
  }

  if (daysToTarget <= 7 && pct < 50) {
    return {
      level: 'urgent',
      title: 'URGENT',
      message: `Deadline minggu ini · baru ${pct}% selesai`,
    }
  }

  if (daysToTarget <= 14 && pct < 35) {
    return {
      level: 'warning',
      title: 'Perhatian',
      message: `H-${daysToTarget} · progress ${pct}% — masih banyak task terbuka`,
    }
  }

  if (daysToTarget <= 11 && pct < 50) {
    return {
      level: daysToTarget <= 7 || pct < 25 ? 'urgent' : 'warning',
      title: daysToTarget <= 7 || pct < 25 ? 'URGENT' : 'Perhatian',
      message: `H-${daysToTarget} · progress ${pct}% — deadline mendekat, selesaikan task terbuka`,
    }
  }

  return null
}
