import { cn } from '@/lib/utils'

const R = 15
const C = 2 * Math.PI * R

const strokeByTone = {
  default: 'stroke-blue-600',
  warning: 'stroke-amber-500',
  danger: 'stroke-red-600',
} as const

const trackByTone = {
  default: 'stroke-blue-600/15',
  warning: 'stroke-amber-500/20',
  danger: 'stroke-red-600/15',
} as const

export function ProjectProgressRing({
  value,
  label,
  tone = 'default',
}: {
  value: number
  label?: string
  tone?: 'default' | 'warning' | 'danger'
}) {
  const clamped = Math.min(100, Math.max(0, value))
  const offset = C * (1 - clamped / 100)

  return (
    <div
      className="relative flex size-[4.5rem] shrink-0 items-center justify-center"
      aria-label={label ?? `Progress ${clamped} persen`}
      role="img"
    >
      <svg
        className="size-[4.5rem] -rotate-90"
        viewBox="0 0 36 36"
        aria-hidden
      >
        <circle
          cx="18"
          cy="18"
          r={R}
          fill="none"
          strokeWidth="3"
          className={cn(trackByTone[tone])}
        />
        <circle
          cx="18"
          cy="18"
          r={R}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          className={cn(strokeByTone[tone], 'transition-[stroke-dashoffset] duration-500 ease-out')}
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[15px] font-bold tabular-nums leading-none tracking-tight text-foreground">
          {clamped}
        </span>
        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-foreground/45">%</span>
      </span>
    </div>
  )
}
