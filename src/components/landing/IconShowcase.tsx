import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ToolType } from '../../types/favicon';

interface IconShowcaseProps {
  onStartCreating: () => void;
}

export const IconShowcase: React.FC<IconShowcaseProps> = ({ onStartCreating }) => {
  const showcaseIcons = [
    {
      style: 'Minimal Letter',
      tag: 'Classic',
      bg: 'bg-slate-900',
      shape: 'rounded-xl',
      border: 'border-slate-800',
      content: <span className="font-serif font-black text-white text-xl">M</span>,
      desc: 'Elegant editorial serif on deep slate',
    },
    {
      style: 'Colorful Geometric',
      tag: 'Gradient',
      bg: 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500',
      shape: 'rounded-2xl',
      border: 'border-transparent',
      content: <span className="font-sans font-black text-white text-xl">IF</span>,
      desc: 'Vibrant multi-stop SaaS gradient',
    },
    {
      style: 'Rounded Square',
      tag: 'App Icon',
      bg: 'bg-blue-600',
      shape: 'rounded-xl',
      border: 'border-blue-700',
      content: <span className="font-sans font-black text-white text-2xl">A</span>,
      desc: 'Clean bold primary brand mark',
    },
    {
      style: 'Circular Icon',
      tag: 'Profile / Avatar',
      bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      shape: 'rounded-full',
      border: 'border-transparent',
      content: <span className="font-mono font-bold text-white text-lg">&lt;/&gt;</span>,
      desc: 'Developer code badge inside circle',
    },
    {
      style: 'Emoji Icon',
      tag: 'Fun / Expressive',
      bg: 'bg-slate-950',
      shape: 'rounded-2xl',
      border: 'border-indigo-500/50',
      content: <span className="text-2xl">🚀</span>,
      desc: 'Rocket launch emoji with neon border',
    },
    {
      style: 'Transparent Background',
      tag: 'No Background',
      bg: 'checkerboard',
      shape: 'rounded-none',
      border: 'border-slate-300 dark:border-slate-700',
      content: <span className="text-2xl">⚡</span>,
      desc: 'Transparent PNG cutout with alpha channel',
    },
    {
      style: 'Squircle Luxury',
      tag: 'iOS Style',
      bg: 'bg-gradient-to-b from-amber-400 to-amber-600',
      shape: 'rounded-2xl',
      border: 'border-amber-300',
      content: <span className="font-serif font-bold text-white text-xl">👑</span>,
      desc: 'Gold royal badge with squircle contour',
    },
    {
      style: 'Cyber Glow',
      tag: 'Dark Mode',
      bg: 'bg-black',
      shape: 'rounded-xl',
      border: 'border-cyan-400 ring-2 ring-cyan-500/30',
      content: <span className="font-mono font-bold text-cyan-400 text-lg">DEV</span>,
      desc: 'Terminal green & cyan code icon',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            Inspiration Gallery
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Craft Any Aesthetic For Your Brand
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            From minimalist monogram typography to glowing gradient squircles and transparent cutouts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {showcaseIcons.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 ${item.bg} ${item.shape} ${item.border} border flex items-center justify-center shadow-md mb-4 transition-transform group-hover:scale-110 duration-200`}
              >
                {item.content}
              </div>

              <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-1">
                {item.tag}
              </div>

              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {item.style}
              </h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onStartCreating}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize Any Style Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};
