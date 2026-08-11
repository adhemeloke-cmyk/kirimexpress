import React, { useState } from 'react';
import { Ship, RefreshCw, Anchor, ArrowRight } from 'lucide-react';
import { ShipSchedule } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface JadwalKapalProps {
  schedules: ShipSchedule[];
  onRefresh: () => void;
}

export const JadwalKapal: React.FC<JadwalKapalProps> = ({ schedules, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { t, lang } = useLanguage();

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <section className="px-4 py-6 max-w-xl mx-auto">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center gap-2 mb-4">
        <Ship className="w-5 h-5 text-red-600" />
        <span>{t('scheduleTitle')}</span>
      </h3>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-md relative overflow-hidden">
        {schedules && schedules.length > 0 ? (
          <div className="space-y-3 text-left">
            {schedules.map((s) => (
              <div key={s.id} className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 text-xs relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <Anchor className="w-4 h-4 text-red-600" />
                    {s.shipName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 border border-red-200 text-red-700">
                    {lang === 'zh' && s.status === 'Sesuai Jadwal' ? '准时发航' : s.status}
                  </span>
                </div>
                <div className="text-slate-700 space-y-1">
                  <p className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{t('route')}:</span>
                    <span className="font-semibold text-slate-800">{s.origin} <ArrowRight className="w-3 h-3 inline text-red-600" /> {s.destination}</span>
                  </p>
                  <p className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{t('departure')}:</span>
                    <span className="font-semibold text-emerald-600">{s.departureDate}</span>
                  </p>
                  <p className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">{lang === 'zh' ? '截单时间:' : 'Closing Cargo Gudang:'}</span>
                    <span className="font-semibold text-amber-700">{s.closingCargoDate}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <p className="text-xs sm:text-sm font-bold tracking-wider text-slate-500 uppercase">
              {lang === 'zh' ? '暂无发航船期计划。' : 'BELUM ADA JADWAL KAPAL YANG DIPUBLIKASIKAN.'}
            </p>

            <button
              onClick={handleRefreshClick}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-red-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{t('refreshBtn')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

