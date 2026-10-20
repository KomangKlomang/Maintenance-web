import { AlertTriangle } from 'lucide-react'
import type { ProjectAlert } from '@/lib/projectAlert'
import { cn } from '@/lib/utils'

export function ProjectAlertBanner({
  alert,
  compact,
  variant = 'panel',
}: {
  alert: ProjectAlert
  compact?: boolean
  variant?: 'panel' | 'inline'
}) {
  const urgent = alert.level === 'urgent'

  if (variant === 'inline') {
    return (
      <p
        role="status"
        className={cn(
          'flex items-center gap-1.5 text-[11px] leading-snug',
          urgent ? 'text-red-700' : 'text-amber-800',
        )}
      >
        <AlertTriangle className="size-3.5 shrink-0 opacity-90" aria-hidden />
        <span>
          <span className="font-semibold">{alert.title}</span>
          <span className="text-foreground/35"> · </span>
          <span className={urgent ? 'text-red-800/90' : 'text-amber-900/80'}>{alert.message}</span>
        </span>
      </p>
    )
  }

  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-2 rounded-md border px-2.5 text-xs',
        urgent ? 'border-red-200/80 bg-red-50/80 text-red-950' : 'border-amber-200/80 bg-amber-50/70 text-amber-950',
        compact ? 'py-1.5' : 'py-2',
      )}
    >
      <AlertTriangle className={cn('size-3.5 shrink-0 mt-0.5', urgent ? 'text-red-600' : 'text-amber-600')} aria-hidden />
      <div className="min-w-0 leading-snug">
        <span className={cn('font-semibold', urgent && 'text-red-700')}>{alert.title}</span>
        <span className="text-foreground/30"> · </span>
        <span className={urgent ? 'text-red-900/85' : 'text-amber-900/85'}>{alert.message}</span>
      </div>
    </div>
  )
}
