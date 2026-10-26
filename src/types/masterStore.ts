export interface MasterStore {
  storeCode: string
  name: string
  origin: string | null
  address: string | null
  region: string | null
  province: string | null
  city: string | null
  district: string | null
  zipCode: string | number | null
  status: string | null
  areaCoordinator: string | null
  areaManager: string | null
  latitude: number | null
  longitude: number | null
  goLiveDate: string | null
  notes: string | null
  phone: string | number | null
  closedDate: string | null
  storeType: string | null
  relocationBuilding: string | null
  relocationGs: string | null
  openTime: string | null
  closeTime: string | null
  createdBy: string | null
  createdAt: string | null
  updatedAt: string | null
  approvedBy: string | null
  approvedAt: string | null
}

export interface MasterStoreDataset {
  meta: { exportedAt: string; source: string; total: number }
  stores: MasterStore[]
}

export type AppModule = 'opstrack' | 'master'
