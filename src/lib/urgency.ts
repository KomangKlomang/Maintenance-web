import { diffDaysFromToday } from './dates'
import type { Project, TaskItem } from '@/types'

export type UrgencyLevel = 'overdue' | 'do_now' | 'soon' | 'scheduled'

export function taskEffectiveDeadline(task: TaskItem, project: Project): string {
  return task.deadline ?? project.targetDate
}

export function getUrgencyLevel(deadlineYmd: string, status: string): UrgencyLevel | null {
  if (status === 'done') return null
  const diff = diffDaysFromToday(deadlineYmd)
  if (diff < 0) return 'overdue'
  if (diff <= 2) return 'do_now'
  if (diff <= 7) return 'soon'
  return 'scheduled'
}

export function urgencyLabel(level: UrgencyLevel, deadlineYmd: string): string {
  const diff = diffDaysFromToday(deadlineYmd)
  if (level === 'overdue') return `Terlambat ${Math.abs(diff)} hari`
  if (diff === 0) return 'Hari ini'
  if (diff === 1) return 'Besok (H-1)'
  if (diff === 2) return 'Lusa (H-2)'
  return `H-${diff}`
}

export const urgencyStyles: Record<UrgencyLevel, string> = {
  overdue: 'bg-red-100 text-red-800 ring-red-200',
  do_now: 'bg-orange-100 text-orange-900 ring-orange-200',
  soon: 'bg-amber-100 text-amber-900 ring-amber-200',
  scheduled: 'bg-sky-100 text-sky-900 ring-sky-200',
}

export const urgencyPanelClass: Record<UrgencyLevel, string> = {
  overdue: 'border-l-4 border-l-red-600 bg-red-50/70',
  do_now: 'border-l-4 border-l-orange-500 bg-orange-50/60',
  soon: 'border-l-4 border-l-amber-500 bg-amber-50/50',
  scheduled: 'border-l-4 border-l-sky-500 bg-sky-50/45',
}

export function timelineBucketKey(deadlineYmd: string, urgency: UrgencyLevel): keyof typeof TIMELINE_BUCKET_LABELS {
  const diff = diffDaysFromToday(deadlineYmd)
  if (urgency === 'overdue') return 'overdue'
  if (diff === 0) return 'today'
  if (diff === 1) return 'tomorrow'
  if (diff <= 7) return 'week'
  return 'later'
}

export const TIMELINE_BUCKET_LABELS = {
  overdue: 'Terlewat — perlu segera',
  today: 'Hari ini',
  tomorrow: 'Besok',
  week: 'Minggu ini (H-2 s/d H-7)',
  later: 'Mendatang — masih aman',
} as const
