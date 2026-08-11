import React from 'react';
import { PackageData } from '../types';
import { X, Package, MapPin, Calendar, Clock, Ship, User, Truck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TrackingModalProps {
  packageData: PackageData | null;
  searchedResi: string;
  onClose: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ packageData, searchedResi, onClose }) => {
  const { t, lang } = useLanguage();

  if (!searchedResi) return null;

  const getStatusColor = (status: PackageData['status']) => {
    switch (status) {
      case 'Di Gudang Ternate':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Proses Muat Kapal':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Dalam Pelayaran':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Tiba di Port Tujuan':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'Siap Diambil':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 text-left text-slate-800 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {packageData ? (
          <div>
            {/* Header Badge & Resi */}
            <div className="flex items-start justify-between gap-3 pr-8 mb-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  {lang === 'zh' ? '运单号' : 'Nomor Resi'}
                </span>
                <h3 className="text-xl font-mono font-bold text-red-600 flex items-center gap-2">
                  <Package className="w-5 h-5 text-red-600" />
                  {packageData.resi}
                </h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(packageData.status)}`}>
                {packageData.status}
              </span>
            </div>

            {/* Package Summary Box */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs mb-4">
              <div>
                <p className="text-slate-500 text-[10px]">{lang === 'zh' ? '目的地' : 'Tujuan Pengiriman'}</p>
                <p className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-red-600" />
                  {packageData.destination}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px]">{lang === 'zh' ? '重量及预估运费' : 'Berat & Est. Biaya'}</p>
                <p className="font-bold text-slate-900 mt-0.5">
                  {packageData.weightKg} kg (Rp {packageData.totalCost.toLocaleString('id-ID')})
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px]">{lang === 'zh' ? '收货人' : 'Penerima'}</p>
                <p className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <User className="w-3 h-3 text-slate-400" />
                  {packageData.receiverName} ({packageData.receiverPhone})
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px]">{lang === 'zh' ? '运输船次' : 'Kapal / Armada'}</p>
                <p className="font-semibold text-red-600 flex items-center gap-1 mt-0.5">
                  <Ship className="w-3 h-3 text-red-600" />
                  {packageData.shipName || 'Proses Buka Cargo'}
                </p>
              </div>
            </div>

            {/* Current Status Box */}
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4 text-xs flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">{lang === 'zh' ? '当前位置/状态:' : 'Lokasi Terkini:'}</p>
                <p className="text-slate-700">{packageData.currentLocation}</p>
                <p className="text-[10px] text-red-700 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {lang === 'zh' ? '预计送达:' : 'Estimasi Sampai:'} {packageData.estimatedArrival}
                </p>
              </div>
            </div>

            {/* Tracking History Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                {lang === 'zh' ? '包裹物流轨迹 Timeline' : 'Riwayat Perjalanan Paket'}
              </h4>

              <div className="relative pl-5 border-l-2 border-red-200 space-y-4 text-xs">
                {packageData.history.map((hist, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Dot */}
                    <div className="absolute -left-[25px] top-0.5 w-3 h-3 rounded-full bg-red-600 border-2 border-white" />
                    <p className="text-[10px] text-red-600 font-mono font-semibold">{hist.timestamp}</p>
                    <p className="font-bold text-slate-900 mt-0.5">{hist.status} - <span className="text-red-700 font-normal">{hist.location}</span></p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{hist.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">{t('resiNotFound')}</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
              Resi <span className="font-mono text-red-600 font-bold">{searchedResi}</span> {lang === 'zh' ? '在系统中未找到登记信息。' : 'belum terdaftar di sistem. Silakan periksa kembali atau hubungi CS kami.'}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md"
            >
              {lang === 'zh' ? '关闭并重试' : 'Tutup & Coba Lagi'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

