import React from 'react';
import { Wifi, Battery, Signal, Compass, Mail, Calendar, MessageSquare } from 'lucide-react';

interface MobileAppPreviewProps {
  iconUrl: string;
  brandName: string;
}

export const MobileAppPreview: React.FC<MobileAppPreviewProps> = ({
  iconUrl,
  brandName,
}) => {
  return (
    <div className="w-full max-w-[280px] mx-auto rounded-3xl border-4 border-slate-800 dark:border-slate-700 bg-slate-900 shadow-xl overflow-hidden p-3 text-white">
      {/* Top Phone Status bar */}
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 px-2 pt-0.5 pb-2">
        <span>9:41</span>
        <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto" />
        <div className="flex items-center gap-1">
          <Signal className="w-2.5 h-2.5" />
          <Wifi className="w-2.5 h-2.5" />
          <Battery className="w-3 h-3" />
        </div>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-4 gap-3 py-3 px-1">
        {/* User's Generated App */}
        <div className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-white/10 ring-2 ring-brand-500/50 p-0.5 bg-slate-800 transition-transform group-hover:scale-105">
            {iconUrl ? (
              <img src={iconUrl} alt="App icon" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="w-full h-full bg-brand-600 rounded-xl" />
            )}
          </div>
          <span className="text-[10px] font-medium truncate max-w-[54px] text-center text-slate-200">
            {brandName || 'App'}
          </span>
        </div>

        {/* Dummy App 1: Safari / Browser */}
        <div className="flex flex-col items-center gap-1 opacity-70">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] text-slate-300">Safari</span>
        </div>

        {/* Dummy App 2: Mail */}
        <div className="flex flex-col items-center gap-1 opacity-70">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center shadow">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] text-slate-300">Mail</span>
        </div>

        {/* Dummy App 3: Calendar */}
        <div className="flex flex-col items-center gap-1 opacity-70">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center shadow">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] text-slate-300">Calendar</span>
        </div>
      </div>

      {/* Dock Bar */}
      <div className="mt-4 pt-3 border-t border-white/10 flex justify-around px-2 pb-1">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center opacity-80">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center opacity-80">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center opacity-80">
          <Compass className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};
