import React from 'react';
import logoImg from '../assets/images/nkexpress_logo_1786021992780.jpg';

interface NkExpressLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const NkExpressLogo: React.FC<NkExpressLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const dimension = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 border-2 border-red-600 bg-white shadow-md flex items-center justify-center ${dimension} ${className}`}
    >
      <img
        src={logoImg}
        alt="NKExpress Logo"
        className="w-full h-full object-cover rounded-full"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback SVG if image loading fails
          const target = e.currentTarget;
          target.style.display = 'none';
        }}
      />
      {/* SVG Vector Fallback / Backdrop */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-0.5 absolute inset-0 pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="46" stroke="#E51920" strokeWidth="4" />
        {/* Top crescent */}
        <path d="M 20 52 C 25 22 75 22 80 30 C 65 20 30 30 20 52 Z" fill="#E51920" />
        {/* Bridge element with pillars */}
        <path d="M 32 52 C 45 32 75 32 88 56 C 75 42 45 42 32 52 Z" fill="#E51920" />
        <line x1="58" y1="39" x2="58" y2="46" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="66" y1="41" x2="66" y2="49" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="74" y1="44" x2="74" y2="52" stroke="#FFFFFF" strokeWidth="2" />
        {/* Ocean Waves */}
        <path d="M 20 60 C 40 50 60 70 85 58 C 70 72 40 60 20 60 Z" fill="#1E1E1E" />
        <path d="M 22 70 C 42 60 62 82 86 66 C 68 85 40 78 22 70 Z" fill="#1E1E1E" />
      </svg>
    </div>
  );
};
