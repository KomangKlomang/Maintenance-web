import * as XLSX from 'xlsx'
import { MASTER_STORE_EXCEL_COLUMNS } from '@/lib/masterStoreColumns'
import { normalizeCell, normalizeStore } from '@/lib/masterStoreNormalize'
import type { MasterStore } from '@/types/masterStore'

export type MasterStoreMergeResult = {
  added: number
  updated: number
  unchanged: number
  skipped: number
}

function findHeaderRow(rows: unknown[][]): number {
  for (let i = 0; i < Math.min(rows.length, 20); i++) {
    const row = rows[i]
    if (!Array.isArray(row)) continue
    if (row.some((c) => String(c ?? '').trim() === 'Kode Toko')) return i
  }
  return 6
}

function rowToRecord(headers: string[], row: unknown[]): MasterStore | null {
  const map: Record<string, unknown> = {}
  headers.forEach((h, i) => {
    if (h) map[String(h).trim()] = row[i]
  })
  const code = normalizeCell(map['Kode Toko'])
  if (code == null) return null
  const partial: Partial<MasterStore> & { storeCode: string | number } = { storeCode: String(code) }
  for (const { header, key } of MASTER_STORE_EXCEL_COLUMNS) {
    if (key === 'storeCode') continue
    ;(partial as Record<string, unknown>)[key] = normalizeCell(map[header])
  }
  return normalizeStore(partial)
}

export function parseMasterStoresExcel(buffer: ArrayBuffer): MasterStore[] {
  const wb = XLSX.read(buffer, { type: 'array', cellDates: true })
  const sheetName = wb.SheetNames[0]
  if (!sheetName) return []
  const sheet = wb.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, raw: false }) as unknown[][]
  const headerIdx = findHeaderRow(rows)
  const headerRow = rows[headerIdx] as unknown[]
  if (!headerRow) return []
  const headers = headerRow.map((c) => String(c ?? '').trim())
  const stores: MasterStore[] = []
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i]
    if (!Array.isArray(row)) continue
    if (row.every((c) => c == null || String(c).trim() === '')) continue
    const rec = rowToRecord(headers, row)
    if (rec) stores.push(rec)
  }
  return stores
}

export function exportMasterStoresExcel(stores: MasterStore[], filename: string): void {
  const headerLabels = MASTER_STORE_EXCEL_COLUMNS.map((c) => c.header)
  const dataRows = stores.map((store) =>
    MASTER_STORE_EXCEL_COLUMNS.map(({ key }) => {
      const v = store[key]
      if (v == null) return ''
      return v
    }),
  )
  const aoa: unknown[][] = []
  for (let i = 0; i < 6; i++) aoa.push([])
  aoa.push(headerLabels)
  aoa.push(...dataRows)

  const ws = XLSX.utils.aoa_to_sheet(aoa)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Master Store')
  XLSX.writeFile(wb, filename, { bookType: 'xlsx' })
}

export async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return await file.arrayBuffer()
}
