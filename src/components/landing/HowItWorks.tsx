import React from 'react';
import { Palette, Eye, Download, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Design or Upload',
      desc: 'Pick letters or initials, upload an existing PNG/JPG logo, pick an expressive emoji, or paste clean SVG markup.',
      icon: Palette,
      badge: 'Step 1',
    },
    {
      num: '02',
      title: 'Customize & Preview',
      desc: 'Tune corner radii, gradients, borders, font weights, and instant drop shadows while previewing live in simulated browser tabs.',
      icon: Eye,
      badge: 'Step 2',
    },
    {
      num: '03',
      title: 'Export Production Suite',
      desc: 'One-click generate real binary favicon.ico, 6 PNG resolutions, site.webmanifest, and ready-to-paste HTML code.',
      icon: Download,
      badge: 'Step 3',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            Seamless Workflow
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How IconForge Works
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            No design software or complex build scripts required. Generate in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-brand-500/20 dark:text-brand-400/20">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
