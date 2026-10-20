export function getDeviceLabel(): string {
  if (typeof navigator === 'undefined') return 'Perangkat tidak dikenal'
  const mobile = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)
  const os = navigator.platform ?? 'Perangkat'
  return `${os} · ${mobile ? 'Mobile' : 'Desktop'}`
}

export async function fetchPublicIp(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { ip?: string }
    return data.ip ?? null
  } catch {
    return null
  }
}
