import React from 'react';
import { Lock, RefreshCw, X, Plus, ShieldCheck } from 'lucide-react';

interface BrowserTabPreviewProps {
  iconUrl: string;
  tabTitle: string;
}

export const BrowserTabPreview: React.FC<BrowserTabPreviewProps> = ({
  iconUrl,
  tabTitle,
}) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900 transition-all">
      {/* Chrome Titlebar */}
      <div className="bg-slate-100 dark:bg-slate-950 px-4 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        {/* macOS window controls + Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500 inline-block"></span>
          </div>

          {/* Active Tab */}
          <div className="flex items-center gap-2 max-w-[220px] sm:max-w-xs px-3.5 py-1.5 rounded-t-xl bg-white dark:bg-slate-900 border-t border-x border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 shadow-sm relative -mb-[9px] z-10">
            {/* Favicon image */}
            <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt="Favicon preview"
                  className="w-4 h-4 object-contain rounded-xs"
                />
              ) : (
                <div className="w-4 h-4 rounded bg-slate-300 dark:bg-slate-700 animate-pulse" />
              )}
            </div>
            {/* Tab text */}
            <span className="truncate flex-1 font-sans">{tabTitle || 'My Awesome Website'}</span>
            <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer flex-shrink-0" />
          </div>

          {/* Secondary Inactive Tab */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 transition-colors">
            <span className="truncate max-w-[100px]">Documentation</span>
            <X className="w-3 h-3" />
          </div>

          {/* New Tab Plus */}
          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="px-4 py-2 bg-white dark:bg-slate-900 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-1.5 text-slate-400">
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <RefreshCw className="w-3 h-3 ml-0.5 cursor-pointer hover:rotate-180 transition-transform duration-500" />
        </div>

        {/* URL Pill */}
        <div className="flex-1 max-w-md mx-auto flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
          <Lock className="w-3 h-3 text-emerald-500" />
          <span className="text-slate-400 dark:text-slate-500">https://</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {tabTitle.toLowerCase().replace(/[^a-z0-9]/g, '') || 'mybrand'}.com
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
        </div>
      </div>
    </div>
  );
};

