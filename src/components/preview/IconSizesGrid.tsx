import React from 'react';
import { GeneratedIcon } from '../../types/favicon';
import { Download, ExternalLink, Check } from 'lucide-react';
import { triggerDownload } from '../../utils/zipExporter';

interface IconSizesGridProps {
  icons: GeneratedIcon[];
  onDownloadIco?: () => void;
  hasIco?: boolean;
}

export const IconSizesGrid: React.FC<IconSizesGridProps> = ({
  icons,
  onDownloadIco,
  hasIco = true,
}) => {
  const [downloadedIndex, setDownloadedIndex] = React.useState<number | null>(null);

  const handleDownload = (icon: GeneratedIcon, index: number) => {
    triggerDownload(icon.blob, icon.name);
    setDownloadedIndex(index);
    setTimeout(() => setDownloadedIndex(null), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Generated File Resolutions</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-medium">
              {icons.length + (hasIco ? 1 : 0)} files
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pixel-perfect renders mapped to standard platform specifications.
          </p>
        </div>

        {/* ICO shortcut */}
        {hasIco && onDownloadIco && (
          <button
            onClick={onDownloadIco}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 hover:bg-brand-100 dark:bg-brand-950 dark:hover:bg-brand-900 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get favicon.ico</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {icons.map((icon, idx) => (
          <div
            key={icon.size}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-300 dark:hover:border-brand-700 transition-all shadow-sm flex flex-col justify-between group"
          >
            {/* Visual Icon Container */}
            <div className="w-full h-24 rounded-xl checkerboard flex items-center justify-center p-2 mb-2 relative overflow-hidden border border-slate-100 dark:border-slate-800">
              <img
                src={icon.dataUrl}
                alt={`${icon.size}x${icon.size}`}
                style={{
                  width: Math.min(icon.size, 64),
                  height: Math.min(icon.size, 64),
                  imageRendering: icon.size <= 32 ? 'pixelated' : 'auto',
                }}
                className="object-contain transition-transform group-hover:scale-110 drop-shadow-sm"
              />
              <span className="absolute top-1.5 right-1.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 shadow-xs border border-slate-200/50 dark:border-slate-700/50">
                {icon.size}×{icon.size}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-1 mb-2.5">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate font-mono">
                {icon.name}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {icon.description}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => handleDownload(icon, idx)}
              className="w-full py-1.5 px-2 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              {downloadedIndex === idx ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

