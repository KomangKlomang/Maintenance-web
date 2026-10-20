/** Normalize Indonesian phone to wa.me format (628...) */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('62')) return digits
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  return digits
}

export function formatPhoneDisplay(phone: string): string {
  if (phone.startsWith('62')) return `0${phone.slice(2)}`
  return phone
}
