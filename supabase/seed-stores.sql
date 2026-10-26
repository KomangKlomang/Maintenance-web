-- Seed stores (workspace slug: default)
delete from stores where workspace_id = (select id from workspaces where slug = 'default');

insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D4001', 'TLOGOSARI', 'Ex. LWS', 'Jl. Soekarno Hatta No. 16, Tlogosari Kulon', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'PEDURUNGAN', '50196', 'Non-Aktif',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -6.9809449, 110.4526745,
  '2024-11-01', '87722724829', '13:00–21:00',
  '2026-10-15', 'Store', null,
  '13:00', '21:00', '{"storeCode":"D4001","name":"TLOGOSARI","origin":"Ex. LWS","address":"Jl. Soekarno Hatta No. 16, Tlogosari Kulon","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"PEDURUNGAN","zipCode":50196,"status":"Non-Aktif","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9809449,"longitude":110.4526745,"goLiveDate":"2024-11-01","notes":null,"phone":87722724829,"closedDate":"2026-10-15","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B4004', 'KELAPA DUA', 'Ex. LWS', 'JL. QADR RAYA NO 1 RT 001 RW 014, KELAPA DUA', 'JABODETABEK',
  'BANTEN', 'KABUPATEN TANGERANG', 'KELAPA DUA', '15810', 'Non-Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.2275569, 106.6177116,
  '2024-12-18', null, '09:00–21:00',
  '2025-11-26', 'Store', null,
  '09:00', '21:00', '{"storeCode":"B4004","name":"KELAPA DUA","origin":"Ex. LWS","address":"JL. QADR RAYA NO 1 RT 001 RW 014, KELAPA DUA","region":"JABODETABEK","province":"BANTEN","city":"KABUPATEN TANGERANG","district":"KELAPA DUA","zipCode":15810,"status":"Non-Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.2275569,"longitude":106.6177116,"goLiveDate":"2024-12-18","notes":null,"phone":null,"closedDate":"2025-11-26","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B4005', 'BOULEVARD', 'Ex. LWS', 'RUKO BOEULEVARD MELODY MLDC 20-21, MEDANG', 'JABODETABEK',
  'BANTEN', 'KABUPATEN TANGERANG', 'PAGEDANGAN', '15334', 'Non-Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.2714478, 106.6034912,
  '2024-12-18', '87722724815', '09:00–21:00',
  '2025-10-15', 'Store', 'Office Hub',
  '09:00', '21:00', '{"storeCode":"B4005","name":"BOULEVARD","origin":"Ex. LWS","address":"RUKO BOEULEVARD MELODY MLDC 20-21, MEDANG","region":"JABODETABEK","province":"BANTEN","city":"KABUPATEN TANGERANG","district":"PAGEDANGAN","zipCode":15334,"status":"Non-Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.2714478,"longitude":106.6034912,"goLiveDate":"2024-12-18","notes":"Office Hub","phone":87722724815,"closedDate":"2025-10-15","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B4006', 'SUKA SARI', 'Ex. LWS', 'JL VETERAN RY NO D12 NO 15 RT 05 RW 08 SUKASARI', 'JABODETABEK',
  'BANTEN', 'KOTA TANGERANG', 'TANGERANG', '15118', 'Non-Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.185355, 106.6408941,
  '2024-12-23', '87722724816', '09:00–21:00',
  '2025-10-01', 'Store', null,
  '09:00', '21:00', '{"storeCode":"B4006","name":"SUKA SARI","origin":"Ex. LWS","address":"JL VETERAN RY NO D12 NO 15 RT 05 RW 08 SUKASARI","region":"JABODETABEK","province":"BANTEN","city":"KOTA TANGERANG","district":"TANGERANG","zipCode":15118,"status":"Non-Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.185355,"longitude":106.6408941,"goLiveDate":"2024-12-23","notes":null,"phone":87722724816,"closedDate":"2025-10-01","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B5007', 'FIORENZA CIKUPA', 'DTS', 'JL. Raya H. Cinde Lakoni , Ruko Fiorenza Blok P.17 /52 Cikupa', 'JABODETABEK',
  'BANTEN', 'KABUPATEN TANGERANG', 'PANONGAN', '15710', 'Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.2607883, 106.5310717,
  '2025-02-27', '81944210513', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"B5007","name":"FIORENZA CIKUPA","origin":"DTS","address":"JL. Raya H. Cinde Lakoni , Ruko Fiorenza Blok P.17 /52 Cikupa","region":"JABODETABEK","province":"BANTEN","city":"KABUPATEN TANGERANG","district":"PANONGAN","zipCode":15710,"status":"Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.2607883,"longitude":106.5310717,"goLiveDate":"2025-02-27","notes":null,"phone":81944210513,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B5003', 'BENDA PAMULANG', 'DTS', 'Ruko Pamulang permai F1 /27, Pondok Benda', 'JABODETABEK',
  'BANTEN', 'KOTA TANGERANG SELATAN', 'PAMULANG', '15416', 'Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.3308007, 106.7097153,
  '2025-04-25', '81944215238', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"B5003","name":"BENDA PAMULANG","origin":"DTS","address":"Ruko Pamulang permai F1 /27, Pondok Benda","region":"JABODETABEK","province":"BANTEN","city":"KOTA TANGERANG SELATAN","district":"PAMULANG","zipCode":15416,"status":"Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.3308007,"longitude":106.7097153,"goLiveDate":"2025-04-25","notes":null,"phone":81944215238,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B5004', 'MILENIAL PIK 2', 'DTS', 'RUKAN MILENIAL BLOK B-07, TANJUNG BURUNG', 'JABODETABEK',
  'BANTEN', 'KABUPATEN TANGERANG', 'TELUKNAGA', '15214', 'Aktif',
  'LINDA APRILIA (LAA)', 'JANE SARA AGUSTINA (JSA)', -6.023832, 106.638837,
  '2025-05-28', '81944219566', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"B5004","name":"MILENIAL PIK 2","origin":"DTS","address":"RUKAN MILENIAL BLOK B-07, TANJUNG BURUNG","region":"JABODETABEK","province":"BANTEN","city":"KABUPATEN TANGERANG","district":"TELUKNAGA","zipCode":15214,"status":"Aktif","areaCoordinator":"LINDA APRILIA (LAA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.023832,"longitude":106.638837,"goLiveDate":"2025-05-28","notes":null,"phone":81944219566,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B5005', 'TAMAN ASRI', 'DTS', 'Ruko Taman Asri Blok I No.2,Larangan', 'JABODETABEK',
  'BANTEN', 'KOTA TANGERANG', 'LARANGAN', '15151', 'Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.236641, 106.730448,
  '2025-07-17', '87722724806', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"B5005","name":"TAMAN ASRI","origin":"DTS","address":"Ruko Taman Asri Blok I No.2,Larangan","region":"JABODETABEK","province":"BANTEN","city":"KOTA TANGERANG","district":"LARANGAN","zipCode":15151,"status":"Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.236641,"longitude":106.730448,"goLiveDate":"2025-07-17","notes":null,"phone":87722724806,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B5006', 'PALEM SEMI', 'DTS', 'Jl. Palem Raja, Komplek Ruko Barcelona No.75, Kel. Cibodas', 'JABODETABEK',
  'BANTEN', 'KOTA TANGERANG', 'CIBODAS', '15138', 'Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.221548, 106.613463,
  '2025-08-14', '8175200134', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"B5006","name":"PALEM SEMI","origin":"DTS","address":"Jl. Palem Raja, Komplek Ruko Barcelona No.75, Kel. Cibodas","region":"JABODETABEK","province":"BANTEN","city":"KOTA TANGERANG","district":"CIBODAS","zipCode":15138,"status":"Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.221548,"longitude":106.613463,"goLiveDate":"2025-08-14","notes":null,"phone":8175200134,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B5008', 'TAMAN ROYAL', 'DTS', 'Ruko Taman Royal Ruko Permata Niaga 3 No.3', 'JABODETABEK',
  'BANTEN', 'KOTA TANGERANG', 'TANGERANG', '15141', 'Aktif',
  'LINDA APRILIA (LAA)', 'JANE SARA AGUSTINA (JSA)', -6.175329, 106.65692,
  '2025-07-30', '87722724805', '09:00–22:00',
  null, 'Store', null,
  '09:00', '22:00', '{"storeCode":"B5008","name":"TAMAN ROYAL","origin":"DTS","address":"Ruko Taman Royal Ruko Permata Niaga 3 No.3","region":"JABODETABEK","province":"BANTEN","city":"KOTA TANGERANG","district":"TANGERANG","zipCode":15141,"status":"Aktif","areaCoordinator":"LINDA APRILIA (LAA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.175329,"longitude":106.65692,"goLiveDate":"2025-07-30","notes":null,"phone":87722724805,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"22:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A4001', 'BUDI RAYA', 'Ex. LWS', 'Jl. Budi Raya No.3B RT.1/RW.9, Kemanggisan', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA BARAT', 'PAL MERAH', '11480', 'Non-Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.192855, 106.7823905,
  '2024-10-18', '87722724804', '09:00–21:00',
  '2026-02-11', 'Store', null,
  '09:00', '21:00', '{"storeCode":"A4001","name":"BUDI RAYA","origin":"Ex. LWS","address":"Jl. Budi Raya No.3B RT.1/RW.9, Kemanggisan","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA BARAT","district":"PAL MERAH","zipCode":11480,"status":"Non-Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.192855,"longitude":106.7823905,"goLiveDate":"2024-10-18","notes":null,"phone":87722724804,"closedDate":"2026-02-11","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A4002', 'KENCANA', 'Ex. LWS', 'Jl. Pluit Kencana Raya No.88 4, RT.4/RW.6, Pluit', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA UTARA', 'PENJARINGAN', '14450', 'Non-Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.1212262, 106.7879998,
  '2024-10-18', null, '09:00–21:00',
  '2025-07-16', 'Store', null,
  '09:00', '21:00', '{"storeCode":"A4002","name":"KENCANA","origin":"Ex. LWS","address":"Jl. Pluit Kencana Raya No.88 4, RT.4/RW.6, Pluit","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA UTARA","district":"PENJARINGAN","zipCode":14450,"status":"Non-Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.1212262,"longitude":106.7879998,"goLiveDate":"2024-10-18","notes":null,"phone":null,"closedDate":"2025-07-16","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A4003', 'KEBON JERUK', 'Ex. LWS', 'KOMP. TAMAN RATU INDAH BLOK D.11 NO. 24A-24B RT. 009/013 KEL. DURI KEPA', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA BARAT', 'KEBON JERUK', '11510', 'Non-Aktif',
  'LINDA APRILIA (LAA)', 'JANE SARA AGUSTINA (JSA)', -6.1695044, 106.7689766,
  '2024-12-24', '87722724818', '09:00–21:00',
  '2026-04-27', 'Store', null,
  '09:00', '21:00', '{"storeCode":"A4003","name":"KEBON JERUK","origin":"Ex. LWS","address":"KOMP. TAMAN RATU INDAH BLOK D.11 NO. 24A-24B RT. 009/013 KEL. DURI KEPA","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA BARAT","district":"KEBON JERUK","zipCode":11510,"status":"Non-Aktif","areaCoordinator":"LINDA APRILIA (LAA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.1695044,"longitude":106.7689766,"goLiveDate":"2024-12-24","notes":null,"phone":87722724818,"closedDate":"2026-04-27","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A4004', 'KUNINGAN', 'Ex. LWS', 'JL. GURU MUGNI NO 12 RT 001 RW 005, KUNINGAN TIMUR-SETIA', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA SELATAN', 'SETIABUDI', '12950', 'Non-Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.2300779, 106.8216768,
  '2024-12-19', '87722724823', '09:00–21:00',
  '2025-11-25', 'Store', null,
  '09:00', '21:00', '{"storeCode":"A4004","name":"KUNINGAN","origin":"Ex. LWS","address":"JL. GURU MUGNI NO 12 RT 001 RW 005, KUNINGAN TIMUR-SETIA","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA SELATAN","district":"SETIABUDI","zipCode":12950,"status":"Non-Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.2300779,"longitude":106.8216768,"goLiveDate":"2024-12-19","notes":null,"phone":87722724823,"closedDate":"2025-11-25","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4004', 'SETIABUDI', 'Ex. LWS', 'Jl. Dr. Setiabudi No.49, Pasteur', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'SUKAJADI', '40161', 'Non-Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.8803294, 107.5985517,
  '2024-10-25', null, '09:00–21:00',
  '2025-06-16', 'Store', null,
  '09:00', '21:00', '{"storeCode":"C4004","name":"SETIABUDI","origin":"Ex. LWS","address":"Jl. Dr. Setiabudi No.49, Pasteur","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"SUKAJADI","zipCode":40161,"status":"Non-Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.8803294,"longitude":107.5985517,"goLiveDate":"2024-10-25","notes":null,"phone":null,"closedDate":"2025-06-16","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4005', 'ASTANA', 'Ex. LWS', 'Jl. Astana Anyar Kel No.68, RT.11/RW.12, Cibadak', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'ASTANA ANYAR', '40241', 'Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.9227208, 107.5984599,
  '2024-10-25', '87722724795', '09:00–22:00',
  null, 'Store', null,
  '09:00', '22:00', '{"storeCode":"C4005","name":"ASTANA","origin":"Ex. LWS","address":"Jl. Astana Anyar Kel No.68, RT.11/RW.12, Cibadak","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"ASTANA ANYAR","zipCode":40241,"status":"Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9227208,"longitude":107.5984599,"goLiveDate":"2024-10-25","notes":null,"phone":87722724795,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"22:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4006', 'VETERAN', 'Ex. LWS', 'Jl. Veteran No.40, Kb. Pisang', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'SUMUR BANDUNG', '40112', 'Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.91941, 107.6153423,
  '2024-10-25', '87722724796', '13:00–21:00',
  null, 'Store', 'Office Hub',
  '13:00', '21:00', '{"storeCode":"C4006","name":"VETERAN","origin":"Ex. LWS","address":"Jl. Veteran No.40, Kb. Pisang","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"SUMUR BANDUNG","zipCode":40112,"status":"Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.91941,"longitude":107.6153423,"goLiveDate":"2024-10-25","notes":"Office Hub","phone":87722724796,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4008', 'JURANG PASTEUR', 'Ex. LWS', 'Jl. Jurang No.51B, Pasteur', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'SUKAJADI', '40161', 'Non-Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.887605, 107.6004044,
  '2024-10-25', '85966715459', '09:00–21:00',
  '2026-09-24', 'Store', 'Tutup toko',
  '09:00', '21:00', '{"storeCode":"C4008","name":"JURANG PASTEUR","origin":"Ex. LWS","address":"Jl. Jurang No.51B, Pasteur","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"SUKAJADI","zipCode":40161,"status":"Non-Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.887605,"longitude":107.6004044,"goLiveDate":"2024-10-25","notes":"Tutup toko","phone":85966715459,"closedDate":"2026-09-24","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5010', 'PELAJAR PEJUANG 45', 'DTS', 'Jl. Pelajar Pejuang 45 No.102, Turangga', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'LENGKONG', '40263', 'Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.956536, 107.661984,
  '2025-06-05', '81944219563', '13:00–21:00',
  null, 'Store', null,
  '13:00', '21:00', '{"storeCode":"C5010","name":"PELAJAR PEJUANG 45","origin":"DTS","address":"Jl. Pelajar Pejuang 45 No.102, Turangga","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"LENGKONG","zipCode":40263,"status":"Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.956536,"longitude":107.661984,"goLiveDate":"2025-06-05","notes":null,"phone":81944219563,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5011', 'PLUTO', 'DTS', 'Jl. Pluto Raya No.35E, Margasari', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'BUAHBATU', '40286', 'Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.956538, 107.661984,
  '2025-06-05', '81944219564', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C5011","name":"PLUTO","origin":"DTS","address":"Jl. Pluto Raya No.35E, Margasari","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"BUAHBATU","zipCode":40286,"status":"Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.956538,"longitude":107.661984,"goLiveDate":"2025-06-05","notes":null,"phone":81944219564,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5012', 'CIJAGRA', 'DTS', 'JL Cijagra 1 No.63 RT 006 RW 003, Cijagra', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'LENGKONG', '40383', 'Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.948088, 107.626105,
  '2025-06-20', '87722724813', '13:00–21:00',
  null, 'Store', null,
  '13:00', '21:00', '{"storeCode":"C5012","name":"CIJAGRA","origin":"DTS","address":"JL Cijagra 1 No.63 RT 006 RW 003, Cijagra","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"LENGKONG","zipCode":40383,"status":"Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.948088,"longitude":107.626105,"goLiveDate":"2025-06-20","notes":null,"phone":87722724813,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5013', 'HARMONY', 'DTS', 'Ruko Harmony Park No.4 Jl Ciwanstra No. 86, Margahayu Endah', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'RANCASARI', '40225', 'Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.9609339, 107.6647745,
  '2025-06-21', '87722724824', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C5013","name":"HARMONY","origin":"DTS","address":"Ruko Harmony Park No.4 Jl Ciwanstra No. 86, Margahayu Endah","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"RANCASARI","zipCode":40225,"status":"Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9609339,"longitude":107.6647745,"goLiveDate":"2025-06-21","notes":null,"phone":87722724824,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5014', 'TKI 3', 'DTS', 'Taman Kopo Indah 3 No F12 A Marga Asih Bandung', 'BANDUNG',
  'JAWA BARAT', 'KABUPATEN BANDUNG', 'MARGAASIH', '40351', 'Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.966915, 107.5535236,
  '2025-06-24', '81949873164', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C5014","name":"TKI 3","origin":"DTS","address":"Taman Kopo Indah 3 No F12 A Marga Asih Bandung","region":"BANDUNG","province":"JAWA BARAT","city":"KABUPATEN BANDUNG","district":"MARGAASIH","zipCode":40351,"status":"Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.966915,"longitude":107.5535236,"goLiveDate":"2025-06-24","notes":null,"phone":81949873164,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5015', 'KOPO PERMAI 3', 'DTS', 'Ruko Kopo Permai F8 No.7 Bandung', 'BANDUNG',
  'JAWA BARAT', 'KABUPATEN BANDUNG', 'DEYEUHKOLOT', '40227', 'Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.9646478, 107.5893185,
  '2025-06-24', '87722724827', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C5015","name":"KOPO PERMAI 3","origin":"DTS","address":"Ruko Kopo Permai F8 No.7 Bandung","region":"BANDUNG","province":"JAWA BARAT","city":"KABUPATEN BANDUNG","district":"DEYEUHKOLOT","zipCode":40227,"status":"Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9646478,"longitude":107.5893185,"goLiveDate":"2025-06-24","notes":null,"phone":87722724827,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5016', 'ISTANA SUDIRMAN', 'DTS', 'Jl. Bukit Jarian No.12, Ruko Istana Sudirman Residen, Cibuntu', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'BANDUNG KULON', '40213', 'Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.923417, 107.568278,
  '2025-07-24', '87700293365', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C5016","name":"ISTANA SUDIRMAN","origin":"DTS","address":"Jl. Bukit Jarian No.12, Ruko Istana Sudirman Residen, Cibuntu","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"BANDUNG KULON","zipCode":40213,"status":"Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.923417,"longitude":107.568278,"goLiveDate":"2025-07-24","notes":null,"phone":87700293365,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5017', 'CIJAMBE', 'DTS', 'Jl. Cijambe No 49 RT 02 RW 06, Pasir Endah', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'UJUNGBERUNG', '41286', 'Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.906222, 107.691629,
  '2025-07-25', '87700293366', '09:00–22:00',
  null, 'Store', null,
  '09:00', '22:00', '{"storeCode":"C5017","name":"CIJAMBE","origin":"DTS","address":"Jl. Cijambe No 49 RT 02 RW 06, Pasir Endah","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"UJUNGBERUNG","zipCode":41286,"status":"Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.906222,"longitude":107.691629,"goLiveDate":"2025-07-25","notes":null,"phone":87700293366,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"22:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5001', 'CBD CIBUBUR', 'DTS', 'Citra Grand Cibubur CBD, Ruko Lagoon blok ER02 No.06, RT.002/RW.003, Jatirangga', 'JABODETABEK',
  'JAWA BARAT', 'KOTA BEKASI', 'JATISAMPURNA', '17434', 'Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.3669795, 106.9403883,
  '2025-08-21', '8175200141', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C5001","name":"CBD CIBUBUR","origin":"DTS","address":"Citra Grand Cibubur CBD, Ruko Lagoon blok ER02 No.06, RT.002/RW.003, Jatirangga","region":"JABODETABEK","province":"JAWA BARAT","city":"KOTA BEKASI","district":"JATISAMPURNA","zipCode":17434,"status":"Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.3669795,"longitude":106.9403883,"goLiveDate":"2025-08-21","notes":null,"phone":8175200141,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5003', 'CANADIAN CIBUBUR', 'DTS', 'Kota Wisata Ruko Canadian , Blok CBE no. 17 kelurahan Limusnunggal', 'JABODETABEK',
  'JAWA BARAT', 'KABUPATEN BOGOR', 'CILEUNGSI', '16820', 'Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.366588, 106.967653,
  '2025-03-14', '81944220051', '09:00–22:00',
  null, 'Store', null,
  '09:00', '22:00', '{"storeCode":"C5003","name":"CANADIAN CIBUBUR","origin":"DTS","address":"Kota Wisata Ruko Canadian , Blok CBE no. 17 kelurahan Limusnunggal","region":"JABODETABEK","province":"JAWA BARAT","city":"KABUPATEN BOGOR","district":"CILEUNGSI","zipCode":16820,"status":"Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.366588,"longitude":106.967653,"goLiveDate":"2025-03-14","notes":null,"phone":81944220051,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"22:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C5004', 'PERMATA CIBUBUR', 'DTS', 'Jalan Raya Permata Cibubur F.5 no.6 ,Cilengsi kidul', 'JABODETABEK',
  'JAWA BARAT', 'KABUPATEN BOGOR', 'CILEUNGSI', '16820', 'Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.41183, 106.96559,
  '2025-04-17', '81944214740', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C5004","name":"PERMATA CIBUBUR","origin":"DTS","address":"Jalan Raya Permata Cibubur F.5 no.6 ,Cilengsi kidul","region":"JABODETABEK","province":"JAWA BARAT","city":"KABUPATEN BOGOR","district":"CILEUNGSI","zipCode":16820,"status":"Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.41183,"longitude":106.96559,"goLiveDate":"2025-04-17","notes":null,"phone":81944214740,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D4002', 'LAMPER', 'Ex. LWS', 'Jl. Lamper Tengah No.168 A-B, Pandean Lamper', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'GAYAMSARI', '50248', 'Non-Aktif',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -7.0070604, 110.4426432,
  '2024-11-01', '87722724832', '13:00–21:00',
  '2026-08-03', 'Store', null,
  '13:00', '21:00', '{"storeCode":"D4002","name":"LAMPER","origin":"Ex. LWS","address":"Jl. Lamper Tengah No.168 A-B, Pandean Lamper","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"GAYAMSARI","zipCode":50248,"status":"Non-Aktif","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.0070604,"longitude":110.4426432,"goLiveDate":"2024-11-01","notes":null,"phone":87722724832,"closedDate":"2026-08-03","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D4003', 'KEDUNGMUNDU', 'Ex. LWS', 'Jl. Fatmawati No.3, Kedungmundu', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'TEMBALANG', '50246', 'Non-Aktif',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -7.0184173, 110.4710842,
  '2024-11-01', '87722724833', '13:00–21:00',
  '2026-08-04', 'Store', null,
  '13:00', '21:00', '{"storeCode":"D4003","name":"KEDUNGMUNDU","origin":"Ex. LWS","address":"Jl. Fatmawati No.3, Kedungmundu","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"TEMBALANG","zipCode":50246,"status":"Non-Aktif","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.0184173,"longitude":110.4710842,"goLiveDate":"2024-11-01","notes":null,"phone":87722724833,"closedDate":"2026-08-04","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D4004', 'ANGGREK', 'Ex. LWS', 'Jl. Anggrek Raya No. 4 ( belakang Gajah Mada-Mall Citraland, samping anggrek residence ), Pekunden', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'SEMARANG TENGAH', '50134', 'Non-Aktif',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -6.9879763, 110.4237947,
  '2024-11-01', '87722724834', '13:00–21:00',
  '2026-09-08', 'Store', 'Office Hub',
  '13:00', '21:00', '{"storeCode":"D4004","name":"ANGGREK","origin":"Ex. LWS","address":"Jl. Anggrek Raya No. 4 ( belakang Gajah Mada-Mall Citraland, samping anggrek residence ), Pekunden","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"SEMARANG TENGAH","zipCode":50134,"status":"Non-Aktif","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9879763,"longitude":110.4237947,"goLiveDate":"2024-11-01","notes":"Office Hub","phone":87722724834,"closedDate":"2026-09-08","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'F5001', 'NORTHWEST', 'DTS', 'Ruko Northwest Boulevard NV2 No.53, Babat Jerawat', 'SURABAYA',
  'JAWA TIMUR', 'KOTA SURABAYA', 'PAKAL', '60197', 'Aktif',
  'VETTY RUBILLYA KUSNANDAR (VRR)', 'JANE SARA AGUSTINA (JSA)', -7.25494, 112.62454,
  '2025-08-27', '8175200139', '13:00–21:00',
  null, 'Store', null,
  '13:00', '21:00', '{"storeCode":"F5001","name":"NORTHWEST","origin":"DTS","address":"Ruko Northwest Boulevard NV2 No.53, Babat Jerawat","region":"SURABAYA","province":"JAWA TIMUR","city":"KOTA SURABAYA","district":"PAKAL","zipCode":60197,"status":"Aktif","areaCoordinator":"VETTY RUBILLYA KUSNANDAR (VRR)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.25494,"longitude":112.62454,"goLiveDate":"2025-08-27","notes":null,"phone":8175200139,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B4002', 'PUSTEK', 'Ex. LWS', 'Jl. Raya Puspitek NO.48, Buaran', 'JABODETABEK',
  'BANTEN', 'KOTA TANGERANG SELATAN', 'SERPONG', '15310', 'Non-Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.346915, 106.692808,
  '2024-10-18', '81913580778', '12:00–21:00',
  '2026-07-10', 'Store', null,
  '12:00', '21:00', '{"storeCode":"B4002","name":"PUSTEK","origin":"Ex. LWS","address":"Jl. Raya Puspitek NO.48, Buaran","region":"JABODETABEK","province":"BANTEN","city":"KOTA TANGERANG SELATAN","district":"SERPONG","zipCode":15310,"status":"Non-Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.346915,"longitude":106.692808,"goLiveDate":"2024-10-18","notes":null,"phone":81913580778,"closedDate":"2026-07-10","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"12:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4002', 'TARUMA', 'Ex. LWS', 'RUKO GRAND TARUMA, Jl. Darmawangsa Blok HW 25, Sukamakmur', 'JABODETABEK',
  'JAWA BARAT', 'KABUPATEN KARAWANG', 'TELUKJAMBE TIMUR', '41361', 'Aktif',
  'LINDA APRILIA (LAA)', 'JANE SARA AGUSTINA (JSA)', -6.3069113, 107.278286,
  '2024-10-18', '87722724809', '09:00–21:00',
  null, 'Store', null,
  '09:00', '21:00', '{"storeCode":"C4002","name":"TARUMA","origin":"Ex. LWS","address":"RUKO GRAND TARUMA, Jl. Darmawangsa Blok HW 25, Sukamakmur","region":"JABODETABEK","province":"JAWA BARAT","city":"KABUPATEN KARAWANG","district":"TELUKJAMBE TIMUR","zipCode":41361,"status":"Aktif","areaCoordinator":"LINDA APRILIA (LAA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.3069113,"longitude":107.278286,"goLiveDate":"2024-10-18","notes":null,"phone":87722724809,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D4005', 'PLAMONGAN', 'Ex. LWS', 'Jl. Brigjen Sudiarto No. 158, Plamongan Sari', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'PEDURUNGAN', '50192', 'Aktif',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -7.0189274, 110.4928631,
  '2024-11-01', '87722724837', '13:00–21:00',
  null, 'Store', null,
  '13:00', '21:00', '{"storeCode":"D4005","name":"PLAMONGAN","origin":"Ex. LWS","address":"Jl. Brigjen Sudiarto No. 158, Plamongan Sari","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"PEDURUNGAN","zipCode":50192,"status":"Aktif","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.0189274,"longitude":110.4928631,"goLiveDate":"2024-11-01","notes":null,"phone":87722724837,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D4006', 'BONJOL', 'Ex. LWS', 'Jl. Imam Bonjol No.180H, Pendrikan Kidul', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'SEMARANG TENGAH', '50131', 'Non-Aktif',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -6.9788364, 110.4117044,
  '2024-11-01', '87722724838', '13:00–21:00',
  '2026-08-06', 'Store', null,
  '13:00', '21:00', '{"storeCode":"D4006","name":"BONJOL","origin":"Ex. LWS","address":"Jl. Imam Bonjol No.180H, Pendrikan Kidul","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"SEMARANG TENGAH","zipCode":50131,"status":"Non-Aktif","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9788364,"longitude":110.4117044,"goLiveDate":"2024-11-01","notes":null,"phone":87722724838,"closedDate":"2026-08-06","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4007', 'DUYUT', 'Ex. LWS', 'Jl. Cibaduyut Baru No.25, Cibaduyut', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'BOJONGLOA KIDUL', '40235', 'Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.9483971, 107.5945825,
  '2024-10-25', '87722724798', '09:00–22:00',
  null, 'Store', null,
  '09:00', '22:00', '{"storeCode":"C4007","name":"DUYUT","origin":"Ex. LWS","address":"Jl. Cibaduyut Baru No.25, Cibaduyut","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"BOJONGLOA KIDUL","zipCode":40235,"status":"Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9483971,"longitude":107.5945825,"goLiveDate":"2024-10-25","notes":null,"phone":87722724798,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"22:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-22 17:50","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B4001', 'GOLDEN', 'Ex. LWS', 'Jl. Raya Serpong Kilometer 7 No.27-28 Blok E, Golden Boulevard, Lengkong Karya', 'JABODETABEK',
  'BANTEN', 'KOTA TANGERANG SELATAN', 'SERPONG UTARA', '15310', 'Non-Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.2751932, 106.659808,
  '2024-10-18', '86544223344', '09:00–21:00',
  '2025-08-01', 'Store', null,
  '09:00', '21:00', '{"storeCode":"B4001","name":"GOLDEN","origin":"Ex. LWS","address":"Jl. Raya Serpong Kilometer 7 No.27-28 Blok E, Golden Boulevard, Lengkong Karya","region":"JABODETABEK","province":"BANTEN","city":"KOTA TANGERANG SELATAN","district":"SERPONG UTARA","zipCode":15310,"status":"Non-Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.2751932,"longitude":106.659808,"goLiveDate":"2024-10-18","notes":null,"phone":86544223344,"closedDate":"2025-08-01","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'B4003', 'CITRA', 'Ex. LWS', 'Setelah Kopi kenangan Citraland, Ruko PURI CITRALAND, Perum Taman Puri Indah ,Blok B1 no.1, Serang', 'JABODETABEK',
  'BANTEN', 'KOTA SERANG', 'SERANG', '42116', 'Non-Aktif',
  'ATIKA SARI FAUZI (ARZ)', 'JANE SARA AGUSTINA (JSA)', -6.1265464, 106.1394302,
  '2024-10-18', '87722724801', '09:00–21:00',
  '2026-04-23', 'Store', null,
  '09:00', '21:00', '{"storeCode":"B4003","name":"CITRA","origin":"Ex. LWS","address":"Setelah Kopi kenangan Citraland, Ruko PURI CITRALAND, Perum Taman Puri Indah ,Blok B1 no.1, Serang","region":"JABODETABEK","province":"BANTEN","city":"KOTA SERANG","district":"SERANG","zipCode":42116,"status":"Non-Aktif","areaCoordinator":"ATIKA SARI FAUZI (ARZ)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.1265464,"longitude":106.1394302,"goLiveDate":"2024-10-18","notes":null,"phone":87722724801,"closedDate":"2026-04-23","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D4007', 'KELUD', 'Ex. LWS', 'Jl. Kelud Raya 15 B , Petompon', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'GAJAHMUNGKUR', '50237', 'Non-Aktif',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -7.0034058, 110.4000887,
  '2024-11-01', '87722724841', '13:00–21:00',
  '2026-09-09', 'Store', null,
  '13:00', '21:00', '{"storeCode":"D4007","name":"KELUD","origin":"Ex. LWS","address":"Jl. Kelud Raya 15 B , Petompon","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"GAJAHMUNGKUR","zipCode":50237,"status":"Non-Aktif","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.0034058,"longitude":110.4000887,"goLiveDate":"2024-11-01","notes":null,"phone":87722724841,"closedDate":"2026-09-09","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A4005', 'KEBAYORAN', 'Ex. LWS', 'JL. WOLTER MONGINSIDI NO.64C', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA SELATAN', 'KEBAYORAN BARU', '12180', 'Non-Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.2391475, 106.8116261,
  '2025-01-13', '87821692590', '09:00–21:00',
  '2026-01-21', 'Store', null,
  '09:00', '21:00', '{"storeCode":"A4005","name":"KEBAYORAN","origin":"Ex. LWS","address":"JL. WOLTER MONGINSIDI NO.64C","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA SELATAN","district":"KEBAYORAN BARU","zipCode":12180,"status":"Non-Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.2391475,"longitude":106.8116261,"goLiveDate":"2025-01-13","notes":null,"phone":87821692590,"closedDate":"2026-01-21","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A4006', 'MUTIARA', 'Ex. LWS', 'PURI MUTIARA BLOK B JL GRIYA UTAMA LT 1-5 NO BD 23, SUNTER AGUNG', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA UTARA', 'TANJUNG PRIOK', '14350', 'Non-Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.1418066, 106.8545741,
  '2024-12-19', '8175200145', '09:00–21:00',
  '2025-11-18', 'Store', null,
  '09:00', '21:00', '{"storeCode":"A4006","name":"MUTIARA","origin":"Ex. LWS","address":"PURI MUTIARA BLOK B JL GRIYA UTAMA LT 1-5 NO BD 23, SUNTER AGUNG","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA UTARA","district":"TANJUNG PRIOK","zipCode":14350,"status":"Non-Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.1418066,"longitude":106.8545741,"goLiveDate":"2024-12-19","notes":null,"phone":8175200145,"closedDate":"2025-11-18","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A4007', 'PURI', 'Ex. LWS', 'JL. RAYA KELAPA HYBRIDA BLOK PE-18 NO 3, PEGANGSAAN DUA', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA UTARA', 'KELAPA GADING', '14250', 'Non-Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.1487508, 106.9135269,
  '2024-12-23', '8175200142', '09:00–21:00',
  '2025-12-08', 'Store', null,
  '09:00', '21:00', '{"storeCode":"A4007","name":"PURI","origin":"Ex. LWS","address":"JL. RAYA KELAPA HYBRIDA BLOK PE-18 NO 3, PEGANGSAAN DUA","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA UTARA","district":"KELAPA GADING","zipCode":14250,"status":"Non-Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.1487508,"longitude":106.9135269,"goLiveDate":"2024-12-23","notes":null,"phone":8175200142,"closedDate":"2025-12-08","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4001', 'RAFFLES', 'Ex. LWS', 'Raffles hills suarwood BLOK UB21, Jatikarya', 'JABODETABEK',
  'JAWA BARAT', 'KOTA BEKASI', 'JATISAMPURNA', '16454', 'Non-Aktif',
  'SILVIA GYNA (SGA)', 'JANE SARA AGUSTINA (JSA)', -6.3952761, 106.9000768,
  '2024-10-18', null, '09:00–21:00',
  '2025-07-07', 'Store', null,
  '09:00', '21:00', '{"storeCode":"C4001","name":"RAFFLES","origin":"Ex. LWS","address":"Raffles hills suarwood BLOK UB21, Jatikarya","region":"JABODETABEK","province":"JAWA BARAT","city":"KOTA BEKASI","district":"JATISAMPURNA","zipCode":16454,"status":"Non-Aktif","areaCoordinator":"SILVIA GYNA (SGA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.3952761,"longitude":106.9000768,"goLiveDate":"2024-10-18","notes":null,"phone":null,"closedDate":"2025-07-07","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4003', 'IBC', 'Ex. LWS', 'Plaza Ibcc, Jl. A. Yani Blok D3 No.11, Kacapiring', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'BATUNUNGGAL', '40114', 'Non-Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.9155905, 107.6336308,
  '2024-10-25', '85966715453', '13:00–21:00',
  '2026-06-26', 'Store', null,
  '13:00', '21:00', '{"storeCode":"C4003","name":"IBC","origin":"Ex. LWS","address":"Plaza Ibcc, Jl. A. Yani Blok D3 No.11, Kacapiring","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"BATUNUNGGAL","zipCode":40114,"status":"Non-Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9155905,"longitude":107.6336308,"goLiveDate":"2024-10-25","notes":null,"phone":85966715453,"closedDate":"2026-06-26","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C4009', 'KOPO', 'Ex. LWS', 'Jl. Raya Kopo 162-152, Babakan Asih', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'BOJONGLOA KALER', '40232', 'Non-Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.9337031, 107.596108,
  '2024-10-25', '87722724800', '09:00–21:00',
  '2026-04-01', 'Store', null,
  '09:00', '21:00', '{"storeCode":"C4009","name":"KOPO","origin":"Ex. LWS","address":"Jl. Raya Kopo 162-152, Babakan Asih","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"BOJONGLOA KALER","zipCode":40232,"status":"Non-Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.9337031,"longitude":107.596108,"goLiveDate":"2024-10-25","notes":null,"phone":87722724800,"closedDate":"2026-04-01","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'F5002', 'SUKOLILO', 'DTS', 'Jl. Raya Sukolilo Mulia No.A15, Eastern Park AB, Keputih', 'SURABAYA',
  'JAWA TIMUR', 'KOTA SURABAYA', 'SUKOLILO', '60111', 'Aktif',
  'VETTY RUBILLYA KUSNANDAR (VRR)', 'JANE SARA AGUSTINA (JSA)', -7.2939016, 112.8136423,
  '2025-08-27', '8175200137', '13:00–21:00',
  null, 'Store', null,
  '13:00', '21:00', '{"storeCode":"F5002","name":"SUKOLILO","origin":"DTS","address":"Jl. Raya Sukolilo Mulia No.A15, Eastern Park AB, Keputih","region":"SURABAYA","province":"JAWA TIMUR","city":"KOTA SURABAYA","district":"SUKOLILO","zipCode":60111,"status":"Aktif","areaCoordinator":"VETTY RUBILLYA KUSNANDAR (VRR)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.2939016,"longitude":112.8136423,"goLiveDate":"2025-08-27","notes":null,"phone":8175200137,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'F5003', 'BUKITMAS', 'DTS', 'Wisata Bukit Mas, Jl. Blok RH No.2, Lidah Wetan', 'SURABAYA',
  'JAWA TIMUR', 'KOTA SURABAYA', 'LAKARSANTRI', '60312', 'Aktif',
  'VETTY RUBILLYA KUSNANDAR (VRR)', 'JANE SARA AGUSTINA (JSA)', -7.31274, 112.66595,
  '2025-08-24', '8175200140', '13:00–21:00',
  null, 'Store', null,
  '13:00', '21:00', '{"storeCode":"F5003","name":"BUKITMAS","origin":"DTS","address":"Wisata Bukit Mas, Jl. Blok RH No.2, Lidah Wetan","region":"SURABAYA","province":"JAWA TIMUR","city":"KOTA SURABAYA","district":"LAKARSANTRI","zipCode":60312,"status":"Aktif","areaCoordinator":"VETTY RUBILLYA KUSNANDAR (VRR)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.31274,"longitude":112.66595,"goLiveDate":"2025-08-24","notes":null,"phone":8175200140,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'F5004', 'KETINTANG', 'DTS', 'Jl. Ketintang Baru III No.50E, Ruko "OP" Jalan Raya, Ketintang', 'SURABAYA',
  'JAWA TIMUR', 'KOTA SURABAYA', 'GAYUNGAN', '60231', 'Aktif',
  'VETTY RUBILLYA KUSNANDAR (VRR)', 'JANE SARA AGUSTINA (JSA)', -7.31707, 112.73026,
  '2025-08-22', '8175200136', '09:00–21:00',
  null, 'Store', 'Office Hub',
  '09:00', '21:00', '{"storeCode":"F5004","name":"KETINTANG","origin":"DTS","address":"Jl. Ketintang Baru III No.50E, Ruko \"OP\" Jalan Raya, Ketintang","region":"SURABAYA","province":"JAWA TIMUR","city":"KOTA SURABAYA","district":"GAYUNGAN","zipCode":60231,"status":"Aktif","areaCoordinator":"VETTY RUBILLYA KUSNANDAR (VRR)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-7.31707,"longitude":112.73026,"goLiveDate":"2025-08-22","notes":"Office Hub","phone":8175200136,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-09-22 03:15","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A5008', 'MUWARDI', 'DTS', 'Jl. Muwardi No.43 10, RT.10/RW.4, Grogol', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA BARAT', 'GROGOL PETAMBURAN', '11460', 'Aktif',
  'LINDA APRILIA (LAA)', 'JANE SARA AGUSTINA (JSA)', -6.162556, 106.790889,
  '2025-11-14', '87722724816', '13:00–21:00',
  null, 'Store', null,
  '13:00', '21:00', '{"storeCode":"A5008","name":"MUWARDI","origin":"DTS","address":"Jl. Muwardi No.43 10, RT.10/RW.4, Grogol","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA BARAT","district":"GROGOL PETAMBURAN","zipCode":11460,"status":"Aktif","areaCoordinator":"LINDA APRILIA (LAA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.162556,"longitude":106.790889,"goLiveDate":"2025-11-14","notes":null,"phone":87722724816,"closedDate":null,"storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"13:00","closeTime":"21:00","createdBy":"-","createdAt":"2025-11-18 02:22","updatedAt":"2026-10-19 10:55","approvedBy":"-","approvedAt":null}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A6001', 'BENHIL', 'DTS', 'Jl. Bendungan Hilir No.98, RT.12/RW.4, Bendungan Hilir', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA PUSAT', 'TANAH ABANG', '10210', 'Aktif',
  'LINDA APRILIA (LAA)', 'JANE SARA AGUSTINA (JSA)', -6.2062271, 106.809877,
  '2026-05-22', '817580131', '09:00–21:00',
  null, 'Vape Box', null,
  '09:00', '21:00', '{"storeCode":"A6001","name":"BENHIL","origin":"DTS","address":"Jl. Bendungan Hilir No.98, RT.12/RW.4, Bendungan Hilir","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA PUSAT","district":"TANAH ABANG","zipCode":10210,"status":"Aktif","areaCoordinator":"LINDA APRILIA (LAA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.2062271,"longitude":106.809877,"goLiveDate":"2026-05-22","notes":null,"phone":817580131,"closedDate":null,"storeType":"Vape Box","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"NUR ALI YUSUP","createdAt":"2026-04-13 13:58","updatedAt":"2026-10-19 10:55","approvedBy":"NUR FUAD","approvedAt":"2026-05-21 11:04"}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'C6001', 'PASKAL', 'DTS', 'Jl. Kebon Jati No.179, Kebon Jeruk', 'BANDUNG',
  'JAWA BARAT', 'KOTA BANDUNG', 'ANDIR', '40181', 'Aktif',
  'SRI RATNASIH (SRH)', 'JANE SARA AGUSTINA (JSA)', -6.916475, 107.59441,
  '2026-10-19', '81944270999', '09:00–21:00',
  '2028-10-28', 'Store', null,
  '09:00', '21:00', '{"storeCode":"C6001","name":"PASKAL","origin":"DTS","address":"Jl. Kebon Jati No.179, Kebon Jeruk","region":"BANDUNG","province":"JAWA BARAT","city":"KOTA BANDUNG","district":"ANDIR","zipCode":40181,"status":"Aktif","areaCoordinator":"SRI RATNASIH (SRH)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.916475,"longitude":107.59441,"goLiveDate":"2026-10-19","notes":null,"phone":81944270999,"closedDate":"2028-10-28","storeType":"Store","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"NUR ALI YUSUP","createdAt":"2026-09-21 17:30","updatedAt":"2026-10-22 23:28","approvedBy":"NUR FUAD","approvedAt":"2026-10-13 09:52"}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'A6002', 'KEBON RAYA', 'DTS', 'Jl. Kebon Raya No.8, RT.8/RW.6, Duri Kepa', 'JABODETABEK',
  'DKI JAKARTA', 'KOTA ADM. JAKARTA BARAT', 'KEBON JERUK', '11510', 'Aktif',
  'LINDA APRILIA (LAA)', 'JANE SARA AGUSTINA (JSA)', -6.1836788, 106.7776457,
  '2026-10-23', '81944271999', '11:00–21:00',
  '2028-09-23', 'Vape Box', null,
  '11:00', '21:00', '{"storeCode":"A6002","name":"KEBON RAYA","origin":"DTS","address":"Jl. Kebon Raya No.8, RT.8/RW.6, Duri Kepa","region":"JABODETABEK","province":"DKI JAKARTA","city":"KOTA ADM. JAKARTA BARAT","district":"KEBON JERUK","zipCode":11510,"status":"Aktif","areaCoordinator":"LINDA APRILIA (LAA)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.1836788,"longitude":106.7776457,"goLiveDate":"2026-10-23","notes":null,"phone":81944271999,"closedDate":"2028-09-23","storeType":"Vape Box","relocationBuilding":"-","relocationGs":"-","openTime":"11:00","closeTime":"21:00","createdBy":"NUR ALI YUSUP","createdAt":"2026-09-21 17:46","updatedAt":"2026-10-23 00:30","approvedBy":"NUR FUAD","approvedAt":"2026-10-13 09:52"}'::jsonb
);
insert into stores (
  workspace_id, store_code, name, origin, address, region, province, city, district,
  zip_code, status, area_coordinator, area_manager, latitude, longitude,
  go_live_date, phone, open_hours, closed_date, store_type, notes, open_time, close_time, raw
) values (
  (select id from workspaces where slug = 'default'),
  'D6001', 'PROF SOEDARTO', 'DTS', 'Jl. Prof Soedarto No. 2A RT 05 RW 03, Kec. Tembalang , Kota Semarang, Jawa Tengah 50149', 'SEMARANG',
  'JAWA TENGAH', 'KOTA SEMARANG', 'SEMARANG BARAT', '50149', 'Waiting GO',
  'TRIAS MURTI RINANTO (TMO)', 'JANE SARA AGUSTINA (JSA)', -6.6433256, 107.2292191,
  '2026-10-29', null, '09:00–21:00',
  '2027-10-30', 'Vape Box', null,
  '09:00', '21:00', '{"storeCode":"D6001","name":"PROF SOEDARTO","origin":"DTS","address":"Jl. Prof Soedarto No. 2A RT 05 RW 03, Kec. Tembalang , Kota Semarang, Jawa Tengah 50149","region":"SEMARANG","province":"JAWA TENGAH","city":"KOTA SEMARANG","district":"SEMARANG BARAT","zipCode":50149,"status":"Waiting GO","areaCoordinator":"TRIAS MURTI RINANTO (TMO)","areaManager":"JANE SARA AGUSTINA (JSA)","latitude":-6.6433256,"longitude":107.2292191,"goLiveDate":"2026-10-29","notes":null,"phone":null,"closedDate":"2027-10-30","storeType":"Vape Box","relocationBuilding":"-","relocationGs":"-","openTime":"09:00","closeTime":"21:00","createdBy":"NUR ALI YUSUP","createdAt":"2026-09-21 17:51","updatedAt":"2026-10-23 11:00","approvedBy":"NUR FUAD","approvedAt":"2026-10-15 10:10"}'::jsonb
);
