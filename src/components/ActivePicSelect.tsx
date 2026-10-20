import { Label, ListBox, Select } from '@heroui/react'
import { useAppStore } from '@/store/appStore'

export function ActivePicSelect({ compact }: { compact?: boolean }) {
  const pics = useAppStore((s) => s.pics)
  const activePicId = useAppStore((s) => s.activePicId)
  const setActivePicId = useAppStore((s) => s.setActivePicId)

  if (pics.length === 0) {
    return compact ? null : (
      <p className="text-xs text-foreground/55">
        Tambah PIC di <strong>Atur</strong> untuk log perubahan.
      </p>
    )
  }

  return (
    <div className={compact ? 'min-w-[8.5rem]' : 'min-w-[11rem]'}>
      {!compact ? <Label className="text-[11px] text-foreground/50">Log sebagai (PIC)</Label> : null}
      <Select
        aria-label="PIC aktif untuk log"
        selectedKey={activePicId ?? '__none__'}
        onSelectionChange={(key) => setActivePicId(key === '__none__' ? null : String(key))}
      >
        <Select.Trigger className={compact ? 'h-8 min-h-8' : 'mt-0.5 h-9 min-h-9'}>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="__none__" textValue="Belum dipilih">
              Belum dipilih
              <ListBox.ItemIndicator />
            </ListBox.Item>
            {pics.map((p) => (
              <ListBox.Item key={p.id} id={p.id} textValue={p.name}>
                {p.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  )
}
