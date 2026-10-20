import { useState } from 'react'

import { Button, Checkbox, Input, Label, ListBox, Select } from '@heroui/react'

import type { ProjectCategory } from '@/types'

import { buildNewProjectMessage, waLink } from '@/lib/whatsapp'

import { useAppStore } from '@/store/appStore'



const categoryLabel: Record<ProjectCategory, string> = {

  toko_go: 'Toko GO',

  toko_tutup: 'Toko Tutup',

  random: 'Random',

}



export function NewProjectForm({ onDone }: { onDone: () => void }) {

  const templates = useAppStore((s) => s.templates)

  const pics = useAppStore((s) => s.pics)

  const adminWaPhone = useAppStore((s) => s.adminWaPhone)

  const createProjectFromTemplate = useAppStore((s) => s.createProjectFromTemplate)



  const [title, setTitle] = useState('')

  const [storeCode, setStoreCode] = useState('')

  const [targetDate, setTargetDate] = useState('')

  const [category, setCategory] = useState<ProjectCategory>('toko_go')

  const [templateId, setTemplateId] = useState('tpl_toko_go')

  const [sendWa, setSendWa] = useState(true)



  const categoryTemplates = templates.filter((t) => t.category === category)



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

              {(Object.keys(categoryLabel) as ProjectCategory[]).map((c) => (

                <ListBox.Item key={c} id={c} textValue={categoryLabel[c]}>

                  {categoryLabel[c]}

                  <ListBox.ItemIndicator />

                </ListBox.Item>

              ))}

            </ListBox>

          </Select.Popover>

        </Select>

      </Field>

      <Field label="Template">

        <Select

          aria-label="Template project"

          selectedKey={templateId}

          onSelectionChange={(key) => setTemplateId(String(key))}

        >

          <Select.Trigger>

            <Select.Value />

            <Select.Indicator />

          </Select.Trigger>

          <Select.Popover>

            <ListBox>

              {categoryTemplates.map((t) => (

                <ListBox.Item key={t.id} id={t.id} textValue={t.name}>

                  {t.name}

                  <ListBox.ItemIndicator />

                </ListBox.Item>

              ))}

            </ListBox>

          </Select.Popover>

        </Select>

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

