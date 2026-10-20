import { ListBox, Select } from '@heroui/react'
import type { WorkStatus } from '@/types'
import { STATUS_LABEL } from '@/lib/taskStatus'

const ORDER: WorkStatus[] = ['todo', 'in_progress', 'done']

export function StatusSelect({
  status,
  onChange,
  label = 'Status task',
}: {
  status: WorkStatus
  onChange: (status: WorkStatus) => void
  label?: string
}) {
  return (
    <Select
      aria-label={label}
      selectedKey={status}
      onSelectionChange={(key) => {
        if (key) onChange(String(key) as WorkStatus)
      }}
    >
      <Select.Trigger className="min-w-[8.5rem] rounded-sm">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {ORDER.map((s) => (
            <ListBox.Item key={s} id={s} textValue={STATUS_LABEL[s]}>
              {STATUS_LABEL[s]}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
