import React from 'react';
import { X, MapPin, Phone, Lock } from 'lucide-react';
import { WAREHOUSE_ADDRESS } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

interface QuickMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStaffModal: () => void;
}

export const QuickMenuModal: React.FC<QuickMenuModalProps> = ({ isOpen, onClose, onOpenStaffModal }) => {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-5 text-left text-slate-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-red-600" />
          <span>{lang === 'zh' ? '仓库地址与服务网络' : 'Lokasi Gudang & Fitur NKExpress'}</span>
        </h3>

        <div className="space-y-3 text-xs">
          {/* Gudang Ternate Box */}
          <div className="bg-slate-50 border border-red-200 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
              {lang === 'zh' ? '雅加达集运仓 Jakarta Warehouse' : 'Gudang Transit & Konsolidasi Utama'}
            </span>
            <h4 className="font-bold text-slate-900 text-sm mt-0.5">{WAREHOUSE_ADDRESS.name}</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              {WAREHOUSE_ADDRESS.fullAddress}
            </p>
            <p className="text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
              <Phone className="w-3 h-3 shrink-0" />
              <span>CS WhatsApp:{' '}</span>
              <a
                href={`https://wa.me/${WAREHOUSE_ADDRESS.rawPhone}?text=${encodeURIComponent('Halo NKExpress, saya ingin bertanya tentang layanan pengiriman paket.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-emerald-700 transition-colors cursor-pointer"
              >
                {WAREHOUSE_ADDRESS.phone}
              </a>
            </p>
          </div>

          {/* Lokasi Layanan */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'zh' ? '主要服务线路' : 'Lokasi Layanan Rute Utama'}
            </span>
            <ul className="space-y-1 text-slate-700">
              <li className="flex items-center justify-between">
                <span>📍 Jakarta</span>
                <span className="text-red-600 text-[10px] font-semibold">{lang === 'zh' ? '雅加达集运仓' : 'Gudang Transit & Konsolidasi'}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>📍 Ternate</span>
                <span className="text-emerald-700 text-[10px] font-semibold">{lang === 'zh' ? '总仓库' : 'Gudang Utama'}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>📍 Sofifi</span>
                <span className="text-slate-500 text-[10px]">{lang === 'zh' ? '索菲菲市区' : 'Pusat Kota Sofifi'}</span>
              </li>
            </ul>
          </div>

          {/* Staff Login Quick Button */}
          <button
            onClick={() => {
              onClose();
              onOpenStaffModal();
            }}
            className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'zh' ? '登录工作人员 Portal' : 'Login Staff / Admin Dashboard'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


