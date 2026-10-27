import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Heart, Globe, Shield, Sparkles } from 'lucide-react';
import type { ToolType } from '../../types/favicon';

interface FooterProps {
  onSelectTool: (tool: ToolType) => void;
  onOpenChecker: () => void;
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTool,
  onOpenChecker,
  onOpenDocs,
}) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo size="md" />
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your brand, in one tiny icon. Create, customize, preview, and download production-ready favicons in seconds.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> 100% Client-Side Privacy
              </span>
            </div>
          </div>

          {/* Generator Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Favicon Generators
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTool('text')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Text to Favicon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('image')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Image to Favicon (PNG/JPG)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('emoji')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Emoji to Favicon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('svg')}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  SVG to Favicon
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Resources & Utilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenChecker}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Website Favicon Checker
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocs}
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Favicon Standards Guide
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Formats Generated */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Output Formats
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                favicon.ico
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                16×16 PNG
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                32×32 PNG
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                180×180 Apple Touch
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                192×192 Android
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                512×512 PWA Splash
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                site.webmanifest
              </span>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" /> Ready for Next.js, Vite & WP
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} IconForge. All rights reserved. Built for modern creators & web developers.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the web
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
