import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WebsiteHeaderPreviewProps {
  iconUrl: string;
  brandName: string;
}

export const WebsiteHeaderPreview: React.FC<WebsiteHeaderPreviewProps> = ({
  iconUrl,
  brandName,
}) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all p-3.5">
      <div className="flex items-center justify-between">
        {/* Brand identity preview */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            {iconUrl ? (
              <img src={iconUrl} alt="Brand icon" className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
            )}
          </div>
          <span className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white">
            {brandName || 'BrandName'}
          </span>
        </div>

        {/* Dummy Navigation */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="text-slate-900 dark:text-white font-semibold">Products</span>
          <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Pricing</span>
          <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Docs</span>
        </div>

        {/* Dummy CTA */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-500 flex items-center gap-1 shadow-sm">
            <span>Get Started</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
