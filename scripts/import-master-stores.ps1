# Impor ulang Master Toko dari Excel export ke src/data/masterStores.json
param(
  [string]$ExcelPath = "$env:USERPROFILE\Downloads\Export_Master_Store_2026_10_26_114031.xlsx"
)

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $root "src\data\masterStores.json"

python -c @"
import pandas as pd, json
from pathlib import Path
path = r'$ExcelPath'
out = Path(r'$out')
df = pd.read_excel(path, header=6).dropna(how='all')

def cell(v):
    import pandas as pd
    if pd.isna(v): return None
    if isinstance(v, float) and v == int(v): return int(v)
    return v if isinstance(v, (int, float, bool)) else str(v).strip()

records = []
for _, r in df.iterrows():
    if pd.isna(r.get('Kode Toko')): continue
    records.append({
        'storeCode': cell(r.get('Kode Toko')),
        'name': cell(r.get('Nama')),
        'origin': cell(r.get('Asal Toko')),
        'address': cell(r.get('Alamat')),
        'region': cell(r.get('Region')),
        'province': cell(r.get('Provinsi')),
        'city': cell(r.get('Kota / Kabupaten')),
        'district': cell(r.get('Kecamatan')),
        'zipCode': cell(r.get('ZIP Code')),
        'status': cell(r.get('Status')),
        'areaCoordinator': cell(r.get('AC (Area Coordinator)')),
        'areaManager': cell(r.get('AM (Area Manager)')),
        'latitude': cell(r.get('Latitude')),
        'longitude': cell(r.get('Longitude')),
        'goLiveDate': cell(r.get('Tanggal Go Live')),
        'notes': cell(r.get('Keterangan')),
        'phone': cell(r.get('Nomor HP')),
        'closedDate': cell(r.get('Tanggal Tutup')),
        'storeType': cell(r.get('Tipe Toko')),
        'relocationBuilding': cell(r.get('Relokasi Building Aset')),
        'relocationGs': cell(r.get('Relokasi GS Aset')),
        'openTime': cell(r.get('Jam Buka')),
        'closeTime': cell(r.get('Jam Tutup')),
        'createdBy': cell(r.get('Dibuat Oleh')),
        'createdAt': cell(r.get('Dibuat Pada')),
        'updatedAt': cell(r.get('Diperbarui Pada')),
        'approvedBy': cell(r.get('Disetujui Oleh')),
        'approvedAt': cell(r.get('Waktu Persetujuan')),
    })

payload = {'meta': {'exportedAt': pd.Timestamp.now().strftime('%Y-%m-%d'), 'source': Path(path).name, 'total': len(records)}, 'stores': records}
out.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'OK: {len(records)} toko -> {out}')
"@

Write-Host "Selesai. Commit src/data/masterStores.json jika perlu deploy."
