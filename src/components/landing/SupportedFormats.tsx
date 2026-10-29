import React from 'react';
import { Check, Shield, Layers, Smartphone, Monitor } from 'lucide-react';

export const SupportedFormats: React.FC = () => {
  const formats = [
    {
      file: 'favicon.ico',
      dimensions: '16×16, 32×32, 48×48',
      format: 'ICO (Binary Stream)',
      platform: 'Legacy & Modern Browsers, Windows Desktop shortcuts',
      required: true,
    },
    {
      file: 'favicon-16x16.png',
      dimensions: '16×16 px',
      format: 'PNG (32-bit RGBA)',
      platform: 'Standard desktop browser tabs & bookmarks bar',
      required: true,
    },
    {
      file: 'favicon-32x32.png',
      dimensions: '32×32 px',
      format: 'PNG (32-bit RGBA)',
      platform: 'Retina & High-DPI browser tabs, taskbars',
      required: true,
    },
    {
      file: 'apple-touch-icon.png',
      dimensions: '180×180 px',
      format: 'PNG (Non-transparent)',
      platform: 'iOS Safari home screen web clips (iPhone / iPad)',
      required: true,
    },
    {
      file: 'android-chrome-192x192.png',
      dimensions: '192×192 px',
      format: 'PNG (32-bit RGBA)',
      platform: 'Android Chrome PWA launcher icon',
      required: true,
    },
    {
      file: 'android-chrome-512x512.png',
      dimensions: '512×512 px',
      format: 'PNG (32-bit RGBA)',
      platform: 'PWA splash screens, app store listings',
      required: true,
    },
    {
      file: 'site.webmanifest',
      dimensions: 'N/A',
      format: 'JSON Manifest',
      platform: 'Progressive Web App installation metadata',
      required: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            Platform Specifications
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Supported Formats & Standards
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Every package is calibrated to meet Google Chrome, Apple WebKit, Mozilla Firefox, and Microsoft Edge standards.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Filename</th>
                  <th className="py-4 px-6">Dimensions</th>
                  <th className="py-4 px-6">Format</th>
                  <th className="py-4 px-6">Target Platform</th>
                  <th className="py-4 px-6 text-right">Compliant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {formats.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900 dark:text-white">
                      {f.file}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-600 dark:text-slate-300">
                      {f.dimensions}
                    </td>
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                      {f.format}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      {f.platform}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <Check className="w-4 h-4" /> 100%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

