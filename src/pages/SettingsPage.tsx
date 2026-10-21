import { ActivePicSelect } from '@/components/ActivePicSelect'
import { Button } from '@heroui/react'
import { formatPhoneDisplay } from '@/lib/phone'
import { useAppStore } from '@/store/appStore'

export function SettingsPage() {
  const pics = useAppStore((s) => s.pics)
  const setView = useAppStore((s) => s.setView)
  const adminWaPhone = useAppStore((s) => s.adminWaPhone)
  const addPic = useAppStore((s) => s.addPic)
  const removePic = useAppStore((s) => s.removePic)
  const setAdminWaPhone = useAppStore((s) => s.setAdminWaPhone)
  const lock = useAppStore((s) => s.lock)

  return (
    <div className="space-y-8">
      <section className="op-panel rounded-xl border border-border/70 p-4 md:hidden">
        <h2 className="mb-2 text-sm font-semibold">PIC aktif (log)</h2>
        <ActivePicSelect />
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">PIC (nama + WhatsApp)</h2>
        <form
          className="mb-4 grid gap-2 sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const name = String(fd.get('name') ?? '')
            const phone = String(fd.get('phone') ?? '')
            if (name && phone) addPic(name, phone, String(fd.get('role') ?? '') || undefined)
            e.currentTarget.reset()
          }}
        >
          <input name="name" required placeholder="Nama" className={inputCls} />
          <input name="phone" required placeholder="0812..." className={inputCls} />
          <input name="role" placeholder="Tim cetak (opsional)" className={inputCls} />
          <button type="submit" className="min-h-11 rounded-xl bg-[color:var(--color-primary)] font-medium text-white sm:col-span-3">
            Tambah PIC
          </button>
        </form>
        <ul className="space-y-2">
          {pics.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-xl border bg-white p-3">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-[color:var(--color-muted-foreground)]">{formatPhoneDisplay(p.phone)}</p>
              </div>
              <button type="button" className="text-sm text-red-600" onClick={() => removePic(p.id)}>
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Nomor WA admin / grup</h2>
        <input
          className={inputCls}
          placeholder="628..."
          value={adminWaPhone}
          onChange={(e) => setAdminWaPhone(e.target.value)}
        />
        <p className="mt-1 text-xs text-[color:var(--color-muted-foreground)]">Dipakai jika project belum punya PIC saat kirim WA.</p>
      </section>

      <section className="op-panel border border-border/70 p-4">
        <h2 className="mb-1 text-lg font-semibold">Template project</h2>
        <p className="mb-3 text-sm text-foreground/60">Kelola checklist bawaan di halaman Template.</p>
        <Button size="sm" variant="secondary" onPress={() => setView('templates')}>
          Buka manajemen template
        </Button>
      </section>

      <button type="button" className="min-h-11 rounded-xl border px-4 text-sm" onClick={lock}>
        Kunci workspace (PIN)
      </button>
    </div>
  )
}

const inputCls =
  'w-full min-h-11 rounded-xl border bg-white px-3 text-base focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]'
