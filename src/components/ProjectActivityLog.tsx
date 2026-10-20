import { Chip, Disclosure } from '@heroui/react'
import { formatDateTime } from '@/lib/dates'
import type { Project } from '@/types'

export function ProjectActivityLog({ project }: { project: Project }) {
  const logs = project.activityLog ?? []
  const count = logs.length

  return (
    <Disclosure className="op-panel rounded-xl border border-border/70 bg-background px-1">
      <Disclosure.Heading>
        <Disclosure.Trigger className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left">
          <span className="text-sm font-medium">
            Log aktivitas
            {count > 0 ? <span className="ms-2 text-foreground/50">({count})</span> : null}
          </span>
          <Disclosure.Indicator />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="border-t border-border/60 px-3 pb-3 pt-2">
          {count === 0 ? (
            <p className="text-sm text-foreground/60">Belum ada perubahan.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border/70 text-[11px] uppercase tracking-wide text-foreground/45">
                    <th className="py-2 pe-3 font-medium">Waktu</th>
                    <th className="py-2 pe-3 font-medium">PIC</th>
                    <th className="py-2 pe-3 font-medium">Peristiwa</th>
                    <th className="py-2 pe-3 font-medium">Perangkat</th>
                    <th className="py-2 font-medium">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((entry) => (
                    <tr key={entry.id} className="border-b border-border/40 last:border-0">
                      <td className="py-2 pe-3 align-top tabular-nums text-xs text-foreground/55">
                        {formatDateTime(entry.at)}
                      </td>
                      <td className="py-2 pe-3 align-top">
                        <Chip size="sm" variant="soft">
                          {entry.picName}
                        </Chip>
                      </td>
                      <td className="py-2 pe-3 align-top">
                        <p className="font-medium">{entry.summary}</p>
                        {entry.detail ? <p className="text-xs text-foreground/55">{entry.detail}</p> : null}
                      </td>
                      <td className="py-2 pe-3 align-top text-xs text-foreground/60">{entry.deviceLabel}</td>
                      <td className="py-2 align-top font-mono text-xs text-foreground/60">{entry.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  )
}
