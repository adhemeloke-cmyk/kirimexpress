import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();

  const initialBotMsg = lang === 'zh'
    ? '您好！我是 NK EXPRESS AI 智能客服助手 🚢 请问有什么可以帮您？我可以解答运费计算、发航船期、仓库地址或代购转运流程。'
    : 'Halo! Saya Asisten AI NK EXPRESS 🚢 Ada yang ingin Anda tanyakan tentang tarif, jadwal pengiriman, alamat transit, atau cara jastip rute Ternate - Sofifi & Maluku Utara?';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: initialBotMsg,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentQuery }),
      });
      const data = await res.json();

      const defaultReply = lang === 'zh'
        ? '感谢您的咨询！如需人工协助，请直接联系 WhatsApp 客服：08215046568。'
        : 'Terima kasih telah bertanya! Silakan konsultasikan langsung dengan CS WhatsApp di 08215046568.';

      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || defaultReply,
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: lang === 'zh'
          ? '抱歉，网络连接异常。请通过 WhatsApp 08215046568 联系客服。'
          : 'Maaf, sambungan internet terputus. Silakan hubungi CS WhatsApp kami di 08215046568.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    setInput(q);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md h-[580px] flex flex-col overflow-hidden text-left shadow-2xl relative">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>{lang === 'zh' ? 'NK EXPRESS AI 智能助手' : 'Asisten AI NK EXPRESS'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h3>
              <p className="text-[10px] text-emerald-600 font-medium">Online • 24/7 Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-600 border border-red-200'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[80%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-red-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
              <Loader2 className="w-4 h-4 animate-spin text-red-600" />
              <span>{lang === 'zh' ? 'AI 正在思考回复中...' : 'Memproses jawaban AI...'}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[10px] whitespace-nowrap">
          <button
            onClick={() => handleQuickQuestion(lang === 'zh' ? '特尔纳特(Ternate)运费多少？' : 'Berapa ongkir ke Ternate?')}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer shadow-2xs"
          >
            {lang === 'zh' ? '查询运费' : 'Ongkir Ternate'}
          </button>
          <button
            onClick={() => handleQuickQuestion(lang === 'zh' ? '特尔纳特仓库地址在哪里？' : 'Di mana alamat gudang Ternate?')}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer shadow-2xs"
          >
            {lang === 'zh' ? '仓库地址' : 'Alamat Gudang'}
          </button>
          <button
            onClick={() => handleQuickQuestion(lang === 'zh' ? '如何使用 Shopee 转运服务？' : 'Bagaimana cara jastip Shopee?')}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer shadow-2xs"
          >
            {lang === 'zh' ? '转运流程' : 'Cara Jastip'}
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'zh' ? '输入您的问题...' : 'Tulis pertanyaan Anda...'}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

