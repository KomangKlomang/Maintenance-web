import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getDeviceLabel } from '@/lib/device'
import { mergePersistedState } from '@/lib/persistSanitize'
import { isBuiltInTemplate } from '@/lib/templates'
import { STATUS_LABEL } from '@/lib/taskStatus'
import { DEFAULT_TEMPLATES, PIC_COLORS } from '@/data/defaults'
import { addDays } from '@/lib/dates'
import { normalizePhone } from '@/lib/phone'
import { nextStatus, syncParentFromSubTasks } from '@/lib/taskStatus'
import { uid } from '@/lib/utils'
import type {
  AppView,
  PIC,
  Project,
  ProjectCategory,
  ProjectLogEntry,
  ProjectTemplate,
  SubTaskItem,
  TaskItem,
  TemplateTaskBlueprint,
  WorkStatus,
} from '@/types'

interface AppState {
  pinUnlocked: boolean
  activeView: AppView
  selectedProjectId: string | null
  activePicId: string | null
  clientIp: string
  deviceLabel: string
  adminWaPhone: string
  pics: PIC[]
  templates: ProjectTemplate[]
  projects: Project[]
  unlockPin: (pin: string, expected: string) => boolean
  lock: () => void
  setView: (v: AppView) => void
  selectProject: (id: string | null) => void
  setActivePicId: (id: string | null) => void
  initClientMeta: (ip: string | null) => void
  setAdminWaPhone: (phone: string) => void
  addPic: (name: string, phone: string, roleNote?: string) => PIC
  updatePic: (id: string, patch: Partial<Pick<PIC, 'name' | 'phone' | 'roleNote'>>) => void
  removePic: (id: string) => void
  saveTemplate: (tpl: ProjectTemplate) => void
  updateTemplateDetails: (id: string, patch: Partial<Pick<ProjectTemplate, 'name' | 'description'>>) => void
  createTemplate: (name: string, category: ProjectCategory) => ProjectTemplate | null
  duplicateTemplate: (id: string) => ProjectTemplate | null
  removeTemplate: (id: string) => boolean
  createProjectFromTemplate: (input: {
    title: string
    storeCode?: string
    category: ProjectCategory
    targetDate: string
    templateId: string
    notify?: boolean
  }) => Project
  updateProject: (id: string, patch: Partial<Project>) => void
  deleteProject: (id: string) => void
  saveProjectAsTemplate: (projectId: string, name: string) => void
  cycleTaskStatus: (projectId: string, taskId: string, subTaskId?: string) => void
  setTaskStatus: (projectId: string, taskId: string, status: WorkStatus, subTaskId?: string) => void
  addTask: (projectId: string, title: string, isDetailed?: boolean) => void
  updateTask: (projectId: string, taskId: string, patch: Partial<TaskItem>) => void
  removeTask: (projectId: string, taskId: string) => void
}

function blueprintToTask(bp: TemplateTaskBlueprint, targetDate: string): TaskItem {
  const deadline = bp.offsetDays != null ? addDays(targetDate, bp.offsetDays) : undefined
  return {
    id: uid('task'),
    title: bp.title,
    status: 'todo',
    isDetailed: bp.isDetailed,
    qty: bp.defaultQty,
    notes: bp.defaultNotes,
    deadline,
    offsetDays: bp.offsetDays,
    picIds: [],
    subTasks: bp.subTasks.map(
      (s): SubTaskItem => ({
        id: uid('sub'),
        title: s.title,
        qty: s.defaultQty ?? '',
        notes: s.defaultNotes ?? '',
        status: 'todo',
        picIds: [],
      }),
    ),
  }
}

function touchProject(p: Project): Project {
  return { ...p, updatedAt: new Date().toISOString() }
}

function buildLogEntry(get: () => AppState, summary: string, detail?: string): ProjectLogEntry {
  const s = get()
  const pic = s.pics.find((p) => p.id === s.activePicId)
  return {
    id: uid('log'),
    at: new Date().toISOString(),
    summary,
    detail,
    picId: s.activePicId,
    picName: pic?.name ?? 'PIC belum dipilih',
    deviceLabel: s.deviceLabel || getDeviceLabel(),
    ipAddress: s.clientIp || 'Lokal',
  }
}

function pushLog(set: (fn: (state: AppState) => Partial<AppState>) => void, get: () => AppState, projectId: string, summary: string, detail?: string) {
  const entry = buildLogEntry(get, summary, detail)
  set((state) => ({
    projects: state.projects.map((p) =>
      p.id === projectId
        ? touchProject({ ...p, activityLog: [entry, ...(p.activityLog ?? [])].slice(0, 150) })
        : p,
    ),
  }))
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      pinUnlocked: false,
      activeView: 'dashboard',
      selectedProjectId: null,
      activePicId: null,
      clientIp: '',
      deviceLabel: typeof navigator !== 'undefined' ? getDeviceLabel() : '',
      adminWaPhone: '',
      pics: [],
      templates: DEFAULT_TEMPLATES,
      projects: [],

      unlockPin: (pin, expected) => {
        const ok = pin === expected
        if (ok) set({ pinUnlocked: true })
        return ok
      },
      lock: () => set({ pinUnlocked: false }),
      setView: (v) => set({ activeView: v }),
      selectProject: (id) => set({ selectedProjectId: id, activeView: id ? 'projects' : 'projects' }),

      setActivePicId: (id) => set({ activePicId: id }),

      initClientMeta: (ip) =>
        set({
          clientIp: ip ?? '',
          deviceLabel: getDeviceLabel(),
        }),

      setAdminWaPhone: (phone) => set({ adminWaPhone: normalizePhone(phone) }),

      addPic: (name, phone, roleNote) => {
        const pic: PIC = {
          id: uid('pic'),
          name: name.trim(),
          phone: normalizePhone(phone),
          roleNote,
          color: PIC_COLORS[get().pics.length % PIC_COLORS.length],
        }
        set({ pics: [...get().pics, pic] })
        return pic
      },
      updatePic: (id, patch) =>
        set({
          pics: get().pics.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...patch,
                  phone: patch.phone != null ? normalizePhone(patch.phone) : p.phone,
                  name: patch.name?.trim() ?? p.name,
                }
              : p,
          ),
        }),
      removePic: (id) =>
        set({
          pics: get().pics.filter((p) => p.id !== id),
          activePicId: get().activePicId === id ? null : get().activePicId,
          projects: get().projects.map((pr) => ({
            ...pr,
            tasks: pr.tasks.map((t) => ({
              ...t,
              picIds: t.picIds.filter((x) => x !== id),
              subTasks: t.subTasks.map((s) => ({ ...s, picIds: s.picIds.filter((x) => x !== id) })),
            })),
          })),
        }),

      saveTemplate: (tpl) =>
        set({
          templates: get().templates.some((t) => t.id === tpl.id)
            ? get().templates.map((t) => (t.id === tpl.id ? tpl : t))
            : [...get().templates, tpl],
        }),

      updateTemplateDetails: (id, patch) => {
        const name = patch.name?.trim()
        set({
          templates: get().templates.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...(name !== undefined ? { name: name || t.name } : {}),
                  ...(patch.description !== undefined ? { description: patch.description.trim() || undefined } : {}),
                }
              : t,
          ),
        })
      },

      createTemplate: (name, category) => {
        const trimmed = name.trim()
        if (!trimmed) return null
        const tpl: ProjectTemplate = {
          id: uid('tpl'),
          name: trimmed,
          category,
          tasksBlueprint: [],
        }
        get().saveTemplate(tpl)
        return tpl
      },

      duplicateTemplate: (id) => {
        const src = get().templates.find((t) => t.id === id)
        if (!src) return null
        const tpl: ProjectTemplate = {
          id: uid('tpl'),
          name: `${src.name} (salinan)`,
          description: src.description,
          category: src.category,
          tasksBlueprint: src.tasksBlueprint.map((bp) => ({
            ...bp,
            id: uid('tb'),
            subTasks: bp.subTasks.map((s) => ({ ...s, id: uid('st') })),
          })),
        }
        get().saveTemplate(tpl)
        return tpl
      },

      removeTemplate: (id) => {
        if (isBuiltInTemplate(id)) return false
        set({ templates: get().templates.filter((t) => t.id !== id) })
        return true
      },

      createProjectFromTemplate: ({ title, storeCode, category, targetDate, templateId }) => {
        const tpl = get().templates.find((t) => t.id === templateId)
        const tasks = (tpl?.tasksBlueprint ?? []).map((bp) => blueprintToTask(bp, targetDate))
        const pic = get().pics.find((p) => p.id === get().activePicId)
        const createdEntry = buildLogEntry(get, 'Project dibuat', `${tasks.length} task dari template`)
        const project: Project = {
          id: uid('proj'),
          title: title.trim(),
          storeCode: storeCode?.trim() || undefined,
          category,
          targetDate,
          tasks,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdByPicId: get().activePicId,
          createdByPicName: pic?.name ?? 'PIC belum dipilih',
          activityLog: [createdEntry],
        }
        set({ projects: [project, ...get().projects], selectedProjectId: project.id })
        return project
      },

      updateProject: (id, patch) => {
        set({
          projects: get().projects.map((p) => (p.id === id ? touchProject({ ...p, ...patch }) : p)),
        })
        if (patch.title || patch.targetDate || patch.storeCode) {
          pushLog(set, get, id, 'Data project diperbarui')
        }
      },

      deleteProject: (id) =>
        set({
          projects: get().projects.filter((p) => p.id !== id),
          selectedProjectId: get().selectedProjectId === id ? null : get().selectedProjectId,
        }),

      saveProjectAsTemplate: (projectId, name) => {
        const pr = get().projects.find((p) => p.id === projectId)
        if (!pr) return
        const trimmed = name.trim()
        if (!trimmed) return
        const tpl: ProjectTemplate = {
          id: uid('tpl'),
          name: trimmed,
          category: pr.category,
          tasksBlueprint: pr.tasks.map((t) => ({
            id: uid('tb'),
            title: t.title,
            isDetailed: t.isDetailed,
            offsetDays: t.offsetDays,
            defaultQty: t.qty,
            defaultNotes: t.notes,
            subTasks: t.subTasks.map((s) => ({
              id: uid('st'),
              title: s.title,
              defaultQty: s.qty,
              defaultNotes: s.notes,
            })),
          })),
        }
        get().saveTemplate(tpl)
        pushLog(set, get, projectId, 'Disimpan sebagai template', name)
      },

      cycleTaskStatus: (projectId, taskId, subTaskId) => {
        const pr = get().projects.find((p) => p.id === projectId)
        if (!pr) return
        const task = pr.tasks.find((t) => t.id === taskId)
        if (!task) return
        if (subTaskId) {
          const sub = task.subTasks.find((s) => s.id === subTaskId)
          if (!sub) return
          get().setTaskStatus(projectId, taskId, nextStatus(sub.status), subTaskId)
          return
        }
        get().setTaskStatus(projectId, taskId, nextStatus(task.status))
      },

      setTaskStatus: (projectId, taskId, status, subTaskId) => {
        const pr = get().projects.find((p) => p.id === projectId)
        const task = pr?.tasks.find((t) => t.id === taskId)
        const sub = subTaskId ? task?.subTasks.find((s) => s.id === subTaskId) : undefined
        const name = sub?.title ?? task?.title ?? 'Task'

        set({
          projects: get().projects.map((p) => {
            if (p.id !== projectId) return p
            const tasks = p.tasks.map((t) => {
              if (t.id !== taskId) return t
              if (subTaskId) {
                const subTasks = t.subTasks.map((s) => (s.id === subTaskId ? { ...s, status } : s))
                const merged = { ...t, subTasks }
                return { ...merged, status: syncParentFromSubTasks(merged) }
              }
              if (status === 'done' && t.isDetailed && t.subTasks.length) {
                return {
                  ...t,
                  status,
                  subTasks: t.subTasks.map((s) => ({ ...s, status: 'done' as WorkStatus })),
                }
              }
              return { ...t, status }
            })
            return touchProject({ ...p, tasks })
          }),
        })
        pushLog(set, get, projectId, `Status: ${name}`, `Menjadi ${STATUS_LABEL[status]}`)
      },

      addTask: (projectId, title, isDetailed = false) => {
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? touchProject({
                  ...p,
                  tasks: [
                    ...p.tasks,
                    {
                      id: uid('task'),
                      title,
                      status: 'todo',
                      isDetailed,
                      picIds: [],
                      subTasks: [],
                    },
                  ],
                })
              : p,
          ),
        })
        pushLog(set, get, projectId, 'Task ditambah', title)
      },

      updateTask: (projectId, taskId, patch) => {
        const task = get().projects.find((p) => p.id === projectId)?.tasks.find((t) => t.id === taskId)
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? touchProject({
                  ...p,
                  tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)),
                })
              : p,
          ),
        })
        if (task) {
          const bits: string[] = []
          if (patch.deadline !== undefined) bits.push(`deadline ${patch.deadline || '—'}`)
          if (patch.picIds) bits.push('PIC diubah')
          pushLog(set, get, projectId, `Task diperbarui: ${task.title}`, bits.join(' · ') || undefined)
        }
      },

      removeTask: (projectId, taskId) => {
        const task = get().projects.find((p) => p.id === projectId)?.tasks.find((t) => t.id === taskId)
        set({
          projects: get().projects.map((p) =>
            p.id === projectId ? touchProject({ ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }) : p,
          ),
        })
        if (task) pushLog(set, get, projectId, 'Task dihapus', task.title)
      },
    }),
    {
      name: 'opstrack-v1',
      version: 3,
      migrate: (persisted) => {
        try {
          return mergePersistedState(persisted)
        } catch {
          return {}
        }
      },
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          try {
            const raw = localStorage.getItem(name)
            if (raw == null) return null
            JSON.parse(raw)
            return raw
          } catch {
            try {
              localStorage.removeItem(name)
            } catch {
              /* ignore */
            }
            return null
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, value)
          } catch {
            /* quota */
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name)
          } catch {
            /* ignore */
          }
        },
      })),
      merge: (persisted, current) => {
        let slice: ReturnType<typeof mergePersistedState>
        try {
          slice = mergePersistedState(persisted)
        } catch {
          slice = {}
        }
        return {
          ...current,
          ...slice,
          projects: slice.projects ?? current.projects,
          pics: slice.pics ?? current.pics,
          templates: slice.templates ?? current.templates,
          activePicId: slice.activePicId ?? current.activePicId,
          clientIp: slice.clientIp ?? current.clientIp,
          deviceLabel: slice.deviceLabel ?? current.deviceLabel,
        }
      },
    },
  ),
)

