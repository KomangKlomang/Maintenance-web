import { DEFAULT_TEMPLATES } from '@/data/defaults'
import type { AppView, PIC, Project, ProjectLogEntry, ProjectTemplate, WorkStatus } from '@/types'

const VIEWS: AppView[] = ['dashboard', 'projects', 'timeline', 'settings']
const STATUSES: WorkStatus[] = ['todo', 'in_progress', 'done']

function asStatus(v: unknown): WorkStatus {
  return STATUSES.includes(v as WorkStatus) ? (v as WorkStatus) : 'todo'
}

function sanitizeProject(raw: unknown): Project | null {
  if (!raw || typeof raw !== 'object') return null
  const p = raw as Record<string, unknown>
  if (typeof p.id !== 'string' || typeof p.title !== 'string' || typeof p.targetDate !== 'string') return null
  const tasksRaw = Array.isArray(p.tasks) ? p.tasks : []
  const tasks = tasksRaw
    .map((t) => {
      if (!t || typeof t !== 'object') return null
      const task = t as Record<string, unknown>
      if (typeof task.id !== 'string' || typeof task.title !== 'string') return null
      const subRaw = Array.isArray(task.subTasks) ? task.subTasks : []
      const subTasks = subRaw
        .map((s) => {
          if (!s || typeof s !== 'object') return null
          const sub = s as Record<string, unknown>
          if (typeof sub.id !== 'string' || typeof sub.title !== 'string') return null
          return {
            id: sub.id,
            title: sub.title,
            qty: typeof sub.qty === 'string' ? sub.qty : '',
            notes: typeof sub.notes === 'string' ? sub.notes : '',
            status: asStatus(sub.status),
            picIds: Array.isArray(sub.picIds) ? sub.picIds.filter((x): x is string => typeof x === 'string') : [],
          }
        })
        .filter(Boolean) as Project['tasks'][0]['subTasks']
      return {
        id: task.id,
        title: task.title,
        status: asStatus(task.status),
        isDetailed: Boolean(task.isDetailed),
        qty: typeof task.qty === 'string' ? task.qty : undefined,
        notes: typeof task.notes === 'string' ? task.notes : undefined,
        deadline: typeof task.deadline === 'string' ? task.deadline : undefined,
        offsetDays: typeof task.offsetDays === 'number' ? task.offsetDays : undefined,
        picIds: Array.isArray(task.picIds) ? task.picIds.filter((x): x is string => typeof x === 'string') : [],
        subTasks,
      }
    })
    .filter(Boolean) as Project['tasks']

  const logRaw = Array.isArray(p.activityLog) ? p.activityLog : []
  const activityLog = logRaw
    .map((row): ProjectLogEntry | null => {
      if (!row || typeof row !== 'object') return null
      const e = row as Record<string, unknown>
      if (typeof e.id !== 'string' || typeof e.at !== 'string' || typeof e.summary !== 'string') return null
      return {
        id: e.id,
        at: e.at,
        summary: e.summary,
        detail: typeof e.detail === 'string' ? e.detail : undefined,
        picId: typeof e.picId === 'string' ? e.picId : null,
        picName: typeof e.picName === 'string' ? e.picName : 'PIC belum dipilih',
        deviceLabel: typeof e.deviceLabel === 'string' ? e.deviceLabel : '—',
        ipAddress: typeof e.ipAddress === 'string' ? e.ipAddress : 'Lokal',
      }
    })
    .filter((x): x is ProjectLogEntry => x !== null)

  return {
    id: p.id,
    title: p.title,
    storeCode: typeof p.storeCode === 'string' ? p.storeCode : undefined,
    category:
      p.category === 'toko_go' || p.category === 'toko_tutup' || p.category === 'random'
        ? p.category
        : 'random',
    targetDate: p.targetDate,
    notes: typeof p.notes === 'string' ? p.notes : undefined,
    tasks,
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : new Date().toISOString(),
    updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : new Date().toISOString(),
    createdByPicId: typeof p.createdByPicId === 'string' ? p.createdByPicId : null,
    createdByPicName: typeof p.createdByPicName === 'string' ? p.createdByPicName : undefined,
    activityLog,
  }
}

function sanitizePic(raw: unknown): PIC | null {
  if (!raw || typeof raw !== 'object') return null
  const p = raw as Record<string, unknown>
  if (typeof p.id !== 'string' || typeof p.name !== 'string' || typeof p.phone !== 'string') return null
  return {
    id: p.id,
    name: p.name,
    phone: p.phone,
    roleNote: typeof p.roleNote === 'string' ? p.roleNote : undefined,
    color: typeof p.color === 'string' ? p.color : '#64748b',
  }
}

export type PersistedSlice = {
  pinUnlocked?: boolean
  activeView?: AppView
  selectedProjectId?: string | null
  activePicId?: string | null
  clientIp?: string
  deviceLabel?: string
  adminWaPhone?: string
  pics?: PIC[]
  templates?: ProjectTemplate[]
  projects?: Project[]
}

export function mergePersistedState(persisted: unknown): PersistedSlice {
  if (!persisted || typeof persisted !== 'object') return {}
  const p = persisted as PersistedSlice

  const projects = Array.isArray(p.projects)
    ? p.projects.map(sanitizeProject).filter((x): x is Project => x !== null)
    : undefined

  const pics = Array.isArray(p.pics)
    ? p.pics.map(sanitizePic).filter((x): x is PIC => x !== null)
    : undefined

  const templates =
    Array.isArray(p.templates) && p.templates.length > 0 ? p.templates : DEFAULT_TEMPLATES

  let selectedProjectId = p.selectedProjectId ?? null
  if (selectedProjectId && projects && !projects.some((pr) => pr.id === selectedProjectId)) {
    selectedProjectId = null
  }

  const activeView = VIEWS.includes(p.activeView as AppView) ? p.activeView : 'dashboard'

  let activePicId = p.activePicId ?? null
  if (activePicId && pics && !pics.some((pic) => pic.id === activePicId)) activePicId = null

  return {
    pinUnlocked: Boolean(p.pinUnlocked),
    activeView,
    selectedProjectId,
    activePicId,
    clientIp: typeof p.clientIp === 'string' ? p.clientIp : '',
    deviceLabel: typeof p.deviceLabel === 'string' ? p.deviceLabel : '',
    adminWaPhone: typeof p.adminWaPhone === 'string' ? p.adminWaPhone : '',
    pics,
    templates,
    projects,
  }
}
