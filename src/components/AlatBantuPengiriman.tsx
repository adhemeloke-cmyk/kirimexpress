import React, { useState } from 'react';
import { Wrench, Calculator, Copy, Check, Send, AlertCircle, Table, ChevronDown, ChevronUp, Building2, MapPin } from 'lucide-react';
import { OngkirRate } from '../types';
import { WAREHOUSE_ADDRESSES } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';
import {
  SHIPPING_ROUTES,
  calculateShippingRate,
  CalculationResult,
  TERNATE_SOFIFI_TABLE,
  JAKARTA_TERNATE_TABLE,
  JAKARTA_SOFIFI_TABLE,
} from '../data/shippingRates';

interface AlatBantuPengirimanProps {
  rates?: OngkirRate[];
}

export const AlatBantuPengiriman: React.FC<AlatBantuPengirimanProps> = () => {
  const { t, lang } = useLanguage();
  // Cek Ongkir State
  const [selectedRouteId, setSelectedRouteId] = useState('ternate-sofifi');
  const [packageType, setPackageType] = useState<'kg' | 'karung' | 'besar'>('kg');
  const [weightInput, setWeightInput] = useState('');
  const [karungCount, setKarungCount] = useState('1');
  const [showTableModal, setShowTableModal] = useState(false);
  const [activeTableTab, setActiveTableTab] = useState<'ternate-sofifi' | 'jakarta-ternate' | 'jakarta-sofifi'>('ternate-sofifi');

  const [calculatedResult, setCalculatedResult] = useState<{
    routeResult?: CalculationResult;
    packageType: 'kg' | 'karung' | 'besar';
    karungCountVal?: number;
  } | null>(null);

  // Label Alamat State
  const [selectedWarehouseKey, setSelectedWarehouseKey] = useState<'jakarta' | 'ternate'>('jakarta');
  const [labelName, setLabelName] = useState('');
  const [labelDestination, setLabelDestination] = useState('');
  const [labelPhone, setLabelPhone] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const activeWarehouse = WAREHOUSE_ADDRESSES[selectedWarehouseKey] || WAREHOUSE_ADDRESSES.jakarta;

  // Formatted Label Text
  const formattedLabelText = selectedWarehouseKey === 'jakarta'
    ? `PENERIMA :
Nama: ${labelName.trim() || '......'}
Tujuan: ${labelDestination.trim() || 'SOFIFI / TERNATE'}
HP: ${labelPhone.trim() || '......'}

ALAMAT JAKARTA:
Jl. Husein Sastranegara Ruko Lintas Timur No.5, RT.005/RW.8, Express, Kec. Benda, Kota Tangerang, Banten 15124
Telp: 0821-5046-568`
    : `PENERIMA :
Nama: ${labelName.trim() || '......'}
Tujuan: ${labelDestination.trim() || 'TERNATE'}
HP: ${labelPhone.trim() || '......'}

ALAMAT TERNATE:
Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel, RT 013 / RW 004, Kota Ternate, Maluku Utara
Gudang NK EXPRESS Ternate
Telp: 0821-5046-568`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(formattedLabelText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCalculateOngkir = (e: React.FormEvent) => {
    e.preventDefault();

    if (packageType === 'besar') {
      setCalculatedResult({
        packageType: 'besar',
      });
      return;
    }

    if (packageType === 'karung') {
      const count = parseInt(karungCount, 10) || 1;
      setCalculatedResult({
        packageType: 'karung',
        karungCountVal: count,
      });
      return;
    }

    // Per KG Calculation
    const w = parseFloat(weightInput) || 0;
    if (w <= 0) return;

    const routeRes = calculateShippingRate(selectedRouteId, w);
    setCalculatedResult({
      packageType: 'kg',
      routeResult: routeRes,
    });
  };

  const handleSendWAQuote = () => {
    if (!calculatedResult) return;
    const currentRoute = SHIPPING_ROUTES.find((r) => r.id === selectedRouteId) || SHIPPING_ROUTES[0];
    let detailText = '';

    if (calculatedResult.packageType === 'kg' && calculatedResult.routeResult) {
      const res = calculatedResult.routeResult;
      if (res.isAskCS) {
        detailText = `- Berat: ${res.weightInput} kg\n- Estimasi Ongkir: > 25 kg (Tanya / Konsultasi Admin CS)`;
      } else {
        detailText = `- Berat: ${res.weightInput} kg (${res.label})\n- Estimasi Ongkir: Rp ${(res.cost || 0).toLocaleString('id-ID')}`;
      }
    } else if (calculatedResult.packageType === 'karung') {
      const count = calculatedResult.karungCountVal || 1;
      detailText = `- Jumlah: ${count} Karung\n- Estimasi Ongkir: Rp ${(count * 100000).toLocaleString('id-ID')}`;
    } else {
      detailText = `- Jenis: Kargo Berukuran Besar / Volume Khusus`;
    }

    const text = `Halo Admin NK EXPRESS, saya mau tanya pengiriman:
- Rute: ${currentRoute.name}
${detailText}
Mohon info penyerahan paket dan jadwal pengiriman. Terima kasih!`;
    const url = `https://wa.me/628215046568?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="px-4 py-6 max-w-xl mx-auto space-y-6">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
        <Wrench className="w-5 h-5 text-red-600" />
        <span>{t('toolsTitle')}</span>
      </h3>

      {/* Sub-Card 1: Cek Ongkir Cepat */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center justify-between mb-3.5 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
            <Calculator className="w-4.5 h-4.5 text-red-600" />
            <span>{t('cekOngkirTitle')}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTableModal(!showTableModal)}
            className="text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Table className="w-3.5 h-3.5" />
            <span>{showTableModal ? 'Sembunyikan' : 'Lihat Tabel Tarif'}</span>
            {showTableModal ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Collapsible Complete Rate Tables */}
        {showTableModal && (
          <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in duration-200 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-xs text-slate-900">Tabel Rincian Tarif Resmi</span>
              <span className="text-[10px] text-slate-500">NK EXPRESS 2026</span>
            </div>

            {/* Route Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-200/80 p-1 rounded-lg text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTableTab('ternate-sofifi')}
                className={`py-1.5 px-1 rounded transition-colors ${
                  activeTableTab === 'ternate-sofifi' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Ternate → Sofifi
              </button>
              <button
                type="button"
                onClick={() => setActiveTableTab('jakarta-ternate')}
                className={`py-1.5 px-1 rounded transition-colors ${
                  activeTableTab === 'jakarta-ternate' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Jakarta → Ternate
              </button>
              <button
                type="button"
                onClick={() => setActiveTableTab('jakarta-sofifi')}
                className={`py-1.5 px-1 rounded transition-colors ${
                  activeTableTab === 'jakarta-sofifi' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Jakarta → Sofifi
              </button>
            </div>

            {/* Table Content */}
            <div className="max-h-56 overflow-y-auto text-xs space-y-1 pr-1 font-mono">
              {activeTableTab === 'ternate-sofifi' && (
                <div className="divide-y divide-slate-200/70">
                  {Object.entries(TERNATE_SOFIFI_TABLE).map(([kg, price]) => (
                    <div key={kg} className="py-1 flex justify-between text-slate-700">
                      <span>{kg === '1' ? '≤ 1 kg' : `${kg} kg`}</span>
                      <span className="font-bold text-slate-900">Rp {price.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div className="py-1 flex justify-between text-slate-700">
                    <span>18 – 25 kg</span>
                    <span className="font-bold text-slate-900">Rp 100.000</span>
                  </div>
                  <div className="py-1 flex justify-between text-red-600 font-bold">
                    <span>Lebih dari 25 kg</span>
                    <span>Tanya CS</span>
                  </div>
                </div>
              )}

              {activeTableTab === 'jakarta-ternate' && (
                <div className="divide-y divide-slate-200/70">
                  {Object.entries(JAKARTA_TERNATE_TABLE).map(([kg, price]) => (
                    <div key={kg} className="py-1 flex justify-between text-slate-700">
                      <span>{kg === '1' ? '≤ 1 kg' : `${kg} kg`}</span>
                      <span className="font-bold text-slate-900">Rp {price.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div className="py-1 flex justify-between text-slate-700">
                    <span>18 – 25 kg</span>
                    <span className="font-bold text-slate-900">Rp 20.000 / kg</span>
                  </div>
                  <div className="py-1 flex justify-between text-red-600 font-bold">
                    <span>Lebih dari 25 kg</span>
                    <span>Tanya CS</span>
                  </div>
                </div>
              )}

              {activeTableTab === 'jakarta-sofifi' && (
                <div className="divide-y divide-slate-200/70">
                  {Object.entries(JAKARTA_SOFIFI_TABLE).map(([kg, price]) => (
                    <div key={kg} className="py-1 flex justify-between text-slate-700">
                      <span>{kg === '1' ? '≤ 1 kg' : `${kg} kg`}</span>
                      <span className="font-bold text-slate-900">Rp {price.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div className="py-1 flex justify-between text-red-600 font-bold">
                    <span>Lebih dari 25 kg</span>
                    <span>Tanya CS</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleCalculateOngkir} className="space-y-3.5 text-left">
          {/* Route selector dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Pilih Rute Pengiriman
            </label>
            <select
              value={selectedRouteId}
              onChange={(e) => {
                setSelectedRouteId(e.target.value);
                setCalculatedResult(null);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition-all cursor-pointer font-bold"
            >
              {SHIPPING_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.description})
                </option>
              ))}
            </select>
          </div>

          {/* Type Selector Tabs */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t('packageTypeLabel')}
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => {
                  setPackageType('kg');
                  setCalculatedResult(null);
                }}
                className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                  packageType === 'kg'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('typeKg')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPackageType('karung');
                  setCalculatedResult(null);
                }}
                className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                  packageType === 'karung'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('typeKarung')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPackageType('besar');
                  setCalculatedResult(null);
                }}
                className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                  packageType === 'besar'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('typeBesar')}
              </button>
            </div>
          </div>

          {/* Conditional Inputs */}
          {packageType === 'kg' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {t('weightLabel')}
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weightInput}
                onChange={(e) => {
                  setWeightInput(e.target.value);
                  setCalculatedResult(null);
                }}
                placeholder="Masukkan berat dalam kg (Cth: 2 atau 12.5)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all font-medium"
              />
            </div>
          )}

          {packageType === 'karung' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Jumlah Karung (Rp 100.000 / karung)
              </label>
              <input
                type="number"
                min="1"
                value={karungCount}
                onChange={(e) => {
                  setKarungCount(e.target.value);
                  setCalculatedResult(null);
                }}
                placeholder="Jumlah karung (Cth: 1)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
              />
            </div>
          )}

          {packageType === 'besar' && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Barang Berukuran Besar / Volume Khusus</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Untuk kargo berukuran besar (misal: kasur, lemari, sepeda, mesin), biaya dihitung secara terpisah. Klik tombol di bawah untuk konsultasi langsung ke CS.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-red-500/20 active:scale-[0.99] transition-all cursor-pointer"
          >
            {t('calcBtn')}
          </button>
        </form>

        {/* Ongkir Calculation Result */}
        {calculatedResult && (
          <div className="mt-4 pt-3.5 border-t border-slate-200 text-left bg-slate-50 p-3.5 rounded-xl space-y-2 text-xs animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-600 font-medium">Rute:</span>
              <span className="font-bold text-slate-900">
                {SHIPPING_ROUTES.find((r) => r.id === selectedRouteId)?.name}
              </span>
            </div>

            {calculatedResult.packageType === 'kg' && calculatedResult.routeResult && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Input Berat:</span>
                  <span className="font-semibold text-slate-800">
                    {calculatedResult.routeResult.weightInput} kg ({calculatedResult.routeResult.roundedKg} kg dibulatkan)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Skema Berat:</span>
                  <span className="font-semibold text-red-600">{calculatedResult.routeResult.label}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-900">{t('estimatedCost')}:</span>
                  {calculatedResult.routeResult.isAskCS ? (
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                      Tanya CS (&gt; 25 kg)
                    </span>
                  ) : (
                    <span className="text-base font-extrabold text-red-600">
                      Rp {(calculatedResult.routeResult.cost || 0).toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </>
            )}

            {calculatedResult.packageType === 'karung' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Jumlah Karung:</span>
                  <span className="font-semibold text-slate-800">{calculatedResult.karungCountVal} Karung</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Skema Tarif:</span>
                  <span className="font-semibold text-red-600">Rp 100.000 / Karung</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-900">{t('estimatedCost')}:</span>
                  <span className="text-base font-extrabold text-red-600">
                    Rp {((calculatedResult.karungCountVal || 1) * 100000).toLocaleString('id-ID')}
                  </span>
                </div>
              </>
            )}

            {calculatedResult.packageType === 'besar' && (
              <div className="py-1 text-center">
                <p className="text-amber-800 font-semibold mb-1">Biaya Terpisah Sesuai Ukuran / Volume</p>
                <p className="text-[11px] text-slate-600">Silakan hubungi CS untuk pengukuran dimensi dan penawaran khusus.</p>
              </div>
            )}

            <button
              onClick={handleSendWAQuote}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Tanyakan / Pesan via WhatsApp</span>
            </button>
          </div>
        )}
      </div>

      {/* Sub-Card 2: Buat Label Alamat Jastip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-md">
        <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1 text-left">
          {t('jastipLabelTitle')}
        </h3>
        <p className="text-[11px] text-slate-500 text-left mb-3.5">
          {t('jastipLabelDesc')}
        </p>

        <div className="space-y-3 text-left">
          {/* Warehouse Selection Tab */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              {lang === 'zh' ? '选择集运仓地址:' : 'Pilih Lokasi Gudang NK EXPRESS:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedWarehouseKey('jakarta')}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                  selectedWarehouseKey === 'jakarta'
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Gudang Jakarta</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedWarehouseKey('ternate')}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                  selectedWarehouseKey === 'ternate'
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Gudang Ternate</span>
              </button>
            </div>
          </div>

          {/* Input Nama */}
          <div>
            <input
              type="text"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              placeholder="Nama (Cth: NK-Namamu)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Input Tujuan */}
          <div>
            <input
              type="text"
              value={labelDestination}
              onChange={(e) => setLabelDestination(e.target.value)}
              placeholder="Tujuan (Cth: SOFIFI / TERNATE)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Input HP */}
          <div>
            <input
              type="text"
              value={labelPhone}
              onChange={(e) => setLabelPhone(e.target.value)}
              placeholder="HP (Cth: 0821-5046-568)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Monospace Address Box */}
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 font-mono text-[11px] leading-relaxed text-slate-800 select-all whitespace-pre-line relative overflow-hidden">
            {formattedLabelText}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyAddress}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{t('copiedBtn')}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t('copyAddressBtn')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

