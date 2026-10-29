import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { PageRoute } from '../../types/routes';

interface HeroProps {
  onNavigate: (route: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  // Live interactive mini-preview state inside Hero!
  const [heroLetter, setHeroLetter] = useState('IF');
  const [heroShape, setHeroShape] = useState<'squircle' | 'circle' | 'rounded'>('squircle');
  const [heroColor, setHeroColor] = useState('#4F46E5');

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/20 to-accent-500/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-xs mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>The Modern Favicon & App Icon Generator</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
            Your brand, in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 bg-clip-text text-transparent">
              one tiny icon.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Create, customize, preview, and download professional favicons in seconds. Generate crisp multi-size ICO, Apple touch icons, and Android PWA assets directly in your browser.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={() => onNavigate('text-to-favicon')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold text-base shadow-xl shadow-brand-500/25 hover:shadow-brand-500/35 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Create Your Favicon</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <a
              href="#tools"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Tools</span>
            </a>
          </div>

          {/* Key Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real Multi-size .ICO
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Apple Touch 180×180
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" /> 100% Client-Side Privacy
            </span>
          </div>
        </div>

        {/* Live Interactive Hero Editor Preview */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all">
          {/* Simulated Browser Chrome */}
          <div className="bg-slate-100 dark:bg-slate-950 px-4 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>

            {/* Browser Tab with Real Live Favicon */}
            <div className="flex items-center gap-2 max-w-xs px-3.5 py-1.5 rounded-t-xl bg-white dark:bg-slate-900 border-t border-x border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-xs relative -mb-[9px] z-10">
              {/* Dynamic hero mini icon */}
              <div
                style={{ backgroundColor: heroColor }}
                className={`w-4 h-4 text-white text-[9px] font-black flex items-center justify-center ${
                  heroShape === 'circle' ? 'rounded-full' : heroShape === 'squircle' ? 'rounded-xs' : 'rounded-xs'
                }`}
              >
                {heroLetter}
              </div>
              <span className="truncate">My Website — Best App</span>
            </div>

            {/* Address Bar simulation */}
            <div className="hidden sm:flex flex-1 max-w-xs ml-4 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 items-center gap-1.5">
              <span className="text-emerald-500">🔒</span>
              <span className="truncate">https://mybrand.com</span>
            </div>
          </div>

          {/* Interactive Hero Playground */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left mini-controls */}
              <div className="md:col-span-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Try it right here:
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Icon Text
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={heroLetter}
                    onChange={(e) => setHeroLetter(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                {/* Shape selection */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Shape
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['squircle', 'rounded', 'circle'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setHeroShape(s)}
                        className={`py-1.5 text-xs font-semibold rounded-lg capitalize border ${
                          heroShape === s
                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color swatches */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Color
                  </label>
                  <div className="flex gap-2">
                    {['#4F46E5', '#2563EB', '#7C3AED', '#EC4899', '#10B981', '#0F172A'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setHeroColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-7 h-7 rounded-lg border-2 transition-transform hover:scale-110 ${
                          heroColor === c ? 'border-white ring-2 ring-brand-500 scale-105' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('text-to-favicon')}
                  className="w-full mt-2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open in Text to Favicon Page</span>
                </button>
              </div>

              {/* Right Hero Visual Showcase */}
              <div className="md:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                <div
                  style={{ backgroundColor: heroColor }}
                  className={`w-28 h-28 flex items-center justify-center shadow-2xl transition-all duration-300 ${
                    heroShape === 'circle' ? 'rounded-full' : heroShape === 'squircle' ? 'rounded-3xl' : 'rounded-2xl'
                  }`}
                >
                  <span className="font-display font-black text-white text-4xl drop-shadow-sm">
                    {heroLetter || 'IF'}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>16×16</span>
                  <span>•</span>
                  <span>32×32</span>
                  <span>•</span>
                  <span>180×180</span>
                  <span>•</span>
                  <span>512×512</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
