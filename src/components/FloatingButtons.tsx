import React from 'react';
import { Bot, LayoutGrid, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingButtonsProps {
  onOpenAIChat: () => void;
  onOpenQuickMenu: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onOpenAIChat,
  onOpenQuickMenu,
}) => {
  const { lang } = useLanguage();

  const handleOpenWA = () => {
    const text = lang === 'zh'
      ? '您好 NKExpress 客服，我想咨询特尔纳特-索菲菲路线的转运与包裹运输服务。'
      : 'Halo Admin NKExpress, saya mau tanya pengiriman Jastip & Paket rute Ternate - Sofifi.';
    const url = `https://wa.me/628215046568?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3.5">
      {/* WhatsApp CS Button */}
      <div className="relative flex items-center group">
        {/* Hover Text Badge */}
        <span className="mr-2 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {lang === 'zh' ? '联系 WhatsApp 客服' : 'Chat CS WhatsApp'}
        </span>

        <button
          onClick={handleOpenWA}
          title={lang === 'zh' ? '联系 WhatsApp 客服' : 'Chat WhatsApp CS'}
          className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg active:scale-95 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-phone-glow"
        >
          {/* Animated Halo Ping Ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ring-ping pointer-events-none" />

          {/* Official WhatsApp SVG Icon with Ring Animation */}
          <svg className="w-6 h-6 animate-phone-ring relative z-10 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>

          {/* Online Dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20 shadow-xs" />
        </button>
      </div>

      {/* Grid Quick Menu Button */}
      <div className="relative flex items-center group">
        <span className="mr-2 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {lang === 'zh' ? '仓库地址与服务' : 'Menu & Lokasi Warehouse'}
        </span>

        <button
          onClick={onOpenQuickMenu}
          title={lang === 'zh' ? '仓库地址与服务' : 'Quick Menu & Lokasi'}
          className="w-11 h-11 rounded-full bg-white/95 hover:bg-slate-50 border border-slate-200/90 text-slate-700 flex items-center justify-center shadow-md active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <LayoutGrid className="w-4.5 h-4.5 text-slate-600" />
        </button>
      </div>

      {/* AI Assistant Button */}
      <div className="relative flex items-center group">
        {/* Hover / Permanent Floating AI Label Badge */}
        <span className="mr-2 px-2.5 py-1 text-[11px] font-extrabold text-rose-700 bg-white/95 backdrop-blur-md border border-rose-200 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500 animate-spark-rotate" />
          <span>{lang === 'zh' ? 'AI 智能客服' : 'Tanya AI CS'}</span>
        </span>

        <button
          onClick={onOpenAIChat}
          title={lang === 'zh' ? 'AI 智能客服' : 'Asisten AI CS NKExpress'}
          className="relative w-13 h-13 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 text-white flex items-center justify-center active:scale-95 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-ai-glow animate-float-subtle"
        >
          {/* Animated Halo Ping Ring */}
          <span className="absolute inset-0 rounded-full bg-rose-500/40 animate-ring-ping pointer-events-none" />

          {/* AI Bot Icon with Sparkles */}
          <div className="relative z-10 flex items-center justify-center">
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <Sparkles className="w-3.5 h-3.5 text-amber-200 absolute -top-1.5 -right-2 animate-spark-rotate" />
          </div>

          {/* Active Status Indicator */}
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full z-20 flex items-center justify-center shadow-xs">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </span>
        </button>
      </div>
    </div>
  );
};


