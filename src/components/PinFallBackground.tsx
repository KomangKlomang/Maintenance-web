import { useMemo } from 'react'
import { cn } from '@/lib/utils'

const GLYPHS = ['📦', '🔧', '📋', '✅', '🏪', '📌', '⚡', '🛠️', '📊', '🔩'] as const

type FallItem = {
  id: number
  kind: 'emoji' | 'shape'
  glyph?: string
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  shapeClass?: string
}

function seedItems(count: number): FallItem[] {
  return Array.from({ length: count }, (_, id) => {
    const emoji = id % 3 !== 1
    return {
      id,
      kind: emoji ? 'emoji' : 'shape',
      glyph: GLYPHS[id % GLYPHS.length],
      left: (id * 13 + 3) % 98,
      size: emoji ? 22 + (id % 6) * 6 : 28 + (id % 4) * 12,
      duration: 16 + (id % 8) * 4,
      delay: -(id * 2.1) % 20,
      drift: ((id % 9) - 4) * 18,
      shapeClass:
        id % 2 === 0
          ? 'rounded-lg bg-blue-500/25 border border-blue-400/40 shadow-sm'
          : 'rounded-full bg-sky-400/20 border border-sky-300/35',
    }
  })
}

export function PinFallBackground() {
  const items = useMemo(() => seedItems(42), [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/25 via-blue-950/5 to-sky-400/20" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      {items.map((item) => (
        <span
          key={item.id}
          className={cn(
            'op-pin-fall-item select-none',
            item.kind === 'emoji' && 'op-pin-fall-item--emoji drop-shadow-md',
            item.kind === 'shape' && cn('op-pin-fall-item--shape block', item.shapeClass),
          )}
          style={{
            left: `${item.left}%`,
            ...(item.kind === 'emoji'
              ? { fontSize: item.size }
              : { width: item.size, height: item.size }),
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            ['--op-pin-drift' as string]: `${item.drift}px`,
            ['--op-pin-spin' as string]: `${360 + (item.id % 4) * 180}deg`,
          }}
        >
          {item.kind === 'emoji' ? item.glyph : null}
        </span>
      ))}

      {/* Vignette ring — kosongkan tengah supaya jatuhannya kelihatan di sisi */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--background)_88%)] opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  )
}
