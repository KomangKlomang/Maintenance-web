export type WorkStatus = 'todo' | 'in_progress' | 'done'
export type ProjectCategory = 'toko_go' | 'toko_tutup' | 'random'
export type AppView = 'dashboard' | 'projects' | 'timeline' | 'settings'

export interface PIC {
  id: string
  name: string
  phone: string
  roleNote?: string
  color: string
}

export interface SubTaskItem {
  id: string
  title: string
  qty: string
  notes: string
  status: WorkStatus
  picIds: string[]
}

export interface TaskItem {
  id: string
  title: string
  status: WorkStatus
  isDetailed: boolean
  qty?: string
  notes?: string
  deadline?: string
  offsetDays?: number
  picIds: string[]
  subTasks: SubTaskItem[]
}

export interface TemplateTaskBlueprint {
  id: string
  title: string
  isDetailed: boolean
  offsetDays?: number
  defaultQty?: string
  defaultNotes?: string
  subTasks: { id: string; title: string; defaultQty?: string; defaultNotes?: string }[]
}

export interface ProjectTemplate {
  id: string
  name: string
  category: ProjectCategory
  tasksBlueprint: TemplateTaskBlueprint[]
}

export interface ProjectLogEntry {
  id: string
  at: string
  summary: string
  detail?: string
  picId: string | null
  picName: string
  deviceLabel: string
  ipAddress: string
}

export interface Project {
  id: string
  title: string
  storeCode?: string
  category: ProjectCategory
  targetDate: string
  notes?: string
  tasks: TaskItem[]
  createdAt: string
  updatedAt: string
  createdByPicId?: string | null
  createdByPicName?: string
  activityLog?: ProjectLogEntry[]
}

export interface ActionTaskRef {
  projectId: string
  taskId: string
  subTaskId?: string
}
