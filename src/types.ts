export interface TrackingStatusHistory {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

export interface PackageData {
  resi: string;
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  destination: string;
  weightKg: number;
  totalCost: number;
  status: 'Di Gudang Ternate' | 'Proses Muat Kapal' | 'Dalam Pelayaran' | 'Tiba di Port Tujuan' | 'Siap Diambil' | 'Selesai';
  shipName?: string;
  currentLocation: string;
  createdAt: string;
  estimatedArrival: string;
  history: TrackingStatusHistory[];
}

export interface ShipSchedule {
  id: string;
  shipName: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalEstimate: string;
  closingCargoDate: string;
  status: 'Akan Datang' | 'Buka Cargo' | 'Sedang Muat' | 'Berlayar' | 'Selesai';
  notes?: string;
}

export interface OngkirRate {
  destination: string;
  region: string;
  pricePerKg: number;
  minKg: number;
  estimatedDays: string;
  deliveryType: string;
}

export interface LabelAddressData {
  customerName: string;
  destinationCity: string;
  customerPhone: string;
}
