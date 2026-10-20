import { MessageCircle, X } from 'lucide-react'
import type { PIC } from '@/types'
import { waLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export function PicChips({
  picIds,
  pics,
  onToggle,
  waMessage,
}: {
  picIds: string[]
  pics: PIC[]
  onToggle?: (picId: string) => void
  waMessage?: string
}) {
  const selected = pics.filter((p) => picIds.includes(p.id))
  return (
    <div className="flex flex-wrap gap-2">
      {selected.map((p) => (
        <span
          key={p.id}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-white"
          style={{ backgroundColor: p.color }}
        >
          {p.name}
          {waMessage && p.phone ? (
            <a
              href={waLink(p.phone, waMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-7 items-center justify-center rounded-full bg-black/15 hover:bg-black/25"
              aria-label={`WhatsApp ${p.name}`}
            >
              <MessageCircle className="size-3.5" />
            </a>
          ) : null}
          {onToggle ? (
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-full hover:bg-black/15"
              onClick={() => onToggle(p.id)}
              aria-label={`Hapus PIC ${p.name}`}
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </span>
      ))}
      {onToggle ? (
        <PicPicker pics={pics} exclude={picIds} onPick={(id) => onToggle(id)} />
      ) : null}
    </div>
  )
}

function PicPicker({
  pics,
  exclude,
  onPick,
}: {
  pics: PIC[]
  exclude: string[]
  onPick: (id: string) => void
}) {
  const options = pics.filter((p) => !exclude.includes(p.id))
  if (!options.length) {
    return <span className="text-xs text-[color:var(--color-muted-foreground)]">Tambah PIC di Pengaturan</span>
  }
  return (
    <select
      className={cn('min-h-9 rounded-full border bg-white px-2 text-xs')}
      defaultValue=""
      onChange={(e) => {
        if (e.target.value) onPick(e.target.value)
        e.target.value = ''
      }}
      aria-label="Tambah PIC"
    >
      <option value="">+ PIC</option>
      {options.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  )
}
