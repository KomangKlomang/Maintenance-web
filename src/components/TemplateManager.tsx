import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, Copy, Plus, Trash2 } from 'lucide-react'
import { Button, Chip, Input, Label, Modal, TextArea, useOverlayState } from '@heroui/react'
import { TemplateBlueprintEditor } from '@/components/TemplateBlueprintEditor'
import {
  isBuiltInTemplate,
  TEMPLATE_CATEGORY_LABEL,
  templateSummary,
} from '@/lib/templates'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/appStore'
import type { ProjectCategory, ProjectTemplate, TemplateTaskBlueprint } from '@/types'

const CATEGORY_ORDER: ProjectCategory[] = ['toko_go', 'toko_tutup', 'random']

export function TemplateManager({ editor = false }: { editor?: boolean }) {
  const templates = useAppStore((s) => s.templates)
  const createTemplate = useAppStore((s) => s.createTemplate)
  const setView = useAppStore((s) => s.setView)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState<ProjectCategory>('toko_go')
  const [editId, setEditId] = useState<string | null>(null)

  const editingTemplate = editId ? templates.find((t) => t.id === editId) : null
  const editOpen = Boolean(editId && editingTemplate)
  const editModal = useOverlayState({
    isOpen: editOpen,
    onOpenChange: (open) => {
      if (!open) setEditId(null)
    },
  })

  const grouped = useMemo(() => {
    const map = new Map<ProjectCategory, ProjectTemplate[]>()
    for (const c of CATEGORY_ORDER) map.set(c, [])
    for (const t of templates) {
      const list = map.get(t.category) ?? []
      list.push(t)
      map.set(t.category, list)
    }
    for (const [, list] of map) {
      list.sort((a, b) => a.name.localeCompare(b.name, 'id'))
    }
    return map
  }, [templates])

  const openEdit = (id: string) => {
    if (!editor) {
      setView('templates')
      return
    }
    setEditId(id)
  }

  return (
    <div className="space-y-4">
      {editor ? (
        <p className="text-sm text-foreground/55">Klik baris untuk edit. Offset H dihitung dari tanggal target project.</p>
      ) : (
        <p className="text-sm text-foreground/55">
          Daftar template.{' '}
          <button type="button" className="font-medium text-blue-700" onClick={() => setView('templates')}>
            Buka halaman Template
          </button>{' '}
          untuk mengedit.
        </p>
      )}

      <form
        className="flex flex-wrap items-end gap-2 border border-border/60 bg-background p-2.5"
        onSubmit={(e) => {
          e.preventDefault()
          const created = createTemplate(newName, newCategory)
          if (created) {
            setNewName('')
            if (editor) setEditId(created.id)
          }
        }}
      >
        <div className="min-w-[10rem] flex-1 space-y-1">
          <Label htmlFor="tpl-new-name" className="text-xs">
            Template baru
          </Label>
          <Input
            id="tpl-new-name"
            fullWidth
            placeholder="Nama template"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <select
          className="h-10 border border-border bg-background px-2 text-sm"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as ProjectCategory)}
          aria-label="Jenis template"
        >
          {CATEGORY_ORDER.map((c) => (
            <option key={c} value={c}>
              {TEMPLATE_CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
        <Button type="submit" variant="secondary" className="h-10">
          <Plus className="size-4" aria-hidden />
          Tambah
        </Button>
      </form>

      {CATEGORY_ORDER.map((category) => {
        const list = grouped.get(category) ?? []
        if (list.length === 0) return null
        return (
          <section key={category}>
            <h3 className="mb-1.5 px-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/40">
              {TEMPLATE_CATEGORY_LABEL[category]}
            </h3>
            <ul className="overflow-hidden border border-border/60 bg-background">
              {list.map((t) => (
                <TemplateListRow key={t.id} template={t} onEdit={() => openEdit(t.id)} canEdit={editor} />
              ))}
            </ul>
          </section>
        )
      })}

      {editor && editingTemplate ? (
        <Modal state={editModal}>
          <Modal.Backdrop isDismissable>
            <Modal.Container scroll="inside" size="lg" className="max-h-[90dvh]">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>Edit template</Modal.Heading>
                  <Modal.CloseTrigger />
                </Modal.Header>
                <Modal.Body>
                  <TemplateEditorForm
                    key={editingTemplate.id + JSON.stringify(editingTemplate.tasksBlueprint).length}
                    template={editingTemplate}
                    onSaved={() => setEditId(null)}
                  />
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ) : null}
    </div>
  )
}

function TemplateListRow({
  template,
  onEdit,
  canEdit,
}: {
  template: ProjectTemplate
  onEdit: () => void
  canEdit: boolean
}) {
  const duplicate = useAppStore((s) => s.duplicateTemplate)
  const removeTemplate = useAppStore((s) => s.removeTemplate)
  const builtIn = isBuiltInTemplate(template.id)

  return (
    <li className="flex items-center gap-2 border-b border-border/50 last:border-0">
      <button
        type="button"
        className={cn(
          'flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left transition hover:bg-default/10',
          canEdit && 'cursor-pointer',
        )}
        onClick={() => canEdit && onEdit()}
        disabled={!canEdit}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{template.name}</p>
          {template.description ? (
            <p className="truncate text-xs text-foreground/45">{template.description}</p>
          ) : (
            <p className="text-xs text-foreground/40">{templateSummary(template)}</p>
          )}
        </div>
        <Chip size="sm" variant="soft" className="hidden shrink-0 sm:inline-flex">
          {templateSummary(template)}
        </Chip>
        {builtIn ? (
          <span className="hidden shrink-0 text-[10px] text-foreground/35 md:inline">Bawaan</span>
        ) : null}
        {canEdit ? <ChevronRight className="size-4 shrink-0 text-foreground/35" aria-hidden /> : null}
      </button>
      <div className="flex shrink-0 items-center gap-0.5 pe-2">
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="Duplikat"
          onPress={() => duplicate(template.id)}
        >
          <Copy className="size-4" />
        </Button>
        {!builtIn ? (
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            className="text-red-600"
            aria-label="Hapus"
            onPress={() => {
              if (confirm(`Hapus "${template.name}"?`)) removeTemplate(template.id)
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        ) : null}
      </div>
    </li>
  )
}

function cloneBlueprint(tasks: TemplateTaskBlueprint[]): TemplateTaskBlueprint[] {
  return tasks.map((t) => ({
    ...t,
    subTasks: t.subTasks.map((s) => ({ ...s })),
  }))
}

function TemplateEditorForm({ template, onSaved }: { template: ProjectTemplate; onSaved: () => void }) {
  const saveTemplate = useAppStore((s) => s.saveTemplate)
  const builtIn = isBuiltInTemplate(template.id)

  const [name, setName] = useState(template.name)
  const [description, setDescription] = useState(template.description ?? '')
  const [tasks, setTasks] = useState(() => cloneBlueprint(template.tasksBlueprint))

  const storeBlueprintKey = JSON.stringify(template.tasksBlueprint)
  useEffect(() => {
    setName(template.name)
    setDescription(template.description ?? '')
    setTasks(cloneBlueprint(template.tasksBlueprint))
  }, [template.id, template.name, template.description, storeBlueprintKey])

  const dirty =
    name.trim() !== template.name ||
    (description.trim() || '') !== (template.description ?? '') ||
    JSON.stringify(tasks) !== JSON.stringify(template.tasksBlueprint)

  const persist = () => {
    if (!name.trim()) return
    saveTemplate({
      ...template,
      name: name.trim(),
      description: description.trim() || undefined,
      tasksBlueprint: tasks,
    })
    onSaved()
  }

  return (
    <div className="space-y-4 pb-2">
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="tpl-edit-name">Nama</Label>
          <Input id="tpl-edit-name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="tpl-edit-desc">Keterangan</Label>
          <TextArea
            id="tpl-edit-desc"
            fullWidth
            rows={2}
            placeholder="Opsional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/45">Checklist</p>
        <TemplateBlueprintEditor tasks={tasks} onChange={setTasks} />
      </div>

      <div className="sticky bottom-0 flex gap-2 border-t border-border/50 bg-background pt-3">
        <Button variant="primary" className="flex-1" isDisabled={!dirty || !name.trim()} onPress={persist}>
          Simpan & tutup
        </Button>
        <Button variant="secondary" onPress={onSaved}>
          Batal
        </Button>
      </div>
      {builtIn ? (
        <p className="text-xs text-foreground/45">Template bawaan: bisa diubah, tidak bisa dihapus (duplikat jika perlu variasi).</p>
      ) : null}
    </div>
  )
}
