import React, { createContext, useContext, useState, useEffect } from 'react';

interface TranslationContextType {
  isAutoTranslateOn: boolean;
  toggleAutoTranslate: () => void;
  setIsAutoTranslateOn: (val: boolean) => void;
  t: (idText: string, zhText: string) => string;
}

const TranslationContext = createContext<TranslationContextType>({
  isAutoTranslateOn: false,
  toggleAutoTranslate: () => {},
  setIsAutoTranslateOn: () => {},
  t: (idText) => idText,
});

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAutoTranslateOn, setIsAutoTranslateOnState] = useState<boolean>(() => {
    const saved = localStorage.getItem('nk_auto_translate');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('nk_auto_translate', isAutoTranslateOn ? 'true' : 'false');
  }, [isAutoTranslateOn]);

  const toggleAutoTranslate = () => {
    setIsAutoTranslateOnState((prev) => !prev);
  };

  const setIsAutoTranslateOn = (val: boolean) => {
    setIsAutoTranslateOnState(val);
  };

  // Translation helper: if Auto Translate is ON, return Chinese string (or dual string if appropriate)
  const t = (idText: string, zhText: string): string => {
    if (!isAutoTranslateOn) return idText;
    return `${idText} (${zhText})`;
  };

  return (
    <TranslationContext.Provider
      value={{
        isAutoTranslateOn,
        toggleAutoTranslate,
        setIsAutoTranslateOn,
        t,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
