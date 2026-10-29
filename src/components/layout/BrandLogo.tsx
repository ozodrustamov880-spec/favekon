import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${iconSizes[size]} flex-shrink-0 transition-transform duration-200 hover:scale-105`}>
        <svg viewBox="0 0 512 512" fill="none" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="logoForgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="logoMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect x="32" y="32" width="448" height="448" rx="112" fill="url(#logoForgeGrad)" />
          <rect x="34" y="34" width="444" height="444" rx="110" stroke="white" strokeOpacity="0.25" strokeWidth="4" />
          <g transform="translate(116, 116)">
            {/* Base Anvil */}
            <path
              d="M40 210 C40 190, 60 170, 90 170 L190 170 C220 170, 240 190, 240 210 C240 226, 226 240, 210 240 L70 240 C54 240, 40 226, 40 210 Z"
              fill="url(#logoMetalGrad)"
            />
            {/* Forge Spark */}
            <polygon points="210,40 235,80 210,120 185,80" fill="#38BDF8" />
            {/* "F" Column */}
            <path
              d="M75 50 L160 50 C175 50, 185 60, 185 75 L185 85 C185 100, 175 110, 160 110 L125 110 L125 130 L155 130 C165 130, 172 137, 172 147 L172 153 C172 163, 165 170, 155 170 L75 170 C60 170, 50 158, 50 143 L50 77 C50 62, 60 50, 75 50 Z"
              fill="url(#logoMetalGrad)"
            />
          </g>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-extrabold tracking-tight text-slate-900 dark:text-white ${textSizes[size]}`}>
              Icon<span className="text-brand-600 dark:text-brand-400">Forge</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              v2.0
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

