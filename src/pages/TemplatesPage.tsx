import { TemplateManager } from '@/components/TemplateManager'

export function TemplatesPage() {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-lg font-semibold md:text-xl">Template</h2>
        <p className="text-xs text-foreground/60 md:text-sm">
          Buat dan edit checklist bawaan untuk project baru — nama, keterangan, task, offset H, sub-task.
        </p>
      </header>
      <TemplateManager editor />
    </div>
  )
}
