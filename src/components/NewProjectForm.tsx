import { useEffect, useState } from 'react'
import { Button, Checkbox, Input, Label, ListBox, Select } from '@heroui/react'
import { TEMPLATE_CATEGORY_LABEL, templateSummary } from '@/lib/templates'
import { buildNewProjectMessage, waLink } from '@/lib/whatsapp'
import { useAppStore } from '@/store/appStore'
import type { ProjectCategory } from '@/types'

export function NewProjectForm({ onDone }: { onDone: () => void }) {
  const templates = useAppStore((s) => s.templates)
  const pics = useAppStore((s) => s.pics)
  const adminWaPhone = useAppStore((s) => s.adminWaPhone)
  const createProjectFromTemplate = useAppStore((s) => s.createProjectFromTemplate)
  const setView = useAppStore((s) => s.setView)

  const [title, setTitle] = useState('')
  const [storeCode, setStoreCode] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [category, setCategory] = useState<ProjectCategory>('toko_go')
  const [templateId, setTemplateId] = useState('tpl_toko_go')
  const [sendWa, setSendWa] = useState(true)

  const categoryTemplates = templates.filter((t) => t.category === category)
  const selectedTemplate = templates.find((t) => t.id === templateId)

  useEffect(() => {
    if (categoryTemplates.some((t) => t.id === templateId)) return
    const first = categoryTemplates[0]
    if (first) setTemplateId(first.id)
  }, [category, categoryTemplates, templateId])

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        const project = createProjectFromTemplate({
          title,
          storeCode,
          category,
          targetDate,
          templateId: templateId || categoryTemplates[0]?.id || 'tpl_random',
        })
        if (sendWa) {
          const byPic = new Map<string, typeof project.tasks>()
          for (const task of project.tasks) {
            for (const picId of task.picIds) {
              if (!byPic.has(picId)) byPic.set(picId, [])
              byPic.get(picId)!.push(task)
            }
          }
          if (byPic.size === 0 && adminWaPhone) {
            window.open(
              waLink(
                adminWaPhone,
                buildNewProjectMessage(
                  project,
                  { id: '', name: 'Tim', phone: adminWaPhone, color: '' },
                  project.tasks,
                ),
              ),
              '_blank',
            )
          } else {
            for (const [picId, tasks] of byPic) {
              const pic = pics.find((p) => p.id === picId)
              if (pic?.phone) window.open(waLink(pic.phone, buildNewProjectMessage(project, pic, tasks)), '_blank')
            }
          }
        }
        onDone()
      }}
    >
      <Field label="Nama project / toko">
        <Input required fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="Kode toko">
        <Input fullWidth placeholder="TK-104" value={storeCode} onChange={(e) => setStoreCode(e.target.value)} />
      </Field>
      <Field label="Tanggal GO / tutup / deadline">
        <Input required fullWidth type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
      </Field>
      <Field label="Jenis">
        <Select
          aria-label="Jenis project"
          selectedKey={category}
          onSelectionChange={(key) => {
            const c = String(key) as ProjectCategory
            setCategory(c)
            const first = templates.find((t) => t.category === c)
            if (first) setTemplateId(first.id)
          }}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {(Object.keys(TEMPLATE_CATEGORY_LABEL) as ProjectCategory[]).map((c) => (
                <ListBox.Item key={c} id={c} textValue={TEMPLATE_CATEGORY_LABEL[c]}>
                  {TEMPLATE_CATEGORY_LABEL[c]}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </Field>
      <Field label="Template checklist">
        <Select
          aria-label="Template project"
          selectedKey={templateId}
          onSelectionChange={(key) => setTemplateId(String(key))}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="max-w-[min(100vw-2rem,24rem)]">
            <ListBox>
              {categoryTemplates.map((t) => (
                <ListBox.Item key={t.id} id={t.id} textValue={`${t.name} ${templateSummary(t)}`}>
                  <div className="flex min-w-0 flex-col gap-0.5 py-0.5">
                    <span className="truncate font-medium leading-snug">{t.name}</span>
                    <span className="text-[11px] leading-snug text-foreground/50">{templateSummary(t)}</span>
                    {t.description ? (
                      <span className="line-clamp-2 text-[11px] leading-snug text-foreground/45">{t.description}</span>
                    ) : null}
                  </div>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        {selectedTemplate?.description ? (
          <p className="text-xs text-foreground/50">{selectedTemplate.description}</p>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-0 text-xs text-blue-700"
          onPress={() => {
            onDone()
            setView('templates')
          }}
        >
          Kelola template (nama, duplikat, hapus)
        </Button>
      </Field>
      <Checkbox isSelected={sendWa} onChange={setSendWa}>
        Buka WhatsApp setelah simpan (PIC / nomor admin)
      </Checkbox>
      <Button type="submit" variant="primary" fullWidth>
        Simpan project
      </Button>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
