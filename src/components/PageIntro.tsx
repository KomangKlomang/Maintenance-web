import { Card } from '@heroui/react'
import type { ReactNode } from 'react'

export function PageIntro({
  title,
  steps,
  legend,
}: {
  title: string
  steps: string[]
  legend?: ReactNode
}) {
  return (
    <Card className="op-card border border-border/70 bg-default/5 p-4">
      <p className="mb-2 text-sm font-semibold text-foreground">{title}</p>
      <ol className="list-decimal space-y-1 ps-4 text-sm text-foreground/75">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {legend ? <div className="mt-3 border-t border-border/60 pt-3">{legend}</div> : null}
    </Card>
  )
}

export function UrgencyLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-foreground/80">
      <LegendDot className="bg-red-600" label="Merah — terlambat / hari ini (H-0 s/d H-2)" />
      <LegendDot className="bg-amber-500" label="Kuning — minggu ini" />
      <LegendDot className="bg-sky-500" label="Biru — masih aman (H+3 ke atas)" />
    </div>
  )
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block size-2.5 rounded-sm ${className}`} aria-hidden />
      {label}
    </span>
  )
}
