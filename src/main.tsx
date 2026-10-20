import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { fetchPublicIp } from './lib/device'
import { useAppStore } from './store/appStore'
import './index.css'

function Bootstrap() {
  const [ready, setReady] = useState(() => useAppStore.persist.hasHydrated())

  useEffect(() => {
    const onReady = () => {
      setReady(true)
      void fetchPublicIp().then((ip) => useAppStore.getState().initClientMeta(ip))
    }
    if (useAppStore.persist.hasHydrated()) {
      onReady()
      return
    }
    return useAppStore.persist.onFinishHydration(onReady)
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
    <Bootstrap />
  </StrictMode>,
)
