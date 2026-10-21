import type { ProjectTemplate } from '@/types'
import { uid } from '@/lib/utils'

export const PIC_COLORS = ['#15803D', '#0369A1', '#7C3AED', '#EA580C', '#BE123C', '#0F766E']

export const DEFAULT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'tpl_toko_go',
    name: 'Standar Toko GO',
    description: 'Checklist GO default: ITR, planogram, cetak, kebutuhan toko.',
    category: 'toko_go',
    tasksBlueprint: [
      { id: uid('tb'), title: 'ITR Barang', isDetailed: false, offsetDays: -7, subTasks: [] },
      { id: uid('tb'), title: 'Planogram', isDetailed: false, offsetDays: -5, subTasks: [] },
      { id: uid('tb'), title: 'Cetak Header', isDetailed: false, offsetDays: -3, subTasks: [] },
      { id: uid('tb'), title: 'Cetak Stiker Barcode Pintu', isDetailed: false, offsetDays: -3, subTasks: [] },
      {
        id: uid('tb'),
        title: 'Kebutuhan Toko',
        isDetailed: true,
        offsetDays: -2,
        subTasks: [
          { id: uid('st'), title: 'Akrilik' },
          { id: uid('st'), title: 'Spanduk' },
          { id: uid('st'), title: 'A5' },
          { id: uid('st'), title: 'Stiker Harga Header' },
        ],
      },
    ],
  },
  {
    id: 'tpl_toko_tutup',
    name: 'Toko Tutup (kosong)',
    description: 'Mulai dari nol — tambah task sendiri setelah project dibuat.',
    category: 'toko_tutup',
    tasksBlueprint: [],
  },
  {
    id: 'tpl_random',
    name: 'Pekerjaan Random',
    description: 'Project ad-hoc tanpa task bawaan.',
    category: 'random',
    tasksBlueprint: [],
  },
]

export const DEFAULT_PIN = import.meta.env.VITE_WORKSPACE_PIN ?? '1234'
