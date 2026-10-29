import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, Terminal, Code, Home, ChevronRight } from 'lucide-react';
import { generateHtmlSnippet } from '../../utils/zipExporter';
import type { PageRoute } from '../../types/routes';

interface DocumentationPageProps {
  onNavigate?: (route: PageRoute) => void;
}

export const DocumentationPage: React.FC<DocumentationPageProps> = ({ onNavigate }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const htmlCode = generateHtmlSnippet();

  const nextJsCode = `// app/layout.tsx (Next.js 13+ App Router)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Awesome App',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};`;

  const viteCode = `<!-- index.html in Vite / Vanilla HTML -->
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</head>`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      {onNavigate && (
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">Documentation</span>
        </nav>
      )}

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Developer Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Favicon Installation & Standards
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Best practices, technical specifications, and framework implementation guides.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1: Standard HTML Snippet */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-brand-500" />
              <span>Standard HTML &lt;head&gt; Implementation</span>
            </h2>
            <button
              onClick={() => copyToClipboard(htmlCode, 'html')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-500 flex items-center gap-1.5 shadow-sm transition-colors"
            >
              {copiedCode === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'html' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Place all generated files from the IconForge ZIP bundle in your public root directory and paste this inside your <code className="text-brand-600 dark:text-brand-400">&lt;head&gt;</code> tag:
          </p>
          <pre className="p-4 rounded-2xl bg-slate-950 text-xs text-slate-200 font-mono overflow-x-auto border border-slate-800">
            {htmlCode}
          </pre>
        </div>

        {/* Section 2: Framework Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Next.js Guide */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-500" />
                  <span>Next.js (App Router)</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(nextJsCode, 'nextjs')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {copiedCode === 'nextjs' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Put your icon files into <code className="font-mono">/public</code>, then declare them in <code className="font-mono">app/layout.tsx</code>:
              </p>
              <pre className="p-3 rounded-xl bg-slate-950 text-[11px] text-slate-300 font-mono overflow-x-auto border border-slate-800 max-h-48">
                {nextJsCode}
              </pre>
            </div>
          </div>

          {/* Vite & SPA Guide */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-500" />
                  <span>Vite / React / Vue / Astro</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(viteCode, 'vite')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {copiedCode === 'vite' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Drop all files into the project <code className="font-mono">public/</code> directory and add to <code className="font-mono">index.html</code>:
              </p>
              <pre className="p-3 rounded-xl bg-slate-950 text-[11px] text-slate-300 font-mono overflow-x-auto border border-slate-800 max-h-48">
                {viteCode}
              </pre>
            </div>
          </div>
        </div>

        {/* Section 3: Design Tips for 16x16 Icons */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Essential Design Rules for 16×16 Favicons</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-white">1. Maximize Contrast</div>
              <p>16×16 pixels is tiny. Avoid low-contrast pastels; use bold primary colors against high-contrast solid or dark backgrounds.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-white">2. Less is More</div>
              <p>Limit text to 1 or 2 characters. Ornate logos with fine lines will blur at standard tab size. Monograms and silhouettes work best.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-white">3. Optical Centering</div>
              <p>Letters like 'P' or 'T' often feel off-center due to weight distribution. IconForge lets you fine-tune offsets to achieve visual equilibrium.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

