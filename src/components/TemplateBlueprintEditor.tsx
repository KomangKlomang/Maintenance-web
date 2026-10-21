import { Trash2 } from 'lucide-react'
import { Button, Checkbox, Input } from '@heroui/react'
import { cn, uid } from '@/lib/utils'
import type { TemplateTaskBlueprint } from '@/types'

const OFFSET_OPTIONS = [
  { value: -7, label: 'H-7' },
  { value: -5, label: 'H-5' },
  { value: -3, label: 'H-3' },
  { value: -1, label: 'H-1' },
  { value: 0, label: 'H (hari H)' },
] as const

export function TemplateBlueprintEditor({
  tasks,
  onChange,
}: {
  tasks: TemplateTaskBlueprint[]
  onChange: (tasks: TemplateTaskBlueprint[]) => void
}) {
  const updateTask = (taskId: string, patch: Partial<TemplateTaskBlueprint>) => {
    onChange(tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end gap-1">
        <Button size="sm" variant="tertiary" className="h-8 text-xs" onPress={() => addTask(onChange, tasks, false)}>
          + Task
        </Button>
        <Button size="sm" variant="tertiary" className="h-8 text-xs" onPress={() => addTask(onChange, tasks, true)}>
          + Detil
        </Button>
      </div>

      {tasks.length === 0 ? (
        <p className="py-4 text-center text-sm text-foreground/45">Belum ada task.</p>
      ) : (
        <ul className="divide-y divide-border/50 border border-border/60 bg-background">
          {tasks.map((task, index) => (
            <li key={task.id} className="p-2.5">
              <div className="flex gap-2">
                <span className="w-5 shrink-0 pt-2 text-center text-xs font-medium text-foreground/35">{index + 1}</span>
                <div className="min-w-0 flex-1 space-y-2">
                  <Input
                    aria-label={`Judul task ${index + 1}`}
                    fullWidth
                    placeholder="Nama task"
                    value={task.title}
                    onChange={(e) => updateTask(task.id, { title: e.target.value })}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-xs text-foreground/50">
                      Deadline
                      <select
                        className="ms-1.5 h-8 border border-border bg-background px-2 text-xs"
                        value={task.offsetDays ?? -3}
                        onChange={(e) => updateTask(task.id, { offsetDays: Number(e.target.value) })}
                      >
                        {OFFSET_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Checkbox
                      isSelected={task.isDetailed}
                      onChange={(checked) =>
                        updateTask(task.id, {
                          isDetailed: checked,
                          subTasks: checked
                            ? task.subTasks.length
                              ? task.subTasks
                              : [{ id: uid('st'), title: 'Item' }]
                            : [],
                        })
                      }
                    >
                      <span className="text-xs">Detil</span>
                    </Checkbox>
                  </div>
                  {task.isDetailed ? (
                    <SubTaskEditor
                      subTasks={task.subTasks}
                      onChange={(subTasks) => updateTask(task.id, { subTasks })}
                    />
                  ) : null}
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  className="shrink-0 text-foreground/45"
                  aria-label="Hapus task"
                  onPress={() => onChange(tasks.filter((t) => t.id !== task.id))}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function addTask(
  onChange: (tasks: TemplateTaskBlueprint[]) => void,
  tasks: TemplateTaskBlueprint[],
  isDetailed: boolean,
) {
  onChange([
    ...tasks,
    {
      id: uid('tb'),
      title: '',
      isDetailed,
      offsetDays: -3,
      subTasks: isDetailed ? [{ id: uid('st'), title: '' }] : [],
    },
  ])
}

function SubTaskEditor({
  subTasks,
  onChange,
}: {
  subTasks: TemplateTaskBlueprint['subTasks']
  onChange: (sub: TemplateTaskBlueprint['subTasks']) => void
}) {
  return (
    <div className={cn('space-y-1 border-l-2 border-border/40 ps-2')}>
      {subTasks.map((sub) => (
        <div key={sub.id} className="flex gap-1">
          <Input
            aria-label="Sub-task"
            className="flex-1"
            placeholder="Sub-task"
            value={sub.title}
            onChange={(e) => onChange(subTasks.map((s) => (s.id === sub.id ? { ...s, title: e.target.value } : s)))}
          />
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            aria-label="Hapus"
            onPress={() => onChange(subTasks.filter((s) => s.id !== sub.id))}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ))}
      <Button
        size="sm"
        variant="ghost"
        className="h-7 px-1 text-xs"
        onPress={() => onChange([...subTasks, { id: uid('st'), title: '' }])}
      >
        + Sub
      </Button>
    </div>
  )
}
