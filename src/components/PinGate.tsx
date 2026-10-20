import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button, Card, Input, Label } from '@heroui/react'
import { DEFAULT_PIN } from '@/data/defaults'
import { useAppStore } from '@/store/appStore'

export function PinGate({ children }: { children: React.ReactNode }) {
  const unlockPin = useAppStore((s) => s.unlockPin)
  const pinUnlocked = useAppStore((s) => s.pinUnlocked)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  if (pinUnlocked) return <>{children}</>

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm border border-border/60 p-6 shadow-lg">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (unlockPin(pin, DEFAULT_PIN)) {
              setError('')
              return
            }
            setError('PIN salah')
          }}
        >
          <div className="flex items-center gap-2 text-accent">
            <Lock className="size-5" aria-hidden />
            <h1 className="text-lg font-semibold">OpsTrack</h1>
          </div>
          <p className="text-sm text-foreground/70">
            Masukkan PIN workspace (default <code className="rounded-md bg-default/15 px-1.5 py-0.5 text-xs">1234</code>).
          </p>
          <div className="space-y-2">
            <Label htmlFor="pin">PIN</Label>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              fullWidth
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" variant="primary" fullWidth>
            Masuk
          </Button>
        </form>
      </Card>
    </div>
  )
}
