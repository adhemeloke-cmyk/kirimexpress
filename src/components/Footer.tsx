import React from 'react';
import { Phone, MapPin, ShieldCheck, Lock, UserCheck, Megaphone, ExternalLink } from 'lucide-react';
import { NkExpressLogo } from './NkExpressLogo';
import { useLanguage } from '../context/LanguageContext';
import { WAREHOUSE_ADDRESS } from '../data/initialData';

interface FooterProps {
  onOpenStaffModal: () => void;
  isLoggedInStaff: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStaffModal, isLoggedInStaff }) => {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 pt-10 pb-28 px-4 text-left text-xs text-slate-600">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Logo & Intro */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <NkExpressLogo size="sm" />
            <div>
              <h3 className="text-slate-900 font-extrabold text-base tracking-tight leading-none">
                {t('appTitle')}
              </h3>
              <p className="text-[10px] font-bold text-red-600 uppercase mt-0.5">
                JAKARTA • TERNATE • SOFIFI
              </p>
            </div>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md">
            {t('footerDesc')}
          </p>
        </div>

        {/* Lokasi Layanan */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            {lang === 'zh' ? '服务网络/仓库' : 'LOKASI LAYANAN'}
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 text-[11px] text-slate-700">
            <p className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Jakarta
            </p>
            <p className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Ternate
            </p>
            <p className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Sofifi
            </p>
          </div>
        </div>

        {/* Hubungi Kami */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            {t('contactUs')}
          </h4>
          <div className="space-y-1.5 text-[11px] text-slate-700">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                WhatsApp Admin:{' '}
                <a
                  href={`https://wa.me/${WAREHOUSE_ADDRESS.rawPhone}?text=${encodeURIComponent('Halo NK EXPRESS, saya ingin bertanya tentang layanan pengiriman paket.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-500 hover:underline transition-colors inline-flex items-center gap-1 cursor-pointer bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/80"
                >
                  {WAREHOUSE_ADDRESS.phone}
                </a>
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Megaphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {lang === 'zh' ? 'WhatsApp 官方频道: ' : 'Saluran WA: '}
                <a
                  href="https://whatsapp.com/channel/0029VbDNslx3WHTexh6hi83V"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-500 hover:underline transition-colors inline-flex items-center gap-1 cursor-pointer bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/80"
                >
                  {lang === 'zh' ? '点击关注频道' : 'Saluran WhatsApp NK EXPRESS'}
                  <ExternalLink className="w-3 h-3 text-emerald-600" />
                </a>
              </span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <span>{t('officeAddress')}</span>
            </p>
          </div>
        </div>

        {/* Copyright, Security & Discreet Staff Access */}
        <div className="pt-4 border-t border-slate-200/80 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p>© {new Date().getFullYear()} NK EXPRESS. {t('rights')}</p>

          <div className="flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600 shrink-0" /> {lang === 'zh' ? '安全正规物流' : 'Pengiriman Cepat & Resmi'}
            </span>

            {/* Discreet Staff Login Link */}
            <button
              onClick={onOpenStaffModal}
              className="text-slate-400 hover:text-slate-600 font-medium cursor-pointer transition-colors flex items-center gap-1 hover:underline"
            >
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{isLoggedInStaff ? (lang === 'zh' ? 'Staff 已登录' : 'Staff Active') : (lang === 'zh' ? '员工入口' : 'Login Staff')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


