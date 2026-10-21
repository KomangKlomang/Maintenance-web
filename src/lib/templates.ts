import type { ProjectCategory, ProjectTemplate } from '@/types'

export const BUILTIN_TEMPLATE_IDS = new Set(['tpl_toko_go', 'tpl_toko_tutup', 'tpl_random'])

export function isBuiltInTemplate(id: string): boolean {
  return BUILTIN_TEMPLATE_IDS.has(id)
}

export const TEMPLATE_CATEGORY_LABEL: Record<ProjectCategory, string> = {
  toko_go: 'Toko GO',
  toko_tutup: 'Toko Tutup',
  random: 'Random',
}

export function templateSummary(tpl: ProjectTemplate): string {
  const n = tpl.tasksBlueprint.length
  if (n === 0) return 'Tanpa task bawaan'
  const offsets = tpl.tasksBlueprint
    .map((t) => t.offsetDays)
    .filter((d): d is number => d != null)
    .sort((a, b) => a - b)
  const h =
    offsets.length > 0
      ? offsets
          .slice(0, 4)
          .map((d) => (d === 0 ? 'H' : `H${d}`))
          .join(', ') + (offsets.length > 4 ? '…' : '')
      : ''
  return h ? `${n} task · ${h}` : `${n} task`
}
