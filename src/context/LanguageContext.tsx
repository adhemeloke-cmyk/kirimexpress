import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations['id']) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => translations.id[key] || (key as string),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('nk_lang');
    return (saved === 'zh' ? 'zh' : 'id') as Language;
  });

  useEffect(() => {
    localStorage.setItem('nk_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLangState((prev) => (prev === 'id' ? 'zh' : 'id'));
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = (key: keyof typeof translations['id']): string => {
    const dict = translations[lang] || translations.id;
    return dict[key] || translations.id[key] || (key as string);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
