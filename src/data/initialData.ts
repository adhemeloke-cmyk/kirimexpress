import { PackageData, ShipSchedule, OngkirRate } from '../types';

export const WAREHOUSE_ADDRESSES = {
  jakarta: {
    id: 'jakarta',
    title: 'Alamat Jakarta',
    titleZh: '雅加达/唐格朗集运仓',
    name: '',
    adminPhone: '0821-5046-568',
    phone: '0821-5046-568',
    rawPhone: '628215046568',
    street: 'Jl. Husein Sastranegara Ruko Lintas Timur No.5',
    subdistrict: 'RT.005/RW.8, Express',
    district: 'Kec. Benda',
    city: 'Kota Tangerang',
    province: 'Banten',
    postalCode: '15124',
    fullAddress: 'Jl. Husein Sastranegara Ruko Lintas Timur No.5, RT.005/RW.8, Express, Kec. Benda, Kota Tangerang, Banten 15124',
  },
  ternate: {
    id: 'ternate',
    title: 'Gudang Ternate',
    titleZh: '特尔纳特集运仓',
    name: 'Gudang NK EXPRESS Ternate',
    adminPhone: '0821-5046-568',
    phone: '0821-5046-568',
    rawPhone: '628215046568',
    street: 'Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel',
    subdistrict: 'RT 013 / RW 004',
    district: 'Ubo Ubo',
    city: 'Kota Ternate',
    province: 'Maluku Utara',
    postalCode: '',
    fullAddress: 'Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel, RT 013 / RW 004, Kota Ternate, Maluku Utara',
  },
};

export const WAREHOUSE_ADDRESS = WAREHOUSE_ADDRESSES.jakarta;

export const INITIAL_RATES: OngkirRate[] = [
  { destination: 'Jakarta', region: 'DKI Jakarta (Pusat Transit)', pricePerKg: 20000, minKg: 1, estimatedDays: '3 - 7 Hari', deliveryType: 'Kargo Laut' },
  { destination: 'Sofifi', region: 'Ibu Kota Prov. Maluku Utara', pricePerKg: 20000, minKg: 1, estimatedDays: '1 - 2 Hari', deliveryType: 'Express' },
  { destination: 'Ternate', region: 'Kota Ternate', pricePerKg: 20000, minKg: 1, estimatedDays: '1 - 2 Hari', deliveryType: 'Express' },
];

export const INITIAL_PACKAGES: PackageData[] = [
  {
    resi: 'NK-889102',
    senderName: 'Shopee Official Store',
    receiverName: 'Budi Santoso',
    receiverPhone: '0812-3456-7890',
    destination: 'Sofifi',
    weightKg: 12.5,
    totalCost: 81250,
    status: 'Dalam Pelayaran',
    shipName: 'KM Nggapulu',
    currentLocation: 'Laut Halmahera (Menuju Pelabuhan Sofifi)',
    createdAt: '2026-08-02 10:30',
    estimatedArrival: '2026-08-08',
    history: [
      { timestamp: '2026-08-02 10:30', status: 'Di Gudang Ternate', location: 'Gudang Ternate', description: 'Paket diterima dari ekspedisi lokal dan ditimbang' },
      { timestamp: '2026-08-03 14:00', status: 'Proses Muat Kapal', location: 'Pelabuhan Ternate', description: 'Paket dimasukkan ke karung manifest kargo laut' },
      { timestamp: '2026-08-04 09:15', status: 'Dalam Pelayaran', location: 'KM Nggapulu', description: 'Kapal bertolak via Ternate menuju Sofifi' },
    ]
  },
  {
    resi: 'NK-993821',
    senderName: 'TikTok Shop / Fashion Indo',
    receiverName: 'Siti Rahma',
    receiverPhone: '0852-9876-5432',
    destination: 'Sofifi',
    weightKg: 8,
    totalCost: 60000,
    status: 'Siap Diambil',
    shipName: 'KM Speedboat Express',
    currentLocation: 'Agen Cabang Sofifi',
    createdAt: '2026-07-28 16:20',
    estimatedArrival: '2026-08-05',
    history: [
      { timestamp: '2026-07-28 16:20', status: 'Di Gudang Ternate', location: 'Gudang Ternate', description: 'Paket masuk sistem NK EXPRESS' },
      { timestamp: '2026-07-30 08:00', status: 'Dalam Pelayaran', location: 'KM Dorolonda', description: 'Kapal berlayar ke destinasi tujuan' },
      { timestamp: '2026-08-04 11:30', status: 'Tiba di Port Tujuan', location: 'Pelabuhan Ternate / Sofifi', description: 'Bongkar muat kargo ke truk agen' },
      { timestamp: '2026-08-05 09:00', status: 'Siap Diambil', location: 'Agen Cabang Sofifi', description: 'Paket siap diambil, notifikasi WA telah dikirim' },
    ]
  },
  {
    resi: 'NK-100482',
    senderName: 'Toko Elektronik Online',
    receiverName: 'Ahmad Fauzi',
    receiverPhone: '0821-1122-3344',
    destination: 'Sofifi',
    weightKg: 15,
    totalCost: 85000,
    status: 'Di Gudang Ternate',
    currentLocation: 'Gudang Ternate',
    createdAt: '2026-08-05 15:45',
    estimatedArrival: '2026-08-13',
    history: [
      { timestamp: '2026-08-05 15:45', status: 'Di Gudang Ternate', location: 'Gudang Ternate', description: 'Paket diserahterimakan & verifikasi alamat NK EXPRESS' }
    ]
  }
];

export const INITIAL_SCHEDULES: ShipSchedule[] = [
  {
    id: 'sched-1',
    shipName: 'KM Speedboat Express 01',
    origin: 'Ternate',
    destination: 'Sofifi',
    departureDate: 'Setiap Hari (08:00 & 14:00 WIT)',
    arrivalEstimate: '1 Hari',
    closingCargoDate: 'Setiap Hari 17:00 WIT',
    status: 'Buka Cargo',
    notes: 'Dermaga Bastiong - Muatan karung sembako & dokumen kilat prioritas',
  },
  {
    id: 'sched-2',
    shipName: 'KM Nggapulu (Kargo Laut)',
    origin: 'Jakarta',
    destination: 'Ternate',
    departureDate: '15 Agustus 2026',
    arrivalEstimate: '5 - 7 Hari',
    closingCargoDate: '13 Agustus 2026 (18:00 WIB)',
    status: 'Buka Cargo',
    notes: 'Kargo kontainer laut transit Surabaya - Ternate. Menerima titipan belanjaan Shopee/TikTok',
  },
  {
    id: 'sched-3',
    shipName: 'KM Dorolonda (Terusan)',
    origin: 'Jakarta',
    destination: 'Sofifi',
    departureDate: '18 Agustus 2026',
    arrivalEstimate: '6 - 8 Hari',
    closingCargoDate: '16 Agustus 2026 (18:00 WIB)',
    status: 'Buka Cargo',
    notes: 'Muatan barang pecah belah wajib konfirmasi packing kayu ke admin gudang',
  },
];

