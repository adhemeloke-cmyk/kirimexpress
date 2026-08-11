import React from 'react';
import { Globe } from 'lucide-react';
import { NkExpressLogo } from './NkExpressLogo';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-xs">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
        {/* Brand logo & title */}
        <div className="flex items-center gap-2.5">
          <NkExpressLogo size="md" />
          <div>
            <h1 className="text-slate-900 font-extrabold text-base tracking-tight leading-none flex items-center gap-1.5">
              {t('appTitle')}
            </h1>
            <p className="text-[10px] font-bold text-red-600 tracking-wider uppercase mt-0.5">
              JAKARTA • TERNATE • SOFIFI
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher Toggle Button (ID <-> 中文) */}
          <button
            onClick={toggleLang}
            title={lang === 'id' ? 'Tukar ke Bahasa Mandarin (China)' : 'Tukar ke Bahasa Indonesia'}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer shadow-xs active:scale-95 ${
              lang === 'zh'
                ? 'bg-red-600 text-white border-red-700 shadow-red-600/20 ring-2 ring-red-500/30'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'id' ? '🇮🇩 ID' : '🇨🇳 中文'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};





