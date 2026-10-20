import type { WorkStatus } from '@/types'
import { STATUS_LABEL } from '@/lib/taskStatus'
import { Chip } from '@heroui/react'
import { cn } from '@/lib/utils'

const chipColor: Record<WorkStatus, 'default' | 'warning' | 'success'> = {
  todo: 'default',
  in_progress: 'warning',
  done: 'success',
}

export function StatusBadge({
  status,
  onClick,
  className,
}: {
  status: WorkStatus
  onClick?: () => void
  className?: string
}) {
  const label = STATUS_LABEL[status]
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn('rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2', className)}
        aria-label={`Status: ${label}. Klik untuk ubah.`}
      >
        <Chip color={chipColor[status]} size="sm" variant="soft">
          {label}
        </Chip>
      </button>
    )
  }
  return (
    <Chip className={className} color={chipColor[status]} size="sm" variant="soft">
      {label}
    </Chip>
  )
}
