import { Component, StrictMode, useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { fetchPublicIp } from './lib/device'
import { useAppStore } from './store/appStore'
import './index.css'

class RootErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background p-6 text-center">
          <p className="text-base font-semibold text-foreground">OpsTrack gagal dimuat</p>
          <p className="max-w-md text-sm text-foreground/60">{this.state.error.message}</p>
          <button
            type="button"
            className="rounded-sm bg-blue-600 px-4 py-2 text-sm font-medium text-white"
            onClick={() => {
              try {
                localStorage.removeItem('opstrack-v1')
              } catch {
                /* ignore */
              }
              window.location.reload()
            }}
          >
            Reset data lokal & muat ulang
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function Bootstrap() {
  const [ready, setReady] = useState(() => useAppStore.persist.hasHydrated())

  useEffect(() => {
    let cancelled = false
    const finish = () => {
      if (!cancelled) setReady(true)
    }
    const onReady = () => {
      finish()
      void fetchPublicIp().then((ip) => useAppStore.getState().initClientMeta(ip))
    }

    if (useAppStore.persist.hasHydrated()) {
      onReady()
      return () => {
        cancelled = true
      }
    }

    const unsub = useAppStore.persist.onFinishHydration(onReady)
    const timeout = window.setTimeout(finish, 2500)

    return () => {
      cancelled = true
      unsub()
      window.clearTimeout(timeout)
    }
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-sm text-foreground/70">
        Memuat data…
      </div>
    )
  }

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <Bootstrap />
    </RootErrorBoundary>
  </StrictMode>,
)
