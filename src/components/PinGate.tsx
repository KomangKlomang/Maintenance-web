import { useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import { Button, Input, Label } from '@heroui/react'
import { PinFallBackground } from '@/components/PinFallBackground'
import { DEFAULT_PIN } from '@/data/defaults'
import { useAppStore } from '@/store/appStore'

export function PinGate({ children }: { children: React.ReactNode }) {
  const unlockPin = useAppStore((s) => s.unlockPin)
  const pinUnlocked = useAppStore((s) => s.pinUnlocked)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  if (pinUnlocked) return <>{children}</>

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden p-4">
      <PinFallBackground />

      <div className="relative z-20 w-full max-w-md">
        <div className="op-panel overflow-hidden border border-white/20 bg-background/92 shadow-[0_24px_80px_-12px_rgb(37_99_235_/_0.35)] ring-1 ring-blue-600/15 backdrop-blur-xl">
          <div className="border-b border-blue-600/15 bg-gradient-to-r from-blue-600/10 to-transparent px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-sm bg-blue-600 text-white shadow-sm">
                <Lock className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700/80">Workspace</p>
                <h1 className="text-xl font-bold tracking-tight text-foreground">OpsTrack</h1>
              </div>
            </div>
          </div>

          <form
            className="space-y-4 px-6 py-5"
            onSubmit={(e) => {
              e.preventDefault()
              if (unlockPin(pin, DEFAULT_PIN)) {
                setError('')
                setPin('')
                return
              }
              setError('PIN salah bro, coba lagi ya.')
            }}
          >
            <div className="space-y-1">
              <p className="text-base font-semibold leading-snug text-foreground">
                Yooo, sup ma broh! 👋
              </p>
              <p className="text-sm leading-relaxed text-foreground/60">
                Masukin PIN workspace dulu—biar data toko &amp; task aman. Kalau baru join, minta PIN ke admin tim.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                inputMode="numeric"
                autoComplete="current-password"
                fullWidth
                placeholder="••••"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value)
                  if (error) setError('')
                }}
                autoFocus
              />
            </div>

            {error ? (
              <p className="rounded-sm border border-red-200/80 bg-red-50/90 px-2.5 py-2 text-sm text-red-800" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="primary" fullWidth className="h-11 font-semibold">
              Gas masuk
              <ArrowRight className="size-4" aria-hidden />
            </Button>

            <p className="text-center text-[11px] text-foreground/40">
              Dev lokal? Default PIN <span className="font-mono font-medium text-foreground/55">1234</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
