import type { PIC, Project, TaskItem } from '@/types'
import { formatShortDate } from './dates'
import { taskEffectiveDeadline } from './urgency'

const APP_URL = typeof window !== 'undefined' ? window.location.origin : 'https://opstrack.vercel.app'

export function waLink(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export function buildNewProjectMessage(project: Project, pic: PIC, tasks: TaskItem[]): string {
  const lines = tasks.map((t, i) => {
    const dl = taskEffectiveDeadline(t, project)
    let line = `${i + 1}. *${t.title}* (Deadline: ${formatShortDate(dl)})`
    if (t.isDetailed && t.subTasks.length) {
      line += '\n' + t.subTasks.map((s) => `   - ${s.title}${s.qty ? ` (${s.qty})` : ''}`).join('\n')
    }
    return line
  })
  return [
    `*PROJECT BARU: ${project.title}${project.storeCode ? ` (${project.storeCode})` : ''}*`,
    `Kategori: *${categoryLabel(project.category)}*`,
    `Target: *${formatShortDate(project.targetDate)}*`,
    '',
    `Halo *${pic.name}*, pekerjaan Anda:`,
    ...lines,
    '',
    `Cek di: ${APP_URL}`,
  ].join('\n')
}

export function buildDeadlineDigestMessage(picName: string, items: { project: Project; task: TaskItem; label: string }[]): string {
  const body = items
    .map(({ project, task, label }, i) => {
      const dl = taskEffectiveDeadline(task, project)
      return `${i + 1}. *${task.title}* — ${project.title} (${label}, ${formatShortDate(dl)})`
    })
    .join('\n')
  return [`*Rekap deadline — ${picName}*`, '', body, '', APP_URL].join('\n')
}

function categoryLabel(c: Project['category']): string {
  if (c === 'toko_go') return 'Toko GO'
  if (c === 'toko_tutup') return 'Toko Tutup'
  return 'Random'
}
